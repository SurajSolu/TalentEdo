from database import Base, SessionLocal, engine
from models import Course

Base.metadata.create_all(bind=engine)

db = SessionLocal()

existing = db.query(Course).first()
if existing:
    print("Database already seeded.")
    db.close()
    exit()

course = Course(
    name="Data Engineering Masterclass",
    description=(
        "Master the art of building robust data pipelines and infrastructure. "
        "This comprehensive 8-week offline course covers everything from SQL and "
        "Python fundamentals to advanced topics like Apache Spark, Airflow, Kafka, "
        "and cloud data warehousing. Hands-on projects with real-world datasets. "
        "Perfect for aspiring data engineers and analysts looking to level up."
    ),
    instructor_name="Suraj Kumar Sharma",
    instructor_bio=(
        "Data Engineer with 4+ years of experience at top tech companies. "
        "Specializes in building scalable data platforms."
    ),
    duration="8 Weeks",
    schedule="Mon - Fri, 7:00 PM - 9:00 PM",
    start_date="April 15, 2026",
    mode="Offline",
    location="TalentEdo Learning Center, Bengaluru",
    price="₹25,000",
    image_url="/data-engineering.jpg",
)

db.add(course)
db.commit()
print("Seeded Data Engineering Masterclass course.")
db.close()
