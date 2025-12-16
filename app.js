// ===============================
// NAINA V.AI — app.js
// Website-triggered capture
// ===============================

// ---- BACKEND URL (DO NOT CHANGE SPELLING) ----
const BACKEND =
  "https://naina-vai-core.suryavanshivishnu-26.workers.dev";

// ---- UI ELEMENTS ----
const logBox = document.getElementById("log");
const imageBox = document.getElementById("imageBox");
const captureBtn = document.getElementById("captureBtn");

// ---- LOG FUNCTION ----
function log(msg) {
  const time = new Date().toLocaleTimeString();
  logBox.innerHTML += `[${time}] ${msg}<br>`;
  logBox.scrollTop = logBox.scrollHeight;
}

// ---- CHECK BACKEND ON LOAD ----
async function checkBackend() {
  try {
    const res = await fetch(BACKEND);
    const data = await res.json();
    log("Website loaded");
    log("Backend online");
  } catch (e) {
    log("Backend not reachable");
  }
}

// ---- TRIGGER CAPTURE ----
async function triggerCapture() {
  try {
    log("Requesting capture from ESP32-CAM…");
    await fetch(`${BACKEND}/trigger-capture`);

    // start polling immediately
    setTimeout(() => fetchImage(), 500);

  } catch (e) {
    log("Failed to trigger capture");
  }
}


// ---- FETCH IMAGE ----
async function fetchImage(retries = 8) {
  try {
    const res = await fetch(`${BACKEND}/latest-image`);

    if (!res.ok) {
      if (retries > 0) {
        log("Waiting for image…");
        setTimeout(() => fetchImage(retries - 1), 700);
      } else {
        log("Image capture timed out");
      }
      return;
    }

    const data = await res.json();

    if (!data.image || data.image.length < 200) {
      if (retries > 0) {
        log("Waiting for valid image…");
        setTimeout(() => fetchImage(retries - 1), 700);
      }
      return;
    }

    imageBox.innerHTML = `
      <img
        src="data:image/jpeg;base64,${data.image}"
        style="width:100%; border-radius:12px;"
      />
    `;

    log("Image received and displayed");

  } catch (e) {
    log("Error fetching image");
  }
}



// ---- BUTTON BINDING ----
captureBtn.addEventListener("click", triggerCapture);

// ---- INIT ----
checkBackend();
