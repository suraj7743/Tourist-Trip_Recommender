import requests
import asyncio
from config import settings
from sqlalchemy.ext.asyncio import AsyncSession
from typing import List, Dict
from sqlalchemy import select
from models import Place
import logging
from databases import async_engine, Base , sessionConnection

logging.basicConfig(level=logging.INFO, format="%(asctime)s %(levelname)s %(message)s")
logger = logging.getLogger(__name__)

OVERPASS_URL = settings.OVERPASS_URL
KATHMANDU_BBOX = settings.KATHMANDU_BBOX

def extract_coords_from_bbox(bbox_str: str):
    """
    Extracts Overpass bounding box coordinates from a string like:
    '[bbox:85.2314,27.5744,85.5364,27.8336]'
    
    Returns: tuple -> (south, west, north, east)
    """
    parts = bbox_str.strip('[]').replace('bbox:', '').split(',')
    west, south, east, north = map(float, parts)
    return south, west, north, east

south, west, north, east = extract_coords_from_bbox(KATHMANDU_BBOX)


#osm query to fetch the historic and tourism places
QUERY = f"""
[out:json][timeout:25];
(
  node["tourism"]({south},{west},{north},{east});
  way["tourism"]({south},{west},{north},{east});
  relation["tourism"]({south},{west},{north},{east});
  
  node["historic"]({south},{west},{north},{east});
  way["historic"]({south},{west},{north},{east});
  relation["historic"]({south},{west},{north},{east});
);
out geom;
"""

def fetch_osm_data():
    print("Fetching OSM data...")
    response = requests.post(
        OVERPASS_URL,
        data={"data": QUERY}
    )
    response.raise_for_status()
    return response.json()


async def insert_data_to_database(db:AsyncSession, elements:List[Dict])->None:
    for elem in elements:
        tags = elem.get("tags", {}) or {}
        if not tags:
            continue

        osm_id = f"{elem.get('type')}/{elem.get('id')}"
        lat = elem.get("lat")
        lon = elem.get("lon") 
        if lat is None or lon is None:
            continue
        name = tags.get("name")
        category = tags.get("tourism") or tags.get("historic")

        # check for existing record 
        stmt= select(Place).where(Place.osm_id==osm_id)
        result = await db.execute(stmt)
        place: Place | None = result.scalar_one_or_none()
        if place is None:
            place = Place(
                osm_id=osm_id,
                name=name,
                category=category,
                tags=tags,
                latitude=lat,
                longitude=lon,
                geom=f"POINT({lon} {lat})",
            )
            db.add(place)
            logger.info("Added new place %s (%s)", osm_id, name)
        else:
            # Update existing record
            place.name = name
            place.category = category
            place.tags = tags
            place.latitude = lat
            place.longitude = lon
            place.geom = f"POINT({lon} {lat})"
            logger.info("Updated existing place %s (%s)", osm_id, name)
        await db.commit()


async def main():
    async with async_engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)

    elements = fetch_osm_data() 
    elements= elements['elements']
    print(elements[2])
    logger.info("Fetched %d elements from Overpass API", len(elements))
    async with sessionConnection() as db:
        await insert_data_to_database(db, elements=elements)



if __name__ == "__main__":
    asyncio.run(main())