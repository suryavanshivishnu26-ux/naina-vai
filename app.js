// ===============================
// NAINA V.AI – Website ↔ Backend
// ===============================

// ---- BACKEND URL ----
const CORE_URL = "https://naina-vai-core.suryavanshivishnu-26.workers.dev";

// ---- UI ELEMENTS ----
const logBox = document.getElementById("log");
const wifiStatus = document.getElementById("wifiStatus");
const answerBox = document.getElementById("answerBox");
const imageBox = document.getElementById("imageBox");
const promptInput = document.getElementById("promptInput");

// ---- DEVICE STATE ----
const devices = {
  cam: false,
  display: false
};

let imageReady = false;

// ---- SERIAL MONITOR ----
function log(msg) {
  const line = document.createElement("div");
  line.textContent = "> " + msg;
  logBox.appendChild(line);
  logBox.scrollTop = logBox.scrollHeight;
}

// ---- WIFI STATUS ----
function updateWiFi() {
  if (devices.cam && devices.display) {
    wifiStatus.textContent = "WiFi ✓";
    wifiStatus.style.background = "#0a3";
  } else {
    wifiStatus.textContent = "WiFi ×";
    wifiStatus.style.background = "#400";
  }
}

// ---- REGISTER DEVICE WITH BACKEND ----
async function registerDevice(type) {
  log(`Registering ${type.toUpperCase()}…`);

  try {
    const res = await fetch(`${CORE_URL}/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ device: type })
    });

    const data = await res.json();

    if (data.status === "ok") {
      devices[type] = true;
      log(data.message);
      updateWiFi();
    } else {
      log(`Registration failed for ${type}`);
    }

  } catch (err) {
    log(`Backend error while registering ${type}`);
  }
}

// ---- IMAGE RECEIVE (SIMULATED FOR NOW) ----
function receiveImage() {
  imageReady = true;
  imageBox.textContent = "Image received";
  log("Image received from ESP32-CAM");
}

// ---- ANALYSIS FLOW (SIMULATED) ----
function analyzeImage() {
  if (!imageReady) {
    log("No image available");
    answerBox.textContent = "No image received yet";
    return;
  }

  const prompt = promptInput.value.trim();
  log("ASK pressed");
  log(prompt ? `Prompt: "${prompt}"` : "No prompt provided");
  log("Sending image + prompt to Groq LLaMA Scout");

  answerBox.textContent = "Analyzing image…";

  setTimeout(() => {
    answerBox.textContent =
      "Analysis complete (demo output)";
    log("Groq API response received");
    log("Sending output to ESP32 OLED");
  }, 1500);
}

// ---- BUTTON EVENTS ----
document.getElementById("captureBtn").onclick = () => {
  log("Capture command sent to ESP32-CAM");
  receiveImage();
};

document.getElementById("askBtn").onclick = analyzeImage;

document.getElementById("regenBtn").onclick = () => {
  if (!imageReady) {
    log("Regenerate failed: no image");
    return;
  }
  log("Regenerate requested");
  analyzeImage();
};

// ---- SYSTEM BOOT ----
log("Website loaded");
log("Contacting backend…");

// Register devices (website-side simulation)
registerDevice("cam");
registerDevice("display");
