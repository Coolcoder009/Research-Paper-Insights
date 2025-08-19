from app.services.get_filetype import filetype
from app.services.embedder import embeddings
from app.services.retriever import retrieve_chunks
from app.utils.prompt import CHATBOT_RESPONSE_PROMPT
from app.services.llm_router import response_gemini

def process(file, chatname):
    extracted_contents, type = filetype(file)
    embeddings(chatname, extracted_contents)
    return type

def response(query, chatname):
    retrieve_content = retrieve_chunks(chatname, query)
    prompt = CHATBOT_RESPONSE_PROMPT.format(context=retrieve_content, query=query)
    return response_gemini(prompt)