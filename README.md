# 🧠 AI Text Explainer Chrome Extension

## 📌 Overview
A real-time Chrome Extension that provides **AI-powered explanations** for selected text on web pages, reducing context switching and improving reading efficiency.

---

## 🚀 Features
- 🔍 Select any word or sentence on a webpage
- 🤖 Get instant AI-generated explanation
- 🌐 Works across websites (YouTube, Wikipedia, Medium)
- ⚡ Fast response using Hugging Face inference API
- 🎨 Clean popup UI with contextual positioning

---

## 🛠️ Tech Stack
- JavaScript (Vanilla)
- Chrome Extensions API (Manifest V3)
- Hugging Face Inference API
- HTML + CSS (Popup UI)

---

## 🤖 AI Model Used
- `meta-llama/Llama-3.1-8B-Instruct: cerebras`

Used via Hugging Face Router API:
https://router.huggingface.co/v1/chat/completions

---

## ⚙️ How It Works (Architecture)

1. User selects text on a webpage  
2. `content.js` captures selected word + context  
3. Message sent to `background.js`  
4. `background.js` calls Hugging Face API  
5. AI generates explanation  
6. Response sent back to content script  
7. Popup displayed near cursor  

---

## 🔄 Data Flow

User Selection → Content Script → Background Script → Hugging Face API → Response → Popup UI

---

## 📷 Demo

screenshot1.png
screenshot2.png
screenshot3.png

---

## 🎥 Video Demo (Recommended)
👉 (Add Google Drive / YouTube link here)

---

## ⚠️ Limitations
- Does not support YouTube video subtitles (dynamic rendering)
- Requires internet connection
- API rate limits may apply

---

## 🔐 Security Note
API keys are not included in this repository.

To run locally:
```js
const HF_API_KEY = "YOUR_API_KEY_HERE";