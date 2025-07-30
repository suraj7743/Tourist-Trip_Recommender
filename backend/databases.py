from sqlalchemy.ext.asyncio import create_async_engine, async_sessionmaker, AsyncSession
from sqlalchemy.orm import DeclarativeBase
from config import settings



class Base(DeclarativeBase):
    pass

async_engine = create_async_engine(settings.DATABASE_URL, echo=False)
sessionConnection = async_sessionmaker(async_engine, class_=AsyncSession, expire_on_commit=False)

async def db_connection():
    db=sessionConnection()
    try:
        yield db
    finally:
        await db.close()