import os
import requests
import google.generativeai as genai
from dotenv import load_dotenv

load_dotenv()

def response_gemini(prompt):
    api_key = os.getenv("GEMINI_API_KEY")
    if not api_key:
        raise ValueError("Google API Key not set!")

    genai.configure(api_key=api_key)
    model = genai.GenerativeModel(model_name="models/gemini-1.5-flash-latest")
    try:
        response = model.generate_content(prompt)
        return response.text.strip()
    except Exception as e:
        return f"Error: {str(e)}"
