from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api.v1 import upload, search, chatnames, temp_chat, chat, prev_chats

app = FastAPI(
    title = "Research Insights",
    version = "1.0.0",
    description = "Extract, analyze, get insights, innovate, get ideas"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins = ["*"],
    allow_credentials = True,
    allow_methods = ["*"],
    allow_headers = ["*"]
)

@app.get("/health")
def health_check():
    return {"Insights API is healthy!"}

app.include_router(upload.router, prefix="/api/v1/upload", tags=["Upload"])
app.include_router(search.router, prefix="/api/v1/search", tags=["Search"])
app.include_router(chatnames.router, prefix="/api/v1/chatnames", tags=["ChatNames"])
app.include_router(temp_chat.router, prefix="/api/v1/temp_chat", tags=["TemporaryChat"])
app.include_router(chat.router, prefix="/api/v1/chat", tags=["ChatBot"])
app.include_router(prev_chats.router, prefix="/api/v1/prev_chats", tags=["PreviousChats"])