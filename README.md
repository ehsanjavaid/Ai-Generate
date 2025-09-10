# AI Prompt App (Frappe + Gemini API)

This app integrates **Google Gemini AI** into Frappe.
It provides a simple interface inside Desk where users can enter a prompt, generate an AI response, and save it into a document.

---

## 🎯 Purpose

* Allow users to **interact with AI directly inside Frappe**
* Generate **text, answers, or ideas** from a given prompt
* Store AI-generated responses in a **Frappe Doctype** for later use
* Provide a base app to extend into chatbots, assistants, or automation tools

---

## 🚀 Features

* New Doctype: **AI Prompt**
* Button **Generate** → opens a popup to enter text
* Calls **Gemini API** with your prompt
* AI response is displayed and **saved automatically** in the document
* Error handling with Frappe’s Error Log

---

## 📦 Installation

1. Navigate to your bench:

```bash
   cd ~/frappe-bench
```

2. Get the app:

```bash
   bench get-app https://github.com/ehsanjavaid/Ai-Generate.git
```

3. Install on your site:

```bash
   bench --site ai.localhost install-app ai_app
```

4. Restart bench:

```bash
   bench restart
```

---

## 🔑 Configuration

1. Install Gemini SDK inside the bench environment:

```bash
   cd ~/frappe-bench
   source env/bin/activate
   pip install google-generativeai
```

2. Add your **Gemini API key** to `site_config.json`:

```json
   {
     "gemini_api_key": "YOUR_API_KEY"
   }
```

3. Restart bench:

```bash
   bench restart
```

---

## 🖥️ Usage

1. Go to **AI Prompt** doctype in Desk.
2. Click **Generate**.
3. Enter your prompt in the popup.
4. Gemini AI generates text → it is **shown and saved** in the document.
