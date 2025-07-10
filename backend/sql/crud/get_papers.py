
from sqlalchemy.orm import Session
from sql.models.paper import ResearchPaper
from datetime import datetime
def papers(db: Session):
    retrieved_papers = db.query(ResearchPaper).all()
    return [
        {
            k: (v.isoformat() if isinstance(v, datetime) else v)
            for k, v in paper.__dict__.items()
            if not k.startswith("_")
        }
        for paper in retrieved_papers
    ]

