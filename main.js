const slides = Array.from(document.querySelectorAll('.slide'));
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const dotsContainer = document.getElementById('carouselDots');

let current = 0;

function goTo(index) {
  slides[current].classList.remove('active');
  current = (index + slides.length) % slides.length;
  slides[current].classList.add('active');
  updateDots();
}

function next() { goTo(current + 1); }
function prev() { goTo(current - 1); }

/* Build dots */
slides.forEach((_, i) => {
  const btn = document.createElement('button');
  btn.className = 'dot-btn' + (i === 0 ? ' active' : '');
  btn.setAttribute('aria-label', `Slide ${i + 1}`);
  btn.addEventListener('click', () => goTo(i));
  dotsContainer.appendChild(btn);
});

function updateDots() {
  dotsContainer.querySelectorAll('.dot-btn').forEach((btn, i) => {
    btn.classList.toggle('active', i === current);
  });
}

/* Arrow buttons */
prevBtn.addEventListener('click', prev);
nextBtn.addEventListener('click', next);

/* Keyboard */
document.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowLeft')  prev();
  if (e.key === 'ArrowRight') next();
});

/* Touch swipe */
let touchStartX = 0;
const carousel = document.getElementById('carousel');

carousel.addEventListener('touchstart', (e) => {
  touchStartX = e.changedTouches[0].clientX;
}, { passive: true });

carousel.addEventListener('touchend', (e) => {
  const dx = e.changedTouches[0].clientX - touchStartX;
  if (Math.abs(dx) > 40) dx < 0 ? next() : prev();
}, { passive: true });
