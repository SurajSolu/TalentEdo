from datetime import datetime

from sqlalchemy import Column, DateTime, ForeignKey, Integer, String, Text
from sqlalchemy.orm import relationship

from database import Base


class Course(Base):
    __tablename__ = "courses"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(200), nullable=False)
    description = Column(Text, nullable=False)
    instructor_name = Column(String(100), nullable=False)
    instructor_bio = Column(Text)
    duration = Column(String(50), nullable=False)
    schedule = Column(String(100), nullable=False)
    start_date = Column(String(50), nullable=False)
    mode = Column(String(20), default="Offline")
    location = Column(String(200), nullable=False)
    price = Column(String(50), nullable=False)
    image_url = Column(String(500))

    leads = relationship("Lead", back_populates="course")


class Lead(Base):
    __tablename__ = "leads"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(100), nullable=False)
    phone = Column(String(20), nullable=False)
    email = Column(String(100), nullable=True)
    course_id = Column(Integer, ForeignKey("courses.id"), nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow)

    course = relationship("Course", back_populates="leads")
