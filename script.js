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

// All sections live in the page at once now (a single scrollable page), so
// nav links just need their native anchor jump — scroll-behavior: smooth
// on <html> already animates it. No JS-driven show/hide required.

const slideshowImages = [
  'A1.jpg', 'A2.jpg', 'A3.jpg', 'A4.jpg',
  'A5.jpg', 'A6.jpg', 'A7.jpg', 'A8.jpg'
];

const heroSlideshow = document.querySelector('.hero-slideshow');

if (heroSlideshow) {
  const slides = slideshowImages.map((imageName, index) => {
    const image = document.createElement('img');
    image.className = `hero-slide${index === 0 ? ' active' : ''}`;
    image.dataset.src = `pictures/A1-Open-Invitation-Display/${imageName}`;
    if (index === 0) image.src = image.dataset.src;
    image.fetchPriority = index === 0 ? 'high' : 'low';
    image.decoding = 'async';
    image.alt = '';
    heroSlideshow.appendChild(image);
    return image;
  });

  let activeSlide = 0;
  window.setInterval(() => {
    slides[activeSlide].classList.remove('active');
    activeSlide = (activeSlide + 1) % slides.length;
    if (!slides[activeSlide].hasAttribute('src')) {
      slides[activeSlide].src = slides[activeSlide].dataset.src;
    }
    slides[activeSlide].classList.add('active');
  }, 5000);
}

const galleryImages = [
  '1.jpg',
  '2.jpg',
  '3.jpg',
  '4.jpg',
  '5.jpg',
  '6.jpg',
  '7.jpg',
  '8.jpg',
  '9.JPG',
  '10.JPG',
  '11.JPG',
  '12.JPG',
  '13.JPG'
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
let galleryRendered = false;

function renderGallery() {
  if (!galleryGrid || galleryRendered) return;

  galleryImages.forEach((imageName) => {
    const card = document.createElement('figure');
    card.className = 'gallery-card';
    card.innerHTML = `<img src="pictures/A3-Prenup-Photos/${imageName}" alt="Wedding memory" loading="lazy" />`;
    card.addEventListener('click', () => {
      lightboxImage.src = `pictures/A3-Prenup-Photos/${imageName}`;
      lightbox.classList.add('active');
      lightbox.setAttribute('aria-hidden', 'false');
    });
    galleryGrid.appendChild(card);
  });
  galleryRendered = true;
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

// Assigned its real implementation inside the music block below, once the
// video section is actually revealed — kept as a no-op default in case
// bgMusic/#musicToggle are missing from the page.
let setupVideoPlayer = () => {};

const ICON_ATTRS = 'viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"';
const musicIcons = {
  playing: `<svg ${ICON_ATTRS}><path d="M4 9v6h4l5 5V4L8 9H4z" /><path d="M16.5 8.5a5 5 0 0 1 0 7" /><path d="M19 6a8 8 0 0 1 0 12" /></svg>`,
  muted: `<svg ${ICON_ATTRS}><path d="M4 9v6h4l5 5V4L8 9H4z" /><path d="m17 9 5 6M22 9l-5 6" /></svg>`,
  paused: `<svg ${ICON_ATTRS}><polygon points="6 3 20 12 6 21 6 3" /></svg>`,
};

if (music && muteBtn) {
  const START_TIME = 19;
  const END_TIME = 287;
  const shouldStartMusic = new URLSearchParams(window.location.search).has("playMusic");

  music.volume = 1;

  function updateMusicButton() {
    const isPlaying = !music.paused;
    const isMuted = music.muted || music.volume === 0;
    muteBtn.innerHTML = isPlaying ? (isMuted ? musicIcons.muted : musicIcons.playing) : musicIcons.paused;
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

  async function playMusicSegment({ restart = false, fromUserGesture = false } = {}) {
    // Call play immediately during a tap/click so mobile browsers retain the
    // user gesture permission while the audio metadata finishes loading.
    const directPlayAttempt = fromUserGesture ? music.play() : null;

    if (music.readyState < HTMLMediaElement.HAVE_METADATA) {
      await new Promise((resolve) => {
        music.addEventListener("loadedmetadata", resolve, { once: true });
        music.addEventListener("error", resolve, { once: true });
      });
    }

    if (music.error) return;

    if (restart || music.currentTime < START_TIME || music.currentTime >= END_TIME) {
      if (!seekToMusicStart()) return;
    }

    try {
      await (directPlayAttempt || music.play());
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
      playMusicSegment({ fromUserGesture: true });
      return;
    }
    music.muted = !music.muted;
  });

  // If autoplay after opening the invitation is blocked, the guest's first
  // qualifying interaction anywhere on the details page starts the music
  // without another prompt. Browsers only treat click/tap/keypress as a
  // real user gesture for unlocking audio — plain scrolling never counts,
  // no matter how far the guest scrolls, so it's deliberately not listed here.
  const startMusicFromGesture = () => {
    if (music.paused) playMusicSegment({ restart: true, fromUserGesture: true });
  };
  document.addEventListener("pointerdown", startMusicFromGesture, { once: true });
  document.addEventListener("keydown", startMusicFromGesture, { once: true });

  updateMusicButton();
  if (shouldStartMusic) playMusicSegment({ restart: true });

  const videoFrame = document.getElementById('stdVideoFrame');
  if (videoFrame) {
    let musicPausedForVideo = false;
    let playerCreated = false;

    const onPlayerStateChange = (event) => {
      if (event.data === YT.PlayerState.PLAYING) {
        if (!music.paused) {
          musicPausedForVideo = true;
          music.pause();
        }
      } else if (event.data === YT.PlayerState.PAUSED || event.data === YT.PlayerState.ENDED) {
        if (musicPausedForVideo) {
          musicPausedForVideo = false;
          playMusicSegment();
        }
      }
    };

    const createPlayer = () => {
      new YT.Player(videoFrame, {
        videoId: videoFrame.dataset.videoId,
        events: { onStateChange: onPlayerStateChange },
      });
    };

    // Loading the YouTube embed (its iframe + player script) is deferred
    // until the video section actually scrolls into view — see revealSection()
    // below — instead of paying for it while guests are still on section 1.
    setupVideoPlayer = () => {
      if (playerCreated) return;
      playerCreated = true;

      if (window.YT && window.YT.Player) {
        createPlayer();
      } else {
        const previousReady = window.onYouTubeIframeAPIReady;
        window.onYouTubeIframeAPIReady = () => {
          if (previousReady) previousReady();
          createPlayer();
        };
        const apiScript = document.createElement('script');
        apiScript.src = 'https://www.youtube.com/iframe_api';
        document.head.appendChild(apiScript);
      }
    };
  }
}

// Reveal each section (and load the images/gallery/video it holds) one at a
// time as the guest scrolls to it, instead of fetching every section's
// assets up front. Sections earlier in the page are ready well before the
// guest ever reaches the last one.
const pageSections = document.querySelectorAll('.page-section');

function revealSection(section) {
  section.classList.add('is-revealed');

  section.querySelectorAll('img[data-deferred-src]').forEach((image) => {
    image.src = image.dataset.deferredSrc;
    image.removeAttribute('data-deferred-src');
  });

  if (section.id === 'gallery') renderGallery();
  if (section.id === 'video') setupVideoPlayer();
}

if ('IntersectionObserver' in window && pageSections.length) {
  const sectionObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      revealSection(entry.target);
      observer.unobserve(entry.target);
    });
  }, { rootMargin: '20% 0px 20% 0px', threshold: 0.01 });

  pageSections.forEach((section) => sectionObserver.observe(section));
} else {
  // No IntersectionObserver support — fall back to loading everything now.
  pageSections.forEach(revealSection);
}

/* Disabled duplicate legacy music block retained below from a prior edit.
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
*/
