from sqlalchemy import Column, Integer, String, Text, DateTime
from sqlalchemy.ext.declarative import declarative_base

from datetime import datetime

Base = declarative_base()

class ResearchPaper(Base):
    __tablename__ = "research_papers"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(255), index=True)  # ✅ length added
    authors = Column(Text)
    citations_count = Column(Integer)
    domain = Column(String(100))  # ✅ safe default
    keywords = Column(Text)
    abstract = Column(Text)
    methodology = Column(Text)
    key_findings = Column(Text)
    limitations = Column(Text)
    replication_suggestions = Column(Text)
    file_type = Column(String(20))  # ✅ pdf/docx, so small is fine
    created_at = Column(DateTime, default=datetime.utcnow)
    date = Column(String(50), nullable=True)
    journal = Column(String(255), nullable=True)
    doi = Column(String(255), nullable=True)