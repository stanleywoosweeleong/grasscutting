// Network-first service worker: online visits always get the latest files from the server
// (revalidated with ETags, so unchanged files cost a tiny 304), and the cache is only an
// offline fallback. Editing index.html or any other file needs no change here.
// Change CACHE only if you rename or remove files and want the old copies cleared.
// Other apps live on the same address (stanleywoosweeleong.github.io) and share Cache Storage,
// so this worker only ever touches caches whose names start with 'grasscutting'.
const CACHE = 'grasscutting-v1';
const MINE = k => k.startsWith('grasscutting') || k === 'cut-leave';  // 'cut-leave' = this app's old cache name
const SHELL = [
  './',
  './index.html',
  './content.js',
  './figures.js',
  './photos/cowgrass-close.jpg',
  './photos/cowgrass-lawn.jpg',
  './photos/durian-buds.jpg',
  './photos/durian-flowers.jpg',
  './photos/lalang.jpg',
  './photos/pintoi.jpg',
  './manifest.webmanifest',
  './og-image.png',
  './qr.svg',
  './icons/icon-192.png',
  './icons/icon-512.png',
  './icons/maskable-512.png',
  './icons/apple-touch-icon.png'
];

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE)
      .then(c => c.addAll(SHELL.map(u => new Request(u, { cache: 'no-cache' }))))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => MINE(k) && k !== CACHE).map(k => caches.delete(k))))
      // drop copies saved under a ?v= address; files are kept under their plain address
      .then(() => caches.open(CACHE))
      .then(c => c.keys().then(reqs => Promise.all(reqs.filter(r => new URL(r.url).search).map(r => c.delete(r)))))
      .then(() => self.clients.claim())
  );
});

const mine = (req, opts) => caches.open(CACHE).then(c => c.match(req, opts));

// The cache write is handed to waitUntil, so the browser keeps the worker alive until it lands
function save(e, key, res) {
  if (res.ok || res.type === 'opaque') {
    const copy = res.clone();
    e.waitUntil(caches.open(CACHE).then(c => c.put(key, copy)).catch(() => {}));
  }
  return res;
}

self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);

  // Google Fonts never change at a given URL: cache first.
  if (url.hostname === 'fonts.googleapis.com' || url.hostname === 'fonts.gstatic.com') {
    e.respondWith(mine(req).then(hit => hit || fetch(req).then(res => save(e, req, res))));
    return;
  }
  if (url.origin !== self.location.origin) return;

  // App files: network first (bypassing the browser's HTTP cache), cache when offline.
  const clean = new URL(req.url); clean.search = '';
  const key = req.mode === 'navigate' ? './index.html' : clean.href;
  e.respondWith(
    fetch(req.url, { cache: 'no-cache', credentials: 'same-origin' })
      .then(res => save(e, key, res))
      .catch(() => mine(key, { ignoreSearch: true }).then(hit => hit || mine('./index.html')))
  );
});
