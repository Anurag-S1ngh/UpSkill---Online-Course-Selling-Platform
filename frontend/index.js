const webTrack = document.querySelector(".web_track");
const aiTrack = document.querySelector(".ai_track");
const dsaTrack = document.querySelector(".dsa_track");
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
    behavior: "smooth", // Smooth scroll
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
  // Reset the previous track to the start
  currentTrack.scrollTo({
    left: 0, // Scroll to the start (first item)
    behavior: "smooth", // Smooth scroll
  });

  // Update the current track and items
  currentTrack.style.display = "none"; // Hide the previous track
  currentTrack = newTrack;
  currentItems = newItems;
  currentIndex = 0; // Reset index for the new track

  // Show the selected track and reset its scroll position
  currentTrack.style.display = "flex"; // Show the selected track
  currentTrack.scrollTo({ left: 0, behavior: "smooth" }); // Reset the new track position
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

let currentIndex2 = 0;

// Function to move the second carousel slide
function moveSlide(step) {
  const slides = document.querySelectorAll(".testimonial_item");
  const totalSlides = slides.length - 2;
  currentIndex2 = (currentIndex2 + step + totalSlides) % totalSlides; // Calculate the new index
  const track = document.querySelector(".testimonials_carousel_track");
  const slideWidth = slides[0].offsetWidth; // Get the width of a single slide
  const gap = 20; // The gap value in pixels between slides

  track.style.transform = `translateX(-${currentIndex2 * (slideWidth + gap)}px)`; // Update the track position considering the gap
}

let autoSlideInterval = setInterval(() => moveSlide(1), 2000);

const carousel = document.querySelector(".testimonials_carousel");
carousel.addEventListener("mouseenter", () => clearInterval(autoSlideInterval));

// Resume the carousel after hover
carousel.addEventListener("mouseleave", () => {
  autoSlideInterval = setInterval(() => moveSlide(1), 5000);
});
