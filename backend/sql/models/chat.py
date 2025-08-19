from sqlalchemy import Column, Integer, String, Text, DateTime
from sqlalchemy.dialects.mysql import LONGBLOB
from sql.models.paper import Base
from datetime import datetime

class PaperChatHistory(Base):
    __tablename__ = "paper_chat_history"

    id = Column(Integer, primary_key=True, index=True)
    chat_id = Column(String(120), index=True)
    paper_title = Column(String(255), index=True)
    user_query = Column(Text, nullable=True)
    ai_response = Column(Text, nullable=True)

    paper_file = Column(LONGBLOB, nullable=True)
    file_name = Column(String(120), index=True)
    created_at = Column(DateTime, default=datetime.utcnow)
    file_type = Column(String(20))