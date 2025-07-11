from sqlalchemy import Column, Integer, String, Text, DateTime, ForeignKey
from sql.models.paper import Base
from datetime import datetime




class PaperChatHistory(Base):
    __tablename__ = "paper_chat_history"

    id = Column(Integer, primary_key=True, index=True)

    paper_title = Column(String(255), index=True)
    user_query = Column(Text, nullable=False)
    ai_response = Column(Text, nullable=False)

    created_at = Column(DateTime, default=datetime.utcnow)
