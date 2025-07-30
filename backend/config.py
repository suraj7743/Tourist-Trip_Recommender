from pydantic_settings import BaseSettings, SettingsConfigDict

class Settings(BaseSettings):
    DATABASE_URL: str = "postgresql://postgres:postgres@localhost:5432/tourist"
    OVERPASS_URL: str = "https://overpass-api.de/api/interpreter"
    KATHMANDU_BBOX: str = "[bbox:85.2314,27.5744,85.5364,27.8336]"

    class Config:
        env_file = ".env"
    

settings = Settings()
