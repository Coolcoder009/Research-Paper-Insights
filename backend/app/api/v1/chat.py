from fastapi import APIRouter, UploadFile, File
from app.services import chatbot_response
from pydantic import BaseModel

router =APIRouter()

class ChatQuery(BaseModel):
    query: str

@router.post("/upload_chatbot")
async def upload_chat(chatname, file: UploadFile = File(...)):
    chatbot_response.process(file, chatname)
    return {"File stored in Qdrant!"}

@router.post("/chatbot_chat")
async def chat(query_payload: ChatQuery, chatname):
    query = query_payload.query
    return chatbot_response.response(query, chatname)