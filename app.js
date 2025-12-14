// ===============================
// NAINA V.AI – Frontend Logic
// ===============================

// ---- UI ELEMENTS ----
const logBox = document.getElementById("log");
const answerBox = document.getElementById("answerBox");
const imageBox = document.getElementById("imageBox");
const wifiStatus = document.getElementById("wifiStatus");
const promptInput = document.getElementById("promptInput");

// ---- SYSTEM STATE ----
const devices = {
  cam: false,
  display: false
};

let imageReceived = false;

// ---- SERIAL MONITOR LOG ----
function log(message) {
  const line = document.createElement("div");
  line.textContent = "> " + message;
  logBox.appendChild(line);
  logBox.scrollTop = logBox.scrollHeight;
}

// ---- DEVICE REGISTRATION ----
function registerDevice(type) {
  if (!devices[type]) {
    devices[type] = true;
    log(type.toUpperCase() + " connected to website");
    updateWiFiStatus();
  }
}

function updateWiFiStatus() {
  if (devices.cam && devices.display) {
    wifiStatus.textContent = "WiFi ✓";
    wifiStatus.style.background = "#0a3";
  } else {
    wifiStatus.textContent = "WiFi ×";
    wifiStatus.style.background = "#400";
  }
}

// ---- IMAGE RECEIVE (FROM ESP32-CAM) ----
function receiveImage() {
  imageReceived = true;
  imageBox.textContent = "Image received";
  log("Image received from ESP32-CAM");
}

// ---- ANALYSIS FLOW ----
function analyzeImage() {
  if (!imageReceived) {
    log("No image available for analysis");
    answerBox.textContent = "No image received yet";
    return;
  }

  const prompt = promptInput.value.trim();

  log("ASK pressed");
  log("Preparing request for Groq LLaMA Scout");

  if (prompt) {
    log("Prompt added: \"" + prompt + "\"");
  } else {
    log("No prompt provided, using default analysis");
  }

  answerBox.textContent = "Analyzing image...";

  // ---- SIMULATED API CALL ----
  setTimeout(() => {
    const output =
      "Analysis complete. (Demo response from LLaMA Scout)";

    answerBox.textContent = output;

    log("Groq API response received");
    log("Sending output to ESP32 display");
    log("ESP32 OLED updated successfully");

  }, 1500);
}

// ---- BUTTON EVENTS ----
document.getElementById("captureBtn").onclick = () => {
  log("Capture command sent to ESP32-CAM");
  receiveImage();
};

document.getElementById("askBtn").onclick = () => {
  analyzeImage();
};

document.getElementById("regenBtn").onclick = () => {
  if (!imageReceived) {
    log("Regenerate failed: no image");
    return;
  }
  log("Regenerate requested");
  analyzeImage();
};

// ---- SYSTEM BOOT ----
log("Website loaded");
log("Waiting for devices...");

// Simulated power-on registration
registerDevice("cam");
registerDevice("display");
