METADATA_PROMPT = '''
You are a helpful assistant. You are given the first page content of a research paper.

From the content, extract the following details and respond ONLY in the following JSON format:

{{
  "research_paper_name": "<string>",
  "authors": "<string or list of authors>",
  "abstract": "<string>"
}}

Here is the content:

"""
{}
"""
'''


RESPONSE_PROMPT = '''
You are a helpful assistant. You are given content chunks from a research paper.

Using the content, analyze and extract the following details. Respond ONLY in this strict JSON format:

{{
  "references": "<number or 'Ask AI for better insights!'>",
  "domain": "<string or 'Ask AI for better insights!'>",
  "keywords": "<string or 'Ask AI for better insights!'>",
  "key_findings": "<string or 'Ask AI for better insights!'>",
  "methodology": "<string or 'Ask AI for better insights!'>",
  "limitations": "<string or 'Ask AI for better insights!'>",
  "replication_suggestions": "<string or 'Ask AI for much more details'>"
}}

Instructions:
- For 'references': Find the highest number inside square brackets, like [40] → 40.
- Even if references are split across lines, count them.
- For 'replication_suggestions': If the paper gives clear steps, tools, datasets, or code links, summarize them.
- If insufficient information is available, respond ONLY with: "Ask AI for much more details"
- For all other fields: If missing or unclear in the content, respond with: "Ask AI for better insights!"

Here is the research paper content:

"""
{}
"""
'''

TEMP_RESPONSE_PROMPT = '''
You are a helpful assistant. Use the following context to answer the user's question.

Context:
{context}

User Question:
{query}

Answer in a concise and informative manner. If the answer is not present in the context, say "The information is not available in the document."
'''