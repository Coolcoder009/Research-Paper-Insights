from langchain_huggingface import HuggingFaceEmbeddings
from langchain_text_splitters import CharacterTextSplitter
from langchain_community.vectorstores import Qdrant
from app.utils.qdrant import client, create_qdrant_collection, collection_exists

embedding_pipeline = HuggingFaceEmbeddings(
    model_name="sentence-transformers/all-MiniLM-L6-v2",
    model_kwargs={'device': 'cpu'},
    show_progress=True
)

def vector_store(file_name):
    return Qdrant(client=client, collection_name=file_name, embeddings=embedding_pipeline)

def embeddings(file_name, raw_text):
    if not collection_exists(file_name):
        print(f"Creating new collection '{file_name}'")
        create_qdrant_collection(file_name)
        vector_db = vector_store(file_name)
    else:
        print(f"Collection '{file_name} already exists, Loading old embeddings")
        vector_db = vector_store(file_name)
    if raw_text:
        text_splitter = CharacterTextSplitter(
            separator="\n",
            chunk_size=400,
            chunk_overlap=100,
            length_function=len
        )
        chunks = text_splitter.split_text(raw_text)
        vector_db.add_texts(chunks)
        print(f"Stored embeddings in collection '{file_name}'")