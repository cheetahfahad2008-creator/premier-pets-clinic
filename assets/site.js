/* ============================================================
   Premier Pets Clinic — Shared interactions
   ============================================================ */

document.documentElement.classList.add('js');

// ----- Mobile menu -----
const navToggle = document.getElementById('nav-toggle');
const navPanel = document.getElementById('nav-panel');

if (navToggle && navPanel) {
  navToggle.addEventListener('click', () => {
    const isOpen = navPanel.classList.toggle('open');
    navToggle.classList.toggle('open', isOpen);
    navToggle.setAttribute('aria-expanded', String(isOpen));
    navToggle.setAttribute('aria-label', isOpen ? 'Close menu' : 'Open menu');
  });
}

// ----- Reveal on scroll -----
const revealEls = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window) {
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -5% 0px' }
  );
  revealEls.forEach((el) => revealObserver.observe(el));
} else {
  revealEls.forEach((el) => el.classList.add('visible'));
}

// ----- Footer year -----
document.querySelectorAll('[data-year]').forEach((el) => {
  el.textContent = new Date().getFullYear();
});

// ============================================================
// Booking form (contact.html only)
// ============================================================
const bookingForm = document.getElementById('booking-form');

if (bookingForm) {
  const successMsg = document.getElementById('form-success');
  const dateInput = document.getElementById('date');
  const serviceSelect = document.getElementById('service');

  // Pre-select service from ?service= query param (links on services.html)
  const requested = new URLSearchParams(window.location.search).get('service');
  if (requested && serviceSelect) {
    const match = Array.from(serviceSelect.options).find(
      (opt) => opt.dataset.key === requested
    );
    if (match) match.selected = true;
  }

  // Block past dates
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

  bookingForm.addEventListener('submit', (e) => {
    e.preventDefault();

    let valid = true;
    bookingForm.querySelectorAll('[required]').forEach((field) => {
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

    // No backend — show the inline confirmation
    successMsg.hidden = false;
    successMsg.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    bookingForm.querySelector('button[type="submit"]').disabled = true;
  });

  bookingForm.querySelectorAll('[required]').forEach((field) => {
    field.addEventListener('input', () => field.classList.remove('error'));
  });
}
