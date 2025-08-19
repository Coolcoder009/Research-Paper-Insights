from sqlalchemy.orm import Session
from sql.models.paper import ResearchPaper
from sql.database import SessionLocal

def store_report(paper: dict):
    db = SessionLocal()
    try:
        db_paper = ResearchPaper(**paper)
        db.add(db_paper)
        db.commit()
        db.refresh(db_paper)
    finally:
        db.close()