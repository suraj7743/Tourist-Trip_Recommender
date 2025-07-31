from typing import List , Dict,Optional
from fastapi import Query, Depends , HTTPException, APIRouter
from sqlalchemy.ext.asyncio  import AsyncSession
from databases import db_connection
from helpers import get_places, get_place_by_id
from schemas import PlaceBaseSchema, PlaceDetailSchema


router = APIRouter(prefix="/places", tags=["Places"])


@router.get("/", response_model=List[PlaceBaseSchema])
async def list_places (
    category: Optional[str] = Query(None),
    min_rating: Optional[float] = Query(None, ge=0, le=5),
    open_24_7: Optional[bool] = Query(None),
    limit: int = Query(100, ge=1),
    offset: int = Query(0, ge=0),
    db: AsyncSession = Depends(db_connection),
):
    
    results = await get_places(
        db,
        category=category,
        min_rating=min_rating,
        open_24_7=open_24_7,
        limit=limit,
        offset=offset,
    )
        
    return [
        {
            "id": place.id,
            "osm_id": place.osm_id,
            "name": place.name,
            "category": place.category,
            "tags": place.tags,
            "latitude": place.latitude,
            "longitude": place.longitude,
            "avg_rating": avg_rating,
        }
        for place, avg_rating in results
    ]


@router.get('/{place_id}', response_model=PlaceDetailSchema)
async def read_place(place_id: int, db: AsyncSession = Depends(db_connection)):
    place = await get_place_by_id(db=db, place_id=place_id)
    print(place)
    if place is None:
        raise HTTPException(status_code=404, detail="place not found invalid id ")
    
    reviews = place.review or []
    avg_rating = sum(r.rating for r in reviews) / len(reviews) if reviews else None

    return {
        "id": place.id,
        "osm_id": place.osm_id,
        "name": place.name,
        "category": place.category,
        "tags": place.tags,
        "latitude": place.latitude,
        "longitude": place.longitude,
        "avg_rating": avg_rating,
        "reviews": place.review,
        "images": place.images,
    }
