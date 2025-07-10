from app.services.embedder import vector_store
from langchain_core.documents import Document

def retrieve_chunks(file_name, query, top_k=5):
    vector_db = vector_store(file_name)
    results = vector_db.similarity_search(query, k=top_k)
    return "\n\n".join([doc.page_content for doc in results])

