let startX;
let scrollLeft;
let isDragging = false;
const slider = document.getElementById('card-container');
const cards = document.querySelectorAll('.card');
const dotsContainer = document.getElementById('dots-container');
let currentActive = 0;
let debounceTimer;

function createDots() {
  for (let i = 0; i < cards.length; i++) {
    const dot = document.createElement('div');
    dot.classList.add('dot');
    dot.addEventListener('click', () => scrollToCard(i));
    dotsContainer.appendChild(dot);
  }
  updateDots();
}

function updateDots() {
  const dots = document.querySelectorAll('.dot');
  dots.forEach((dot, index) => {
    dot.classList.remove('active');
    if (index === currentActive) {
      dot.classList.add('active');
    }
  });
}

function scrollToCard(index) {
  const cardWidth = slider.offsetWidth;
  slider.scrollTo({
    left: cardWidth * index,
    behavior: 'smooth'
  });
  currentActive = index;
  updateDots();
}

slider.addEventListener('touchstart', (e) => {
  isDragging = true;
  startX = e.touches[0].pageX - slider.offsetLeft;
  scrollLeft = slider.scrollLeft;
});

slider.addEventListener('touchmove', (e) => {
  if (!isDragging) return;
  e.preventDefault();
  const x = e.touches[0].pageX - slider.offset
  Left;
const walk = (x - startX); // Adjust the sensitivity if needed
slider.scrollLeft = scrollLeft - walk;
});

slider.addEventListener('touchend', () => {
isDragging = false;
updateAfterDrag();
});

function updateAfterDrag() {
clearTimeout(debounceTimer); // Clear any running timeouts

debounceTimer = setTimeout(() => {
const cardWidth = slider.offsetWidth;
const index = Math.round(slider.scrollLeft / cardWidth);
slider.scrollTo({
left: cardWidth * index,
behavior: 'smooth'
});
currentActive = index;
updateDots();
}, 100); // Delay to avoid flickering effect
}

createDots();