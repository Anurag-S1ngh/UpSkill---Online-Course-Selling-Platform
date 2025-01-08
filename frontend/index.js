const track = document.querySelector('.carousel_track');
const items = Array.from(track.children);
const prevButton = document.querySelector('.previous_button');
const nextButton = document.querySelector('.next_button');
const webDevButton = document.querySelector(".web_dev");
const aiButton = document.querySelector(".ai");
const dsaButton= document.querySelector(".dsa");

let currentIndex = 0;

function updateButtons() {
  prevButton.disabled = currentIndex === 0;
  nextButton.disabled = currentIndex === items.length - 1;
}

function moveCarousel(index) {
  const itemWidth = items[0].getBoundingClientRect().width; // Dynamically get the item width
  track.style.transform = `translateX(-${index * itemWidth}px)`; // Use px for precise translation
  currentIndex = index;
  updateButtons();
}

updateButtons();

prevButton.addEventListener('click', () => {
  if (currentIndex > 0) moveCarousel(currentIndex - 1);
});

nextButton.addEventListener('click', () => {
  if (currentIndex < items.length - 1) moveCarousel(currentIndex + 1);
});

function resetColor(){
  webDevButton.style.backgroundColor = "#fff";
  webDevButton.style.color = "#120e1d";
  aiButton.style.backgroundColor = "#fff";
  aiButton.style.color = "#120e1d"; 
  dsaButton.style.backgroundColor = "#fff";
  dsaButton.style.color = "#120e1d";
}

document.querySelector(".web_dev").addEventListener("click",()=>{
  resetColor();
    webDevButton.style.backgroundColor = "#4d5bfc";
    webDevButton.style.color = "#f9f9f9";
})

aiButton.addEventListener("click",()=>{
  resetColor();
  aiButton.style.backgroundColor = "#4d5bfc";
  aiButton.style.color = "#f9f9f9";
 })

dsaButton.addEventListener("click",()=>{
  resetColor();
  dsaButton.style.backgroundColor = "#4d5bfc";
  dsaButton.style.color = "#f9f9f9";
})