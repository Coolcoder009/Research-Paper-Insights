import os
import faiss
from app.services.embedder import embedding_pipeline
from langchain.vectorstores import FAISS
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain.docstore.document import Document


TEMP_FAISS_DIR = "faiss_temp"

def build_temp_vectorstore(text):
    splitter = RecursiveCharacterTextSplitter(chunk_size=500, chunk_overlap=50)
    chunks = splitter.split_text(text)
    docs = [Document(page_content=chunk) for chunk in chunks]

    vectorstore = FAISS.from_documents(docs, embedding_pipeline)

    if not os.path.exists(TEMP_FAISS_DIR):
        os.makedirs(TEMP_FAISS_DIR)
    vectorstore.save_local(TEMP_FAISS_DIR)

    return vectorstore

def load_temp_vectorstore():
    return FAISS.load_local(TEMP_FAISS_DIR, embedding_pipeline, allow_dangerous_deserialization=True)

