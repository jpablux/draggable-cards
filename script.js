let startX;
let scrollLeft;
const slider = document.getElementById('card-container');

slider.addEventListener('touchstart', (e) => {
  startX = e.touches[0].pageX - slider.offsetLeft;
  scrollLeft = slider.scrollLeft;
});

slider.addEventListener('touchmove', (e) => {
  e.preventDefault();
  const x = e.touches[0].pageX - slider.offsetLeft;
  const walk = (x - startX) * 2; // The number 2 will determine the sensitivity of the scroll
  slider.scrollLeft = scrollLeft - walk;
});

const cardContainer = document.getElementById('card-container');
const dotsContainer = document.getElementById('dots-container');
const cards = document.querySelectorAll('.card');
let currentActive = 0;

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
    if(index === currentActive) {
      dot.classList.add('active');
    }
  });
}

function scrollToCard(index) {
  const card = cards[index];
  cardContainer.scrollLeft = card.offsetLeft - cardContainer.offsetWidth / 2 + card.offsetWidth / 2;
  currentActive = index;
  updateDots();
}

cardContainer.addEventListener('scroll', () => {
  const scrollLeft = cardContainer.scrollLeft;
  let activeIndex = Math.round(scrollLeft / (cardContainer.scrollWidth / cards.length));
  if (activeIndex >= cards.length) {
    activeIndex = cards.length - 1;
  }
  currentActive = activeIndex;
  updateDots();
});

createDots();

let debounceTimer;

cardContainer.addEventListener('scroll', () => {
  // Clear any existing debounceTimer
  clearTimeout(debounceTimer);

  // Set a timeout to update the dots after 100 milliseconds
  debounceTimer = setTimeout(() => {
    const scrollLeft = cardContainer.scrollLeft;
    let activeIndex = Math.round(scrollLeft / (cardContainer.scrollWidth / cards.length));
    if (activeIndex >= cards.length) {
      activeIndex = cards.length - 1;
    }
    currentActive = activeIndex;
    updateDots();
  }, 100); // You can adjust the timeout duration to suit your needs
});