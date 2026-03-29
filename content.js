console.log("✅ Content script loaded");

function removePopup() {
  const existing = document.getElementById("glossary-popup");
  if (existing) existing.remove();
}

function showPopup(clientX, clientY, word) {
  removePopup();

  const popup = document.createElement("div");
  popup.id = "glossary-popup";

  // Inline styles ONLY — ignores all website CSS
  popup.setAttribute("style", `
    all: initial !important;
    position: fixed !important;
    left: ${Math.min(clientX, window.innerWidth - 330)}px !important;
    top: ${Math.min(clientY + 15, window.innerHeight - 220)}px !important;
    z-index: 2147483647 !important;
    background: #ffffff !important;
    border-radius: 12px !important;
    box-shadow: 0 8px 24px rgba(0,0,0,0.3) !important;
    width: 300px !important;
    font-family: Arial, sans-serif !important;
    font-size: 14px !important;
    display: block !important;
    overflow: hidden !important;
  `);

  popup.innerHTML = `
    <div style="
      display: flex !important;
      justify-content: space-between !important;
      align-items: center !important;
      background: #4f46e5 !important;
      color: white !important;
      padding: 10px 14px !important;
      font-family: Arial, sans-serif !important;
      font-size: 14px !important;
      font-weight: bold !important;
    ">
      <span style="color:white !important;">📖 "${word}"</span>
      <span id="glossary-close" style="
        cursor: pointer !important;
        color: white !important;
        font-size: 18px !important;
        line-height: 1 !important;
      ">✕</span>
    </div>
    <div id="glossary-body" style="
      display: block !important;
      padding: 12px 14px !important;
      color: #333333 !important;
      line-height: 1.6 !important;
      min-height: 50px !important;
      font-family: Arial, sans-serif !important;
      font-size: 14px !important;
      background: white !important;
    ">⏳ Getting explanation...</div>
  `;

  document.body.appendChild(popup);

  document.getElementById("glossary-close").addEventListener("click", removePopup);
}

document.addEventListener("mouseup", async (event) => {
  const selectedText = window.getSelection().toString().trim();

  if (!selectedText || selectedText.length < 2 || selectedText.length > 80) return;

  const context = window.getSelection().anchorNode?.textContent || "";

  console.log("📤 Sending word:", selectedText);

  // Pass event coordinates directly
  showPopup(event.clientX, event.clientY, selectedText);

  try {
    const response = await chrome.runtime.sendMessage({
      type: "GET_MEANING",
      word: selectedText,
      context: context
    });

    console.log("📥 Got response:", response);

    const body = document.getElementById("glossary-body");
    if (!body) return;

    if (response?.meaning) {
      body.style.color = "#333333";
      body.style.fontSize = "14px";
      body.style.fontFamily = "Arial, sans-serif";
      body.style.padding = "12px 14px";
      body.style.lineHeight = "1.6";
      body.style.background = "white";
      body.textContent = response.meaning;
    } else {
      body.textContent = "❌ " + (response?.error || "Unknown error");
    }

  } catch (err) {
    console.error("❌ Error:", err);
    const body = document.getElementById("glossary-body");
    if (body) {
      if (err.message.includes("Extension context invalidated")) {
        body.textContent = "🔄 Refresh this page (Ctrl+R) to use the extension.";
      } else {
        body.textContent = "❌ " + err.message;
      }
    }
  }
});