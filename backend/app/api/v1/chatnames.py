from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.utils.response import success_response
from sql.database import get_db
from sql.crud.get_chatnames import chatname

router = APIRouter()

@router.get("/chatnames")
async def chatnames_titles(db: Session = Depends(get_db)):
    retrieved_chatnames = chatname(db)
    return success_response(retrieved_chatnames)

