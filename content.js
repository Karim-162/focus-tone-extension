let typingSpeed = 0;
let lastKeyTime = Date.now();

let scrollSpeed = 0;
let lastScrollY = window.scrollY;
let lastScrollTime = Date.now();

let mouseMovements = 0;

document.addEventListener("keydown", () => {
  const now = Date.now();
  typingSpeed = 1000 / (now - lastKeyTime);
  lastKeyTime = now;
});

window.addEventListener("scroll", () => {
  const now = Date.now();
  const newY = window.scrollY;
  scrollSpeed = Math.abs(newY - lastScrollY) / (now - lastScrollTime);
  lastScrollY = newY;
  lastScrollTime = now;
});

document.addEventListener("mousemove", () => {
  mouseMovements++;
});

setInterval(() => {
  let mood = "neutral";
  console.log("Mood check running...");
  if (typingSpeed > 3 || scrollSpeed > 1 || mouseMovements > 300) {
    mood = "stressed";
  } else if (typingSpeed < 1 && scrollSpeed < 0.5 && mouseMovements < 100) {
    mood = "calm";
  }

  applyMoodFilter(mood);
  mouseMovements = 0; // reset mouse count
}, 5000);

function applyMoodFilter(mood) {
  const existing = document.getElementById("focus-tone-filter");
  if (existing) existing.remove(); // আগের filter মুছে ফেলি

  const filter = document.createElement("div");
  filter.id = "focus-tone-filter";
  filter.style.position = "fixed";
  filter.style.top = 0;
  filter.style.left = 0;
  filter.style.width = "100vw";
  filter.style.height = "100vh";
  filter.style.pointerEvents = "none"; // যাতে user interaction block না হয়
  filter.style.zIndex = 999999;

  if (mood === "calm") {
    filter.style.backgroundColor = "rgba(173, 216, 230, 0.2)"; // light blue
  } else if (mood === "stressed") {
    filter.style.backgroundColor = "rgba(255, 255, 0, 0.2)"; // soft yellow
  } else {
    filter.style.backgroundColor = "rgba(128, 128, 128, 0.05)"; // light gray
  }

  document.body.appendChild(filter);
}
