#  AI Text Explainer Chrome Extension

##  Overview
AI-powered Chrome extension that explains selected text in real-time, reducing context switching while browsing.
---

##  Problem Solved
Users often switch tabs to search meanings of unfamiliar words, breaking focus.  
This extension provides instant explanations without leaving the page.
---

##  Features
-  Select any word or sentence on a webpage
-  Get instant AI-generated explanation
-  Works across websites (YouTube, Wikipedia, Medium)
-  Fast response using Hugging Face inference API
-  Clean popup UI with contextual positioning

---

##  Tech Stack
- JavaScript (Vanilla)
- Chrome Extensions API (Manifest V3)
- Hugging Face Inference API
- HTML + CSS (Popup UI)

---

##  AI Model Used
- `meta-llama/Llama-3.1-8B-Instruct: cerebras`

Used via Hugging Face Router API:
https://router.huggingface.co/v1/chat/completions

---

##  Workflow

1. User selects text on a webpage  
2. Content script captures selected text  
3. Background script sends request to Hugging Face API  
4. LLM generates explanation  
5. Response displayed in a floating popup  

---

##  Use Cases
- Students understanding complex topics  
- Reading technical blogs (Medium, Wikipedia)  
- Quick learning without switching tabs  
- Improving productivity while browsing

---

##  Data Flow

User Selection → Content Script → Background Script → Hugging Face API → Response → Popup UI

---

##  Demo

screenshot1.png
screenshot2.png
screenshot3.png

---

##  Limitations
- Does not support YouTube video subtitles (dynamic rendering)
- Requires internet connection
- API rate limits may apply

---

##  Security Note
API keys are not included in this repository.

To run locally:
```js
const HF_API_KEY = "YOUR_API_KEY_HERE";
