// Runs only on the landing page. While the guest is looking at the photo and
// deciding whether to tap "Open Invitation," we quietly fetch every image
// details.html will need so they're already in the browser cache — the next
// page then renders with no pop-in instead of loading images live on screen.

// Keep the "Open Invitation" button hidden until the landing page (and its
// background photo) has actually finished loading, instead of showing it too
// early over an unloaded/blank background.
window.addEventListener('load', () => {
  document.getElementById('enterBtn')?.classList.add('is-visible');
});

const detailsPageImages = [
  ...Array.from({ length: 8 }, (_, i) => `pictures/A1-Open-Invitation-Display/A${i + 1}.jpg`),
  ...Array.from({ length: 5 }, (_, i) => `pictures/A2-How-we-met/${i + 1}.png`),
  '1.jpg', '2.jpg', '3.jpg', '4.jpg', '5.jpg', '6.jpg', '7.jpg', '8.jpg',
  '9.JPG', '10.JPG', '11.JPG', '12.JPG', '13.JPG',
].map((name) =>
  name.includes('/') ? name : `pictures/A3-Prenup-Photos/${name}`
).concat([
  'pictures/saint-john-church.jpg',
  'pictures/alka-resorts.jpg',
  'pictures/butter-yellow.jpg',
]);

function preloadDetailsAssets() {
  detailsPageImages.forEach((src) => {
    const image = new Image();
    image.fetchPriority = 'low';
    image.decoding = 'async';
    image.src = src;
  });
}

// Let the landing page's own photo finish painting before competing for
// bandwidth with ~30 background image fetches.
if ('requestIdleCallback' in window) {
  requestIdleCallback(preloadDetailsAssets, { timeout: 4000 });
} else {
  window.setTimeout(preloadDetailsAssets, 1500);
}
