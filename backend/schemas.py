from typing import List , Optional
from pydantic import BaseModel, Field

# this is the format result return form overpass api 
# {
#   "type": "node",
#   "id": 268308579,
#   "lat": 27.6721915,
#   "lon": 85.4229909,
#   "tags": {
#     "barrier": "sally_port",
#     "historic": "city_gate"
#   }
# },

# storing place schema like getting from osm 
class PlaceBaseSchema(BaseModel):
    id:int
    osm_id:str
    name:Optional[str]=None
    category:Optional[str]= None
    tags:dict
    latitude: float
    longitude: float
    avg_rating: Optional[float] = Field(None, description="Average rating computed from reviews") 

    class Config:
        orm_mode = True

# storing image if further needed
class ImageSchema(BaseModel):
    id:int
    url:str
    caption:Optional[str]=None

    class Config:
        orm_mode=True


# for storing review and comment
class ReviewSchema(BaseModel):
    id:int
    rating:float= Field(..., ge=0 , le=5, description="Rating between 0 and 5")
    comment:Optional[str]= None
    class Config:
        orm_mode = True

# for place details linking with reviews and image table 
class PlaceDetailSchema(PlaceBaseSchema):
    reviews: List[ReviewSchema] = []
    images: List[ImageSchema] = []
