/* =========================================================
   NAV — add .scrolled class on scroll
   ========================================================= */
const nav = document.querySelector('.nav');

window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 40);
}, { passive: true });

/* =========================================================
   CAROUSEL
   ========================================================= */
const slides = Array.from(document.querySelectorAll('.slide'));
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const dotsContainer = document.getElementById('carouselDots');

let current = 0;
let autoTimer = null;

function goTo(index) {
  slides[current].classList.remove('active');
  current = (index + slides.length) % slides.length;
  slides[current].classList.add('active');
  updateDots();
}

function next() { goTo(current + 1); }
function prev() { goTo(current - 1); }

/* Dots */
function buildDots() {
  slides.forEach((_, i) => {
    const btn = document.createElement('button');
    btn.className = 'dot-btn' + (i === 0 ? ' active' : '');
    btn.setAttribute('aria-label', `Go to slide ${i + 1}`);
    btn.addEventListener('click', () => { goTo(i); resetAuto(); });
    dotsContainer.appendChild(btn);
  });
}

function updateDots() {
  dotsContainer.querySelectorAll('.dot-btn').forEach((btn, i) => {
    btn.classList.toggle('active', i === current);
  });
}

buildDots();

/* Arrow buttons */
prevBtn.addEventListener('click', () => { prev(); resetAuto(); });
nextBtn.addEventListener('click', () => { next(); resetAuto(); });

/* Keyboard */
document.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowLeft')  { prev(); resetAuto(); }
  if (e.key === 'ArrowRight') { next(); resetAuto(); }
});

/* Touch/swipe */
let touchStartX = 0;

document.getElementById('carousel').addEventListener('touchstart', (e) => {
  touchStartX = e.changedTouches[0].clientX;
}, { passive: true });

document.getElementById('carousel').addEventListener('touchend', (e) => {
  const dx = e.changedTouches[0].clientX - touchStartX;
  if (Math.abs(dx) > 40) {
    dx < 0 ? next() : prev();
    resetAuto();
  }
}, { passive: true });

/* Auto-advance every 6 s */
function startAuto() {
  autoTimer = setInterval(next, 6000);
}

function resetAuto() {
  clearInterval(autoTimer);
  startAuto();
}

startAuto();

/* =========================================================
   SUBTLE FADE-IN ON SCROLL
   ========================================================= */
const fadeEls = document.querySelectorAll(
  '.section-label, .section-title, .about-body, .stat, .contact-title, .contact-email, .contact-link'
);

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

fadeEls.forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(24px)';
  el.style.transition = 'opacity 0.7s ease, transform 0.7s ease';
  observer.observe(el);
});
