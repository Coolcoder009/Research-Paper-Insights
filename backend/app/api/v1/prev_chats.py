from fastapi import APIRouter, Depends
from sql.database import get_db
from sqlalchemy.orm import Session
from app.utils.response import success_response
from pydantic import BaseModel
from sql.crud.get_prev import prevchat

router = APIRouter()

@router.get("/previous_chats")
async def previous(chatid: str, db: Session = Depends(get_db)):
    chats = prevchat(chatid, db)
    return success_response(chats)