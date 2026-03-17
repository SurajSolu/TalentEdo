from datetime import datetime
from typing import Optional

from pydantic import BaseModel


class CourseOut(BaseModel):
    id: int
    name: str
    description: str
    instructor_name: str
    instructor_bio: Optional[str] = None
    duration: str
    schedule: str
    start_date: str
    mode: str
    location: str
    price: str
    image_url: Optional[str] = None

    model_config = {"from_attributes": True}


class LeadCreate(BaseModel):
    name: str
    phone: str
    email: Optional[str] = None
    course_id: int


class LeadOut(BaseModel):
    id: int
    name: str
    phone: str
    email: Optional[str] = None
    course_id: int
    course_name: Optional[str] = None
    created_at: datetime

    model_config = {"from_attributes": True}
