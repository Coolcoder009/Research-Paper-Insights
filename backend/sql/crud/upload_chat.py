from sqlalchemy.orm import Session
from sql.models.chat import PaperChatHistory

def store_chat(db: Session, chat: PaperChatHistory):
    db_chat = PaperChatHistory(**chat.dict())
    db.add(db_chat)
    db.commit()
    db.refresh(db_chat)
    return db_chat