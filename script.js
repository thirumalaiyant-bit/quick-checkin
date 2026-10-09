
// The neutral check-in is the first screen. The celebration appears only after submit.
const checkInForm = document.getElementById("checkInForm");
const formGate = document.getElementById("formGate");
const surpriseSite = document.getElementById("surpriseSite");
if (checkInForm && formGate && surpriseSite) {
  checkInForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const visitorName = document.getElementById("visitorName").value.trim();
    if (!visitorName) return;
    formGate.style.transition = "opacity .45s ease, transform .45s ease";
    formGate.style.opacity = "0";
    formGate.style.transform = "translateY(-8px)";
    setTimeout(() => {
      formGate.style.display = "none";
      surpriseSite.classList.remove("site-hidden");
      window.scrollTo({ top: 0, behavior: "instant" });
      document.title = "A Little Moment for You";
      launchConfetti(55);
    }, 460);
  });
}

const openSurprise = document.getElementById("openSurprise");
const wishButton = document.getElementById("wishButton");
const wishResult = document.getElementById("wishResult");
const letterButton = document.getElementById("letterButton");
const letterContent = document.getElementById("letterContent");
const closeLetter = document.getElementById("closeLetter");
const confettiLayer = document.getElementById("confettiLayer");
const againButton = document.getElementById("againButton");
const musicButton = document.getElementById("musicButton");
const toast = document.getElementById("toast");

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(showToast.timer);
  showToast.timer = setTimeout(() => toast.classList.remove("show"), 2600);
}

function launchConfetti(amount = 110) {
  const colors = ["#e65d82", "#f3bd72", "#c4a8e8", "#f6d5df", "#d6ad62", "#ffffff"];
  for (let i = 0; i < amount; i++) {
    const piece = document.createElement("span");
    piece.className = "confetti";
    piece.style.left = Math.random() * 100 + "%";
    piece.style.background = colors[Math.floor(Math.random() * colors.length)];
    piece.style.animationDuration = (2.4 + Math.random() * 3.2) + "s";
    piece.style.animationDelay = (Math.random() * .8) + "s";
    piece.style.borderRadius = Math.random() > .5 ? "50%" : "2px";
    confettiLayer.appendChild(piece);
    setTimeout(() => piece.remove(), 6500);
  }
}

openSurprise.addEventListener("click", () => {
  launchConfetti(75);
  document.getElementById("memories").scrollIntoView({ behavior: "smooth" });
  showToast("Your birthday surprise begins, Rabeka! ♥");
});

wishButton.addEventListener("click", () => {
  wishResult.textContent = "Wish made! May something beautiful find its way to you, Rabeka. ♥";
  launchConfetti(120);
  wishButton.textContent = "Wish sent into the universe ✨";
  wishButton.disabled = true;
  showToast("Make a wish and keep believing ✨");
});

letterButton.addEventListener("click", () => {
  const opening = letterContent.hidden;
  letterContent.hidden = !opening;
  letterButton.setAttribute("aria-expanded", String(opening));
  letterButton.querySelector("span:nth-child(2)").textContent = opening ? "Your letter is open" : "Open your letter";
  if (opening) {
    setTimeout(() => letterContent.scrollIntoView({ behavior: "smooth", block: "center" }), 80);
    launchConfetti(25);
  }
});
closeLetter.addEventListener("click", () => {
  letterContent.hidden = true;
  letterButton.setAttribute("aria-expanded", "false");
  letterButton.querySelector("span:nth-child(2)").textContent = "Open your letter";
  letterButton.scrollIntoView({ behavior: "smooth", block: "center" });
});

againButton.addEventListener("click", () => {
  wishResult.textContent = "";
  wishButton.disabled = false;
  wishButton.textContent = "Make a wish ✨";
  letterContent.hidden = true;
  letterButton.setAttribute("aria-expanded", "false");
  letterButton.querySelector("span:nth-child(2)").textContent = "Open your letter";
  window.scrollTo({ top: 0, behavior: "smooth" });
  launchConfetti(80);
  showToast("A fresh little surprise, just for Rabeka ♥");
});

// Browser audio is started only after the visitor taps the music button.
// A gentle generated chime avoids requiring a music file; replace with your own track if desired.
let audioContext = null;
let musicTimer = null;
let musicOn = false;
function playChime() {
  if (!audioContext || !musicOn) return;
  const now = audioContext.currentTime;
  const notes = [523.25, 659.25, 783.99, 659.25];
  notes.forEach((frequency, index) => {
    const oscillator = audioContext.createOscillator();
    const gain = audioContext.createGain();
    oscillator.type = "sine";
    oscillator.frequency.value = frequency;
    gain.gain.setValueAtTime(0.0001, now + index * .35);
    gain.gain.exponentialRampToValueAtTime(0.045, now + index * .35 + .04);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + index * .35 + .28);
    oscillator.connect(gain);
    gain.connect(audioContext.destination);
    oscillator.start(now + index * .35);
    oscillator.stop(now + index * .35 + .3);
  });
}
musicButton.addEventListener("click", async () => {
  musicOn = !musicOn;
  musicButton.setAttribute("aria-pressed", String(musicOn));
  musicButton.innerHTML = musicOn ? "♫ <span>Music on</span>" : "♫ <span>Music</span>";
  if (musicOn) {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (!AudioContextClass) {
      musicOn = false;
      musicButton.setAttribute("aria-pressed", "false");
      musicButton.innerHTML = "♫ <span>Music</span>";
      showToast("Audio is not supported in this browser.");
      return;
    }
    audioContext = audioContext || new AudioContextClass();
    if (audioContext.state === "suspended") await audioContext.resume();
    playChime();
    musicTimer = setInterval(playChime, 5200);
    showToast("Gentle birthday chimes are on ♫");
  } else {
    clearInterval(musicTimer);
    if (audioContext && audioContext.state === "running") await audioContext.suspend();
    showToast("Music paused");
  }
});

// Reveal sections as they enter the screen.
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });
document.querySelectorAll(".reveal").forEach((section) => revealObserver.observe(section));
