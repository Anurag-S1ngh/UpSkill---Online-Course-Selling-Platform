const webTrack = document.querySelector(".web_track");
const aiTrack = document.querySelector(".ai_track");
const dsaTrack = document.querySelector('.dsa_track');
const webItems = Array.from(webTrack.children);
const aiItems = Array.from(aiTrack.children);
const dsaItems = Array.from(dsaTrack.children);
const prevButton = document.querySelector(".previous_button");
const nextButton = document.querySelector(".next_button");
const webDevButton = document.querySelector(".web_dev");
const aiButton = document.querySelector(".ai");
const dsaButton = document.querySelector(".dsa");

let currentIndex = 0;
let currentTrack = webTrack; // Default to webTrack
let currentItems = webItems; // Default to webItems

function updateButtons() {
  prevButton.disabled = currentIndex === 0;
  nextButton.disabled = currentIndex === currentItems.length - 1;
}

function moveCarousel(index) {
  const itemWidth = currentItems[0].getBoundingClientRect().width; // Dynamically get item width
  currentTrack.scrollTo({
    left: index * itemWidth, // Scroll to the desired index
    behavior: 'smooth' // Smooth scroll
  });
  currentIndex = index;
  updateButtons();
}

function resetStyles() {
  webDevButton.style.backgroundColor = "#fff";
  webDevButton.style.color = "#120e1d";
  aiButton.style.backgroundColor = "#fff";
  aiButton.style.color = "#120e1d";
  dsaButton.style.backgroundColor = "#fff";
  dsaButton.style.color = "#120e1d";
  webTrack.style.display = "none";
  aiTrack.style.display = "none";
  dsaTrack.style.display = "none";
}

function setTrack(newTrack, newItems) {
  currentTrack = newTrack;
  currentItems = newItems;
  currentIndex = 0; // Reset index for the new track
  currentTrack.style.display = "flex"; // Show the selected track
  currentTrack.style.transform = "translateX(0)"; // Reset position
  updateButtons();
}

webDevButton.addEventListener("click", () => {
  resetStyles();
  webDevButton.style.backgroundColor = "#4d5bfc";
  webDevButton.style.color = "#f9f9f9";
  setTrack(webTrack, webItems);
});

aiButton.addEventListener("click", () => {
  resetStyles();
  aiButton.style.backgroundColor = "#4d5bfc";
  aiButton.style.color = "#f9f9f9";
  setTrack(aiTrack, aiItems);
});

dsaButton.addEventListener("click", () => {
  resetStyles();
  dsaButton.style.backgroundColor = "#4d5bfc";
  dsaButton.style.color = "#f9f9f9";
  setTrack(dsaTrack, dsaItems);
});

prevButton.addEventListener("click", () => {
  if (currentIndex > 0) moveCarousel(currentIndex - 1);
});

nextButton.addEventListener("click", () => {
  if (currentIndex < currentItems.length - 1) moveCarousel(currentIndex + 1);
});

// Initialize default state
setTrack(webTrack, webItems);

