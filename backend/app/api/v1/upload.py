from fastapi import APIRouter, UploadFile, File
from app.services import process_files
from fastapi import BackgroundTasks
from app.utils.response import success_response
from sql.crud.upload_paper import store_report
router =APIRouter()

@router.post("/upload_main")
async def upload_file(background_tasks: BackgroundTasks, file: UploadFile = File(...)):
    analyzed_content = process_files.process(file)
    background_tasks.add_task(store_report, analyzed_content)
    return success_response(analyzed_content)
