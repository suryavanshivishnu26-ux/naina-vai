const logBox = document.getElementById("log");
const answerBox = document.getElementById("answerBox");

function log(msg) {
  const line = document.createElement("div");
  line.textContent = "> " + msg;
  logBox.appendChild(line);
  logBox.scrollTop = logBox.scrollHeight;
}

// Simulated device activity
log("Website loaded");
log("Waiting for ESP32 devices...");

document.getElementById("captureBtn").onclick = () => {
  log("ESP32-CAM: Capture button pressed");
  log("Image received by website");
};

document.getElementById("askBtn").onclick = () => {
  log("ASK pressed");
  log("Sending image + prompt to Groq API");
  answerBox.textContent = "Analyzing image...";
  setTimeout(() => {
    answerBox.textContent = "Analysis complete (demo output)";
    log("Groq API response received");
    log("Sending output to ESP32 OLED");
  }, 1500);
};

document.getElementById("regenBtn").onclick = () => {
  log("Regenerate requested");
};

