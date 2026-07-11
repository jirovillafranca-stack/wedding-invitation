const weddingDate = new Date('2026-12-20T16:00:00');

function updateCountdown() {
  const now = new Date();
  const difference = weddingDate - now;

  if (difference <= 0) {
    document.getElementById('days').textContent = '00';
    document.getElementById('hours').textContent = '00';
    document.getElementById('minutes').textContent = '00';
    document.getElementById('seconds').textContent = '00';
    return;
  }

  const days = Math.floor(difference / (1000 * 60 * 60 * 24));
  const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((difference / (1000 * 60)) % 60);
  const seconds = Math.floor((difference / 1000) % 60);

  document.getElementById('days').textContent = String(days).padStart(2, '0');
  document.getElementById('hours').textContent = String(hours).padStart(2, '0');
  document.getElementById('minutes').textContent = String(minutes).padStart(2, '0');
  document.getElementById('seconds').textContent = String(seconds).padStart(2, '0');
}

setInterval(updateCountdown, 1000);
updateCountdown();

const pageSections = Array.from(document.querySelectorAll('.page-section'));

function showSection(targetId) {
  const targetSection = document.getElementById(targetId);

  if (!targetSection) {
    return;
  }

  pageSections.forEach((section) => {
    section.classList.toggle('active', section === targetSection);
  });

  const nextHash = targetId ? `#${targetId}` : '#home';

  if (window.location.hash !== nextHash) {
    window.history.replaceState(null, '', nextHash);
  }
}

document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener('click', (event) => {
    const targetId = link.getAttribute('href')?.slice(1);

    if (!targetId) {
      return;
    }

    const targetSection = document.getElementById(targetId);

    if (targetSection && targetSection.classList.contains('page-section')) {
      event.preventDefault();
      showSection(targetId);
    }
  });
});

window.addEventListener('hashchange', () => {
  const targetId = window.location.hash ? window.location.hash.slice(1) : (document.getElementById('landing') ? 'landing' : 'home');
  const targetSection = document.getElementById(targetId);

  if (targetSection && targetSection.classList.contains('page-section')) {
    showSection(targetId);
  }
});

const initialRequestedId = window.location.hash ? window.location.hash.slice(1) : '';
const initialTargetId = initialRequestedId || (document.getElementById('landing') ? 'landing' : 'home');
const initialTargetSection = document.getElementById(initialTargetId);

showSection(initialTargetSection && initialTargetSection.classList.contains('page-section') ? initialTargetId : (document.getElementById('home') ? 'home' : 'landing'));

const galleryImages = [
  'MHK00326.jpg',
  'MHK00396.jpg',
  'MHK00398.jpg',
  'MHK00422.jpg',
  'MHK00438.jpg',
  'MHK00568.jpg',
  'MHK00731.jpg',
  'MHK00745.jpg',
  'MHK00765.jpg',
  'MHK00795.jpg',
  'MHK00919.jpg',
  'MHK01012.jpg',
  'MHK01029.jpg',
  'MHK01103.jpg',
  'MHK01113.jpg',
  'MHK01123.jpg'
];

const lightbox = document.getElementById('lightbox');
const lightboxImage = document.getElementById('lightbox-image');
const lightboxClose = document.getElementById('lightbox-close');

function openLightbox(src) {
  if (!lightbox || !lightboxImage) return;
  lightboxImage.src = src;
  lightbox.classList.add('active');
  lightbox.setAttribute('aria-hidden', 'false');
}

function closeLightbox() {
  if (!lightbox || !lightboxImage) return;
  lightbox.classList.remove('active');
  lightbox.setAttribute('aria-hidden', 'true');
  lightboxImage.src = '';
}

if (lightbox && lightboxClose) {
  lightboxClose.addEventListener('click', closeLightbox);
  lightbox.addEventListener('click', (event) => {
    if (event.target === lightbox) {
      closeLightbox();
    }
  });
}

const clickableImages = document.querySelectorAll('img');
clickableImages.forEach((img) => {
  img.addEventListener('click', () => {
    if (img.getAttribute('src')) {
      openLightbox(img.getAttribute('src'));
    }
  });
});

const galleryGrid = document.getElementById('gallery-grid');

if (galleryGrid) {
  galleryImages.forEach((imageName) => {
    const card = document.createElement('figure');
    card.className = 'gallery-card';
    card.innerHTML = `<img src="pictures/${imageName}" alt="Wedding memory" />`;
    card.addEventListener('click', () => {
      lightboxImage.src = `pictures/${imageName}`;
      lightbox.classList.add('active');
      lightbox.setAttribute('aria-hidden', 'false');
    });
    galleryGrid.appendChild(card);
  });
}

const form = document.getElementById('rsvp-form');
const googleFormUrl = 'https://forms.gle/U5EeXLwh2Fc7oNsY9';

if (form) {
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    window.location.href = googleFormUrl;
  });
}
