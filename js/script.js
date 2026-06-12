/* ============================================================
   Premier Pets Clinic — Interactions
   ============================================================ */

// ----- Header shadow on scroll -----
const header = document.getElementById('header');
const scrollTopBtn = document.getElementById('scroll-top');

window.addEventListener('scroll', () => {
  header.classList.toggle('scrolled', window.scrollY > 10);
  scrollTopBtn.classList.toggle('visible', window.scrollY > 600);
}, { passive: true });

// ----- Mobile menu -----
const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');

navToggle.addEventListener('click', () => {
  const isOpen = navMenu.classList.toggle('open');
  navToggle.classList.toggle('open', isOpen);
  navToggle.setAttribute('aria-label', isOpen ? 'Close menu' : 'Open menu');
});

navMenu.querySelectorAll('.nav__link').forEach((link) => {
  link.addEventListener('click', () => {
    navMenu.classList.remove('open');
    navToggle.classList.remove('open');
  });
});

// ----- Active nav link while scrolling -----
const sections = document.querySelectorAll('main section[id]');
const navLinks = document.querySelectorAll('.nav__link');

const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      navLinks.forEach((link) => {
        link.classList.toggle(
          'active-link',
          link.getAttribute('href') === `#${entry.target.id}`
        );
      });
    });
  },
  { rootMargin: '-40% 0px -55% 0px' }
);
sections.forEach((section) => sectionObserver.observe(section));

// ----- Reveal-on-scroll animations -----
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 }
);
document.querySelectorAll('.reveal').forEach((el) => revealObserver.observe(el));

// ----- Animated counters -----
const animateCounter = (el) => {
  const target = Number(el.dataset.target);
  const duration = 1800;
  const start = performance.now();

  const tick = (now) => {
    const progress = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    el.textContent = Math.round(target * eased).toLocaleString();
    if (progress < 1) requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);
};

const counterObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        counterObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.6 }
);
document.querySelectorAll('.counter').forEach((el) => counterObserver.observe(el));

// ----- Testimonial slider -----
const track = document.getElementById('slider-track');
const slides = track.children;
const dotsWrap = document.getElementById('slider-dots');
let currentSlide = 0;
let autoplay;

for (let i = 0; i < slides.length; i++) {
  const dot = document.createElement('button');
  dot.className = 'slider__dot' + (i === 0 ? ' active' : '');
  dot.setAttribute('aria-label', `Go to review ${i + 1}`);
  dot.addEventListener('click', () => goToSlide(i));
  dotsWrap.appendChild(dot);
}
const dots = dotsWrap.children;

function goToSlide(index) {
  currentSlide = (index + slides.length) % slides.length;
  track.style.transform = `translateX(-${currentSlide * 100}%)`;
  for (let i = 0; i < dots.length; i++) {
    dots[i].classList.toggle('active', i === currentSlide);
  }
  restartAutoplay();
}

function restartAutoplay() {
  clearInterval(autoplay);
  autoplay = setInterval(() => goToSlide(currentSlide + 1), 6000);
}

document.getElementById('prev-btn').addEventListener('click', () => goToSlide(currentSlide - 1));
document.getElementById('next-btn').addEventListener('click', () => goToSlide(currentSlide + 1));
restartAutoplay();

// ----- Appointment form -----
const form = document.getElementById('appointment-form');
const successMsg = document.getElementById('form-success');

// Block past dates in the date picker
const dateInput = document.getElementById('date');
dateInput.min = new Date().toISOString().split('T')[0];

// The clinic is closed on Fridays
const isFriday = (value) => new Date(`${value}T12:00:00`).getDay() === 5;

dateInput.addEventListener('change', () => {
  if (dateInput.value && isFriday(dateInput.value)) {
    dateInput.classList.add('error');
    dateInput.setCustomValidity('We are closed on Fridays — please pick another day.');
    dateInput.reportValidity();
  } else {
    dateInput.setCustomValidity('');
  }
});

form.addEventListener('submit', (e) => {
  e.preventDefault();

  let valid = true;
  form.querySelectorAll('[required]').forEach((field) => {
    const empty = !field.value.trim();
    field.classList.toggle('error', empty);
    if (empty) valid = false;
  });

  if (dateInput.value && isFriday(dateInput.value)) {
    dateInput.classList.add('error');
    dateInput.reportValidity();
    valid = false;
  }

  if (!valid) return;

  successMsg.hidden = false;
  form.querySelector('button[type="submit"]').disabled = true;
  setTimeout(() => {
    form.reset();
    successMsg.hidden = true;
    form.querySelector('button[type="submit"]').disabled = false;
  }, 5000);
});

form.querySelectorAll('[required]').forEach((field) => {
  field.addEventListener('input', () => field.classList.remove('error'));
});

// ----- Footer year -----
document.getElementById('year').textContent = new Date().getFullYear();
