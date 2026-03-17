from fastapi import APIRouter, Depends, Header, HTTPException
from sqlalchemy.orm import Session

from database import get_db
from models import Course, Lead
from schemas import LeadCreate, LeadOut

router = APIRouter(prefix="/api/leads", tags=["leads"])


@router.post("/", response_model=LeadOut)
def create_lead(lead: LeadCreate, db: Session = Depends(get_db)):
    course = db.query(Course).filter(Course.id == lead.course_id).first()
    if not course:
        raise HTTPException(status_code=404, detail="Course not found")

    db_lead = Lead(**lead.model_dump())
    db.add(db_lead)
    db.commit()
    db.refresh(db_lead)

    return LeadOut(
        id=db_lead.id,
        name=db_lead.name,
        phone=db_lead.phone,
        email=db_lead.email,
        course_id=db_lead.course_id,
        course_name=course.name,
        created_at=db_lead.created_at,
    )


@router.get("/", response_model=list[LeadOut])
def list_leads(
    db: Session = Depends(get_db),
    authorization: str = Header(default=""),
):
    # Import here to avoid circular imports
    from main import get_current_admin

    get_current_admin(authorization)

    leads = db.query(Lead).order_by(Lead.created_at.desc()).all()
    result = []
    for lead in leads:
        result.append(
            LeadOut(
                id=lead.id,
                name=lead.name,
                phone=lead.phone,
                email=lead.email,
                course_id=lead.course_id,
                course_name=lead.course.name if lead.course else None,
                created_at=lead.created_at,
            )
        )
    return result
