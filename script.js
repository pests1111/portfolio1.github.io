// Navbar: transparent over the hero photo, solid once scrolled past it
const navbarEl = document.querySelector('.navbar');
if (navbarEl) {
  const toggleNavbar = () => {
    navbarEl.classList.toggle('scrolled', window.scrollY > 40);
  };
  toggleNavbar();
  window.addEventListener('scroll', toggleNavbar, { passive: true });
}

// Footer year
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

// Mobile nav toggle
const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');

if (menuToggle && navLinks) {
  menuToggle.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('open');
    menuToggle.setAttribute('aria-expanded', String(isOpen));
  });

  navLinks.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
      menuToggle.setAttribute('aria-expanded', 'false');
    });
  });
}

// Certificate lightbox — click any cert thumbnail to view it full size
const lightbox = document.getElementById('certLightbox');
const lightboxImg = document.getElementById('lightboxImg');
const lightboxCaption = document.getElementById('lightboxCaption');
const lightboxClose = document.getElementById('lightboxClose');
const certTriggers = document.querySelectorAll('.cert-trigger');

let lastFocusedTrigger = null;

function openLightbox(trigger) {
  const img = trigger.querySelector('img');
  if (!img || !lightbox) return;

  lastFocusedTrigger = trigger;
  lightboxImg.src = img.currentSrc || img.src;
  lightboxImg.alt = img.alt || '';
  lightboxCaption.textContent = trigger.dataset.caption || img.alt || '';

  lightbox.classList.add('open');
  document.body.style.overflow = 'hidden';
  lightboxClose.focus();
}

function closeLightbox() {
  if (!lightbox) return;
  lightbox.classList.remove('open');
  document.body.style.overflow = '';
  lightboxImg.src = '';
  if (lastFocusedTrigger) lastFocusedTrigger.focus();
}

certTriggers.forEach((trigger) => {
  trigger.addEventListener('click', () => openLightbox(trigger));
});

if (lightboxClose) {
  lightboxClose.addEventListener('click', closeLightbox);
}

if (lightbox) {
  // Click on the dark backdrop (not the image/content) closes it
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
  });
}

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && lightbox && lightbox.classList.contains('open')) {
    closeLightbox();
  }
});
