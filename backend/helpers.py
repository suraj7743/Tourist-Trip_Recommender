from typing import List , Optional, Tuple

from sqlalchemy.ext.asyncio import AsyncSession
from models import Place,Review
from sqlalchemy import func , and_, or_, select
from sqlalchemy.orm import selectinload


# function to ge the places and the rating if so list of tuple as return 
async def get_places(
    db:AsyncSession, 
    category:Optional[str]=None, 
    min_rating:Optional[str]=None, 
    open_24_7: Optional[bool] = None,
    limit: int = 100,
    offset: int = 0,

)-> List[Tuple[Place, Optional[float]]]:
    # first fetch the rating form the review table then  group that by the place id doing outer join with the review table 
    avg_rating = func.avg(Review.rating).label("avg_rating")
    stmt = (
    select(Place, avg_rating)
    .outerjoin(Review)
    .group_by(Place.id)
    )
    if category:
        stmt = stmt.where(Place.category == category)

    if open_24_7 is not None:
        if open_24_7:
            stmt = stmt.where(Place.tags["opening_hours"].astext.ilike("%24/7%"))
        else:
            stmt = stmt.where(
                or_(
                    Place.tags["opening_hours"].astext.is_(None),
                    ~Place.tags["opening_hours"].astext.ilike("%24/7%"),
                )
            ) 
    if min_rating is not None:
        stmt = stmt.having(func.avg(Review.rating) >= min_rating)

    stmt = stmt.offset(offset).limit(limit)
    result = await db.execute(stmt)
    rows = result.all()
    return rows

async def get_place_by_id(db:AsyncSession, place_id:int)->Optional[Place]:
    result = await db.execute(
        select(Place)
        .options(selectinload(Place.review), selectinload(Place.images))
        .where(Place.id == place_id)
    )
    return result.scalar_one_or_none()