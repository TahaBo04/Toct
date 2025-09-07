from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base
import os

# Use SQLite by default
DATABASE_URL = os.getenv("DATABASE_URL", "sqlite:///./local.db")

# Handle SQLite special case
if DATABASE_URL.startswith("sqlite"):
    engine = create_engine(
        DATABASE_URL, connect_args={"check_same_thread": False}
    )
else:
    engine = create_engine(DATABASE_URL, pool_pre_ping=True)

SessionLocal = sessionmaker(bind=engine, autoflush=False, autocommit=False)
Base = declarative_base()

# This function MUST exist, other files import it
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
