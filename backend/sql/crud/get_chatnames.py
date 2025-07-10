
from sqlalchemy.orm import Session
from sql.models.paper import ResearchPaper

def chatname(db: Session):
    return [
        paper.title
        for paper in db.query(ResearchPaper.title)
        .order_by(ResearchPaper.created_at.desc())
        .all()
    ]

