from app.services.extractor import extract_pdf, extract_docx

def filetype(file):
    file_name = file.filename
    if file_name.endswith(".pdf"):
        extracted_contents = extract_pdf(file)
        file_type = "pdf"
    elif file_name.endswith(".docx"):
        extracted_contents = extract_docx(file)
        file_type = "docx"
    else:
        return {"Only Pdf & Docx can be processed!"}

    return extracted_contents, file_type