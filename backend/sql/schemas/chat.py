from pydantic import BaseModel

class ChatCreate(BaseModel):
    paper_title: str
    chat_id: str
    user_query: str
    ai_response: str