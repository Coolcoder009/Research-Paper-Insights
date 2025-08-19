# sql/crud/upload_chat.py

from sql.database import SessionLocal
from sql.models.chat import PaperChatHistory
from datetime import datetime

def store_chat(**chat_data):
    db = SessionLocal()
    try:
        chat_data.setdefault("created_at", datetime.utcnow())
        db_chat = PaperChatHistory(**chat_data)
        db.add(db_chat)
        db.commit()
        db.refresh(db_chat)
    finally:
        db.close()
