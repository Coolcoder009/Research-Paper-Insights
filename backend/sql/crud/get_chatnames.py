from sqlalchemy.orm import Session
from sqlalchemy import func, desc
from sql.models.chat import PaperChatHistory

def chatname(db: Session):
    # Subquery to get the latest created_at per chat_id
    subquery = (
        db.query(
            PaperChatHistory.chat_id,
            func.max(PaperChatHistory.created_at).label("latest_time")
        )
        .group_by(PaperChatHistory.chat_id)
        .subquery()
    )

    # Join with main table to get paper_title
    results = (
        db.query(PaperChatHistory.chat_id, PaperChatHistory.paper_title)
        .join(
            subquery,
            (PaperChatHistory.chat_id == subquery.c.chat_id) &
            (PaperChatHistory.created_at == subquery.c.latest_time)
        )
        .order_by(desc(PaperChatHistory.created_at))
        .all()
    )

    return [
        {"chat_id": row.chat_id, "chatname": row.paper_title}
        for row in results
    ]