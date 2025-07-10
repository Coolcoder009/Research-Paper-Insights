from app.services.extractor import extract_pdf, extract_docx
from app.services import temp_rag
from app.utils.prompt import TEMP_RESPONSE_PROMPT
from app.services.llm_router import response_gemini

def process(file):
    file_name = file.filename
    if file_name.endswith(".pdf"):
        extracted_contents = extract_pdf(file)
    elif file_name.endswith(".docx"):
        extracted_contents = extract_docx(file)
    else:
        return {"Only Pdf & Docx can be processed!"}

    temp_rag.build_temp_vectorstore(extracted_contents)
    return {"Data Stored in Vector DB!"}

def response_chat(query):
    vectorstore = temp_rag.load_temp_vectorstore()
    retriever = vectorstore.as_retriever(search_type="similarity", k=4)
    docs = retriever.get_relevant_documents(query)
    context = "\n\n".join([doc.page_content for doc in docs])
    prompt = TEMP_RESPONSE_PROMPT.format(context=context, query=query)
    answer = response_gemini(prompt)
    return {"response": answer}