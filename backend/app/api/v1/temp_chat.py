from fastapi import APIRouter, UploadFile, File
from app.services import process_temp
from pydantic import BaseModel

router =APIRouter()

class TempChatQuery(BaseModel):
    query: str

@router.post("/upload_temp")
async def upload_temp_file(file: UploadFile = File(...)):
    process_temp.process(file)
    return {"Temporary File Data stored!"}

@router.post("/temp_chat")
async def chat_temp(query_payload: TempChatQuery):
    query = query_payload.query
    return process_temp.response_chat(query)