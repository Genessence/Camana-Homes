from __future__ import annotations

from pydantic_settings import BaseSettings
from sqlalchemy.ext.asyncio import async_sessionmaker, create_async_engine


class Settings(BaseSettings):
    DATABASE_URL: str = "postgresql+asyncpg://camana_u:camana12345@camana.c90q66es89vi.ap-south-1.rds.amazonaws.com/camana_db"

    class Config:
        env_file = ".env"


settings = Settings()
engine = create_async_engine(settings.DATABASE_URL, echo=False, future=True)
SessionLocal = async_sessionmaker(engine, expire_on_commit=False)


