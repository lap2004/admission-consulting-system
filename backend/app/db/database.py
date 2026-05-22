from sqlalchemy import create_engine
from sqlalchemy.ext.asyncio import create_async_engine, AsyncSession
from sqlalchemy.orm import sessionmaker, declarative_base
from app.config import settings
from sqlalchemy import create_engine

Base = declarative_base()

sync_engine = create_engine(
    settings.DATABASE_URL,
    echo=False 
)

SessionLocal = sessionmaker(
    bind=sync_engine,
    autocommit=False,
    autoflush=False
)

def get_sync_session():
    return SessionLocal()

async_engine = create_async_engine(
    settings.DATABASE_URL_ASYNC,
    echo=False 
)
AsyncSessionLocal = sessionmaker(
    bind=async_engine,
    class_=AsyncSession,
    expire_on_commit=False
)
async def get_db():
    async with AsyncSessionLocal() as session:
        yield session

# from sqlalchemy import create_engine
# from sqlalchemy.ext.asyncio import create_async_engine, AsyncSession
# from sqlalchemy.orm import sessionmaker, declarative_base
# from app.config import get_settings

# Base = declarative_base()

# # ===== Sync DB (nếu bạn còn dùng) =====
# def get_sync_engine():
#     settings = get_settings()
#     return create_engine(
#         settings.DATABASE_URL,
#         echo=False,
#         pool_pre_ping=True,
#     )

# def get_sync_session():
#     engine = get_sync_engine()
#     SessionLocal = sessionmaker(
#         bind=engine,
#         autocommit=False,
#         autoflush=False,
#     )
#     db = SessionLocal()
#     try:
#         yield db
#     finally:
#         db.close()

# # ===== Async DB (FastAPI dependency) =====
# def get_async_engine():
#     settings = get_settings()
#     return create_async_engine(
#         settings.DATABASE_URL_ASYNC,
#         echo=False,
#         pool_pre_ping=True,
#     )

# def get_async_session_maker():
#     engine = get_async_engine()
#     return sessionmaker(
#         bind=engine,
#         class_=AsyncSession,
#         expire_on_commit=False,
#     )

# async def get_db():
#     SessionLocal = get_async_session_maker()
#     async with SessionLocal() as session:
#         yield session
