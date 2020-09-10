const staticCacheName = 'v5';
const filesToCache = [
	'/',
	'index.html',
	'about.html',
	'weather.html',
	'/js/life.js',
	'/js/utils.js',
	'/css/beautify.css',
	'/images/bg.jpg',
	'/images/smashIt.png',
	'/images/clouds.jpg',
	'/images/dots.png',
	'/images/evening.jpg',
	'/images/flowers.jpg',
	'/images/logo.png',
	'/images/picture-136.png',
	'/images/storm.jpg',
	'/images/thunder.jpg',
	'/images/Tolufolorunso.jpg',
	'/images/tree-1.jpg'
];

self.addEventListener('install', event => {
	console.log('install');
	event.waitUntil(
		caches
			.open(staticCacheName)
			.then(cache => {
				console.log('service worker: caching files');
				cache.addAll(filesToCache);
			})
			.then(() => self.skipWaiting())
	);
});

self.addEventListener('activate', event => {
	console.log('activate');
	event.waitUntil(
		caches.keys().then(cacheNames => {
			return Promise.all(
				cacheNames.map(cache => {
					if (cache !== staticCacheName) {
						return caches.delete(cache);
					}
				})
			);
		})
	);
});

self.addEventListener('fetch', event => {
	event.respondWith(
		fetch(event.request).catch(() => caches.match(event.request))
	);
});
