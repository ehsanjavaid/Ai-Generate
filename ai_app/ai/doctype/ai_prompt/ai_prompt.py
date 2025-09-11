import frappe
import google.generativeai as genai
from frappe.model.document import Document
import markdown


class AiPrompt(Document):
    pass

@frappe.whitelist()
def generate_ai_text(prompt, docname):
    gemini_key = frappe.local.conf.get("gemini_api_key")
    if not gemini_key:
        frappe.throw(
            "Gemini API key not found in site_config.json or common_site_config.json")

    genai.configure(api_key=gemini_key)
    answer = ""
    try:
        model = genai.GenerativeModel("gemini-1.5-flash")

        response = model.generate_content(prompt)

        if not response or not response.text:
            frappe.throw("No response received from Gemini API")

        answer = response.text.strip()

    except Exception as e:
        frappe.log_error(frappe.get_traceback(), "Gemini API Error")
        frappe.throw(f"Gemini API failed: {str(e)}")
    
    try:
        answer_html = markdown.markdown(answer)
        frappe.db.set_value("Ai Prompt", docname, "response_text",answer_html, update_modified=False)

    except Exception:
        frappe.log_error(frappe.get_traceback(), "Failed to update Ai Prompt Doc")
        frappe.throw("AI response generated but could not be saved to the document")

    return answer
