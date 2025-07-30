from sqlalchemy import (
    Column, 
    Integer, 
    String, 
    Float, 
    ForeignKey, 
    Text
)

from sqlalchemy.dialects.postgresql import JSONB
from sqlalchemy.orm import relationship, Mapped, mapped_column
from databases import Base
from geoalchemy2 import Geometry
from typing import List


class Place(Base):
    __tablename__="places"

    id:Mapped[int]= mapped_column(primary_key=True, index=True)
    osm_id:Mapped[str]= mapped_column(index=True, unique=True)
    name: Mapped[str]= mapped_column(nullable=True)
    category : Mapped[str] = mapped_column(nullable=True)
    tags:Mapped[dict]= mapped_column(JSONB, nullable=False)
    latitude: Mapped[float]= mapped_column(Float, nullable=False)
    longitude:Mapped[float]= mapped_column(Float, nullable=False)
    geom:Mapped[str]= mapped_column(Geometry(geometry_type="POINT", srid=4326))


    # relationship avg_rating
    review : Mapped[List["Review"]]=relationship(
        back_populates="place", 
        cascade="all, delete-orphan")
    
    images: Mapped[List["Image"]] = relationship(
        back_populates="place",
        cascade="all, delete-orphan"
    )


class Review(Base):
    __tablename__="reviews"

    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    place_id: Mapped[int] = mapped_column(Integer, ForeignKey("places.id"))
    rating:Mapped[float]= mapped_column(Float, nullable=False)
    comment:Mapped[str]= mapped_column(Text, nullable=True)

    place: Mapped[Place] = relationship(back_populates="review")


class Image(Base):
    __tablename__ = "images"

    id: Mapped[int] = mapped_column(primary_key=True)
    place_id: Mapped[int] = mapped_column(ForeignKey("places.id"))
    url:Mapped[str]= mapped_column(Text, nullable=False)
    caption :Mapped[str]= mapped_column(Text, nullable=True)

    place: Mapped[Place] = relationship(back_populates="images")