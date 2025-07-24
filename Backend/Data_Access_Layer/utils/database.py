from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from ...config.env_loader import get_env_var

DB_USER = get_env_var("DB_USER")
print(DB_USER)
DB_PASSWORD = get_env_var("DB_PASSWORD")
DB_HOST = get_env_var("DB_HOST")
DB_PORT = get_env_var("DB_PORT")
DB_NAME = get_env_var("DB_NAME")
DB_DRIVER = get_env_var("DB_DRIVER")

DB_URL = f"{DB_DRIVER}://{DB_USER}:{DB_PASSWORD}@{DB_HOST}:{DB_PORT}/{DB_NAME}"

engine = create_engine(DB_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()