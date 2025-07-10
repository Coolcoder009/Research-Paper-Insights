from app.services.extractor import extract_pdf, extract_docx
from app.services.embedder import embeddings
from app.utils.prompt import METADATA_PROMPT, RESPONSE_PROMPT
from app.utils.queries import Queries_2
from app.services.llm_router import response_gemini
from app.services.retriever import retrieve_chunks
from app.utils.format import clean_and_parse_gemini_output

def get_metadata(content: str):
    prompt = METADATA_PROMPT.format(content)
    return response_gemini(prompt)

def build_response_prompt(queries, content):
    queries_str = "\n".join(f"- {q}" for q in queries)
    return RESPONSE_PROMPT.format(queries_str, content)

def get_response(paper_name: str):
    # optional if used to generate query string
    combined_query = " ".join(Queries_2)  # for retrieval purposes
    retrieved_content = retrieve_chunks(paper_name, combined_query, top_k=10)
    prompt = RESPONSE_PROMPT.format(retrieved_content)

    return response_gemini(prompt)

def build_final_response(metadata_raw, insights_raw):
    metadata = clean_and_parse_gemini_output(metadata_raw)
    insights = clean_and_parse_gemini_output(insights_raw)

    return {
        "title": metadata.get("research_paper_name", ""),
        "authors": metadata.get("authors", ""),
        "abstract": metadata.get("abstract", ""),
        "citations_count": insights.get("references", ""),
        "domain": insights.get("domain", ""),
        "keywords": insights.get("keywords", ""),
        "key_findings": insights.get("key_findings", ""),
        "methodology": insights.get("methodology", ""),
        "limitations": insights.get("limitations", ""),
        "replication suggestions": insights.get("replication_suggestions", "")
    }


def process(file):
    file_name = file.filename
    if file_name.endswith(".pdf"):
        extracted_contents = extract_pdf(file)
        file_type = "pdf"
    elif file_name.endswith(".docx"):
        extracted_contents = extract_docx(file)
        file_type = "docx"
    else:
        return {"Only Pdf & Docx can be processed!"}

    first_page = get_metadata(extracted_contents[:3000])
    metadata_response = get_metadata(first_page)
    metadata = clean_and_parse_gemini_output(metadata_response)
    paper_name = metadata.get("research_paper_name", "Untitled")
    embeddings(paper_name, extracted_contents)
    response_insights = get_response(paper_name)
    final_response = build_final_response(metadata_response, response_insights)
    final_response["file_type"] = file_type
    return final_response