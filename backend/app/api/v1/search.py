from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.utils.response import success_response
from sql.database import get_db
from sql.crud.get_papers import papers

router = APIRouter()

@router.get("/search")
async def search_bar(db: Session = Depends(get_db)):
    retrieved_papers = papers(db)
    return success_response(retrieved_papers)
