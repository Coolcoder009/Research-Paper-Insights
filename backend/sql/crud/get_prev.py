import base64
from sqlalchemy.orm import Session
from sqlalchemy import desc
from sql.models.chat import PaperChatHistory

def prevchat(chat_id: str, db: Session):
    results = (
        db.query(
            PaperChatHistory.user_query,
            PaperChatHistory.ai_response,
            PaperChatHistory.paper_file,
            PaperChatHistory.file_type,
            PaperChatHistory.file_name,
            PaperChatHistory.created_at
        )
        .filter(PaperChatHistory.chat_id == chat_id)
        .order_by(desc(PaperChatHistory.created_at))
        .all()
    )

    return [
        {
            "query": row.user_query,
            "response": row.ai_response,
            "file_type": row.file_type,
            "created_at": row.created_at.isoformat(),
            "file_content": base64.b64encode(row.paper_file).decode("utf-8") if row.paper_file else None,
            "file_name": row.file_name,
            "file_present": bool(row.paper_file)

        }
        for row in results
    ]
