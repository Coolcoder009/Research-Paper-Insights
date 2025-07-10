from PyPDF2 import PdfReader
from docx import Document


def extract_pdf(file):
    reader = PdfReader(file.file)
    extracted_content = ""
    for page in reader.pages:
        content = page.extract_text()
        if content:
            extracted_content = extracted_content + content + "\n"
    return extracted_content

def extract_docx(file):
    file_bytes = file.read()
    doc = Document(io.BytesIO(file_bytes))
    text = []
    for para in doc.paragraphs:
        text.append(para.text)
    return "\n".join(text)