import json
import re

def clean_and_parse_gemini_output(raw_str):
    # Remove Markdown code fences like ```json ... ```
    cleaned = re.sub(r"```(?:json)?", "", raw_str).strip()
    return json.loads(cleaned)
