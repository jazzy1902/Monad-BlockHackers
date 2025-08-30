from sqlalchemy import create_engine, Column, Integer, String, Float, DateTime
from sqlalchemy.orm import declarative_base, sessionmaker
from datetime import datetime
import os

DATABASE_URL = os.getenv("DATABASE_URL", "sqlite:///./energy_logs.db")

engine = create_engine(DATABASE_URL, connect_args={"check_same_thread": False})
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

class EnergyLog(Base):
    __tablename__ = "energy_logs"
    id = Column(Integer, primary_key=True, index=True)
    device_id = Column(String, index=True, nullable=True)
    wallet = Column(String, index=True)
    units = Column(Float, nullable=False)
    device_timestamp = Column(String, nullable=True)  # optional device-provided ts
    received_at = Column(DateTime, default=datetime.utcnow)
    
    # new fields
    tx_hash = Column(String, nullable=True)
    token_id = Column(Integer, nullable=True)
    token_uri = Column(String, nullable=True)

def init_db():
    Base.metadata.create_all(bind=engine)
