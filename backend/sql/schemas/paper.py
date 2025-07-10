from pydantic import BaseModel
from typing import Optional

class ResearchPaperCreate(BaseModel):
    title: str
    authors: str
    citations_count: int
    domain: Optional[str]
    keywords: Optional[str]
    abstract: Optional[str]
    methodology: Optional[str]
    key_findings: Optional[str]
    limitations: Optional[str]
    file_type: Optional[str]
    replication_suggestions: Optional[str]
    date: Optional[str] = None
    journal: Optional[str] = None
    doi: Optional[str] = None