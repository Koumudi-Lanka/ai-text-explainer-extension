console.log("✅ Background running...");

const HF_API_KEY = "YOUR_API_KEY_HERE"; // ← paste your hf_ token here

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  console.log("📨 Message received:", request);

  if (request.type === "GET_MEANING") {
    const word = request.word;
    const context = request.context || "";

    fetch("https://router.huggingface.co/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": "Bearer " + HF_API_KEY,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
       model: "meta-llama/Llama-3.1-8B-Instruct:cerebras",
        messages: [
          {
            role: "user",
            content: `Explain the word "${word}" in 2-3 simple sentences. Context: "${context.substring(0, 200)}"`
          }
        ],
        max_tokens: 120
      })
    })
    .then(res => res.json())
    .then(data => {
      console.log("✅ HF Response:", data);
      const meaning = data?.choices?.[0]?.message?.content;
      if (meaning) {
        sendResponse({ meaning: meaning.trim() });
      } else {
        sendResponse({ meaning: "❌ " + JSON.stringify(data) });
      }
    })
    .catch(err => {
      console.error("❌ Error:", err);
      sendResponse({ error: err.message });
    });

    return true;
  }
});