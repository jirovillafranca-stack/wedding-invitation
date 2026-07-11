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

  // File previews run each local page in an isolated origin, where rewriting
  // the URL can be blocked. The section can still change without the hash.
  if (window.location.protocol !== 'file:' && window.location.hash !== nextHash) {
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

const slideshowImages = [
  'IMG_7066.PNG', 'IMG_7070.JPG', 'IMG_7073.JPG', 'IMG_7075.JPG',
  'IMG_7076.JPG', 'IMG_7077.JPG', 'IMG_7079.JPG', 'MHK00231.jpg',
  'MHK00326.jpg', 'MHK00396.jpg', 'MHK00398.jpg', 'MHK00422.jpg',
  'MHK00438.jpg', 'MHK00568.jpg', 'MHK00731.jpg', 'MHK00745.jpg',
  'MHK00765.jpg', 'MHK00795.jpg', 'MHK00919.jpg', 'MHK01012.jpg',
  'MHK01029.jpg', 'MHK01103.jpg', 'MHK01113.jpg', 'MHK01123.jpg'
];

const heroSlideshow = document.querySelector('.hero-slideshow');

if (heroSlideshow) {
  const slides = slideshowImages.map((imageName, index) => {
    const image = document.createElement('img');
    image.className = `hero-slide${index === 0 ? ' active' : ''}`;
    image.src = `pictures/slide-show-pictures/${imageName}`;
    image.alt = '';
    heroSlideshow.appendChild(image);
    return image;
  });

  let activeSlide = 0;
  window.setInterval(() => {
    slides[activeSlide].classList.remove('active');
    activeSlide = (activeSlide + 1) % slides.length;
    slides[activeSlide].classList.add('active');
  }, 5000);
}

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
    card.innerHTML = `<img src="pictures/slide-show-pictures/${imageName}" alt="Wedding memory" />`;
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


const music = document.getElementById("bgMusic");
const muteBtn = document.getElementById("musicToggle");

if (music && muteBtn) {
  const START_TIME = 60;
  const END_TIME = 154;
  const shouldStartMusic = new URLSearchParams(window.location.search).has("playMusic");

  music.volume = 1;

  function updateMusicButton() {
    const isPlaying = !music.paused;
    const isMuted = music.muted || music.volume === 0;
    muteBtn.textContent = isPlaying ? (isMuted ? "🔇" : "🔊") : "▶";
    muteBtn.setAttribute(
      "aria-label",
      isPlaying ? (isMuted ? "Unmute background music" : "Mute background music") : "Play background music"
    );
    muteBtn.title = muteBtn.getAttribute("aria-label");
  }

  function seekToMusicStart() {
    if (Number.isFinite(music.duration) && music.duration <= START_TIME) return false;
    music.currentTime = START_TIME;
    return true;
  }

  async function playMusicSegment({ restart = false } = {}) {
    if (music.readyState < HTMLMediaElement.HAVE_METADATA) {
      await new Promise((resolve) => music.addEventListener("loadedmetadata", resolve, { once: true }));
    }

    if (restart || music.currentTime < START_TIME || music.currentTime >= END_TIME) {
      if (!seekToMusicStart()) return;
    }

    try {
      await music.play();
    } catch (error) {
      // The control becomes a Play button if the browser requires a direct tap.
      console.info("Background music is waiting for a user interaction.", error);
    }
    updateMusicButton();
  }

  music.addEventListener("timeupdate", () => {
    if (music.currentTime >= END_TIME) {
      seekToMusicStart();
      music.play().catch(updateMusicButton);
    }
  });

  music.addEventListener("ended", () => playMusicSegment({ restart: true }));
  music.addEventListener("play", updateMusicButton);
  music.addEventListener("pause", updateMusicButton);
  music.addEventListener("volumechange", updateMusicButton);

  muteBtn.addEventListener("click", () => {
    if (music.paused) {
      playMusicSegment();
      return;
    }
    music.muted = !music.muted;
  });

  updateMusicButton();
  if (shouldStartMusic) playMusicSegment({ restart: true });
}
