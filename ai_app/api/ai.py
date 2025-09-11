# ai_app/api/ai.py
import google.generativeai as genai
import frappe

@frappe.whitelist()
def generate_text(prompt="Suggest a user interest"):
    genai.configure(api_key=frappe.conf.get("gemini_api_key")) 
    model = genai.GenerativeModel("gemini-1.5-flash")

    response = model.generate_content(prompt)
    return response.text
