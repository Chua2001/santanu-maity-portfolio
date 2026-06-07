const themeToggle = document.getElementById('themeToggle');
const mobileNavToggle = document.getElementById('mobileNavToggle');
const navLinks = document.getElementById('mainNav');
const galleryGrid = document.getElementById('galleryGrid');
const imageModal = document.getElementById('imageModal');
const modalImage = document.getElementById('modalImage');
const modalTitle = document.getElementById('modalTitle');
const modalClose = document.getElementById('modalClose');
const modalBackdrop = document.getElementById('modalBackdrop');
const contactForm = document.getElementById('contactForm');
const formStatus = document.getElementById('formStatus');

function setTheme(theme) {
  document.documentElement.classList.toggle('light', theme === 'light');
  themeToggle.textContent = theme === 'light' ? '☀️' : '🌙';
  localStorage.setItem('portfolioTheme', theme);
}

function initTheme() {
  const savedTheme = localStorage.getItem('portfolioTheme');
  if (savedTheme) {
    setTheme(savedTheme);
    return;
  }
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  setTheme(prefersDark ? 'dark' : 'light');
}

if (themeToggle) {
  themeToggle.addEventListener('click', () => {
    const current = document.documentElement.classList.contains('light') ? 'light' : 'dark';
    setTheme(current === 'light' ? 'dark' : 'light');
  });
}

if (mobileNavToggle && navLinks) {
  mobileNavToggle.addEventListener('click', () => {
    navLinks.classList.toggle('open');
  });

  navLinks.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
    });
  });
}

if (galleryGrid) {
  galleryGrid.querySelectorAll('.gallery-item').forEach((item) => {
    item.addEventListener('click', () => {
      const img = item.querySelector('img');
      if (!img) return;
      modalImage.src = img.src;
      modalImage.alt = img.alt;
      modalTitle.textContent = img.alt;
      imageModal.classList.add('visible');
      imageModal.setAttribute('aria-hidden', 'false');
    });
  });
}

function closeModal() {
  imageModal.classList.remove('visible');
  imageModal.setAttribute('aria-hidden', 'true');
  modalImage.src = '';
}

if (modalClose) {
  modalClose.addEventListener('click', closeModal);
}

if (modalBackdrop) {
  modalBackdrop.addEventListener('click', closeModal);
}

window.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && imageModal.classList.contains('visible')) {
    closeModal();
  }
});

if (contactForm) {
  contactForm.addEventListener('submit', (event) => {
    event.preventDefault();
    formStatus.textContent = 'Thank you for reaching out! I will respond soon.';
    contactForm.reset();
  });
}

initTheme();
