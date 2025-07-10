import os
import qdrant_client
from qdrant_client.http import models
from dotenv import load_dotenv

load_dotenv()

HOST = os.getenv("QDRANT_HOST")
API_KEY = os.getenv("QDRANT_API_KEY")

client = qdrant_client.QdrantClient(HOST, api_key = API_KEY)

def create_qdrant_collection(file_name):
    vectors_config = models.VectorParams(size=384, distance=models.Distance.COSINE)
    client.create_collection(
        collection_name=file_name,
        vectors_config=vectors_config,
    )
    print(f"Collection '{file_name}' created successfully.")

def collection_exists(file_name):
    collections = client.get_collections()
    for collection in collections.collections:
        if collection.name == file_name:
            return True
    return False

