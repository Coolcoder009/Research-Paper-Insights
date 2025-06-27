from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from api.v1 import upload
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