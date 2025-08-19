from fastapi import APIRouter, UploadFile, File, BackgroundTasks
from app.services import chatbot_response, get_filetype
from pydantic import BaseModel
from sql.crud.upload_chat import store_chat
from app.utils.response import success_response

router = APIRouter()

class ChatQuery(BaseModel):
    query: str

@router.post("/upload_chatbot")
async def upload_chat(background_tasks: BackgroundTasks, chatname, chatid, file: UploadFile = File(...)):
    file_name = file.filename
    file_bytes = await file.read()
    content, type = get_filetype.filetype(file)
    chatbot_response.process(file, chatname)
    background_tasks.add_task(store_chat, paper_title = chatname, paper_file = file_bytes, file_type = type,
                              chat_id = chatid, file_name = file_name)
    return success_response("Sucessfully Stored")

@router.post("/chatbot_chat")
async def chat(background_tasks: BackgroundTasks, chatid, query_payload: ChatQuery, chatname):
    query = query_payload.query
    response = chatbot_response.response(query, chatname)
    background_tasks.add_task(store_chat, paper_title = chatname, user_query = query, ai_response = response, chat_id = chatid)
    return success_response(response)