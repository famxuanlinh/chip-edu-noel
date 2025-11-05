//Toggle to show/hide support box
function toggleVisibility(boxId) {
  var supportBox = document.getElementById("support-box");
  var chatBox = document.getElementById("chat-box");
  // var supportBtn = document.getElementById("btn-support-box");
  // var supportIcon = supportBtn.querySelector("svg");

  if (supportBox.classList.contains("hidden")) {
    // Show support box, hide chat
    supportBox.classList.remove("hidden");
    chatBox.classList.add("hidden");
    // supportBtn.style.backgroundColor = "rgba(255, 255, 255, 0.4)";
    // supportIcon.style.color = "#ffffff";
  } else {
    // Hide support box, show chat
    supportBox.classList.add("hidden");
    chatBox.classList.remove("hidden");
    // supportBtn.style.backgroundColor = "rgba(255, 255, 255, 0.2)";
    // supportIcon.style.color = "#ffffff";
  }
}

function refreshPage() {
  location.reload();
}

function sendMessage() {
  const input = document.getElementById("chat-input");
  const messagesContainer = document.getElementById("chat-messages");
  const message = input.value.trim();

  if (message) {
    const messageElement = document.createElement("div");
    messageElement.className = "flex items-start gap-2 justify-end";
    messageElement.innerHTML = `
        <div class="bg-[#d8eddd] max-w-75 flex items-end gap-2 rounded-xl p-2 px-3 relative">
          <div class="text-[#00140b] text-lg font-medium leading-7 mb-1">${message}</div>
          <div class="text-black/40 text-sm font-medium leading-6 text-right">${new Date().toLocaleTimeString(
            "en-US",
            { hour: "2-digit", minute: "2-digit", hour12: false }
          )}</div>
        </div>
      `;

    messagesContainer.appendChild(messageElement);
    input.value = "";

    // Scroll to bottom
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
  }
}

// Enter key to send message
document
  .getElementById("chat-input")
  .addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
      sendMessage();
    }
  });

// Auto scroll to bottom of chat
const chatMessages = document.getElementById("chat-messages");
chatMessages.scrollTop = chatMessages.scrollHeight;
