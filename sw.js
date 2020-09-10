const staticCacheName = 'v33';
const filesToCache = [
	'/',
	'index.html',
	'about.html',
	'weather.html',
	'/js/life.js',
	'/js/utils.js',
	'/css/beautify.css',
	'/images/clouds.jpg',
	'/images/evening.jpg',
	'/images/flowers.jpg',
	'/images/storm.jpg',
	'/images/thunder.jpg',
	'/images/Tolufolorunso.jpg',
	'/images/tree-1.jpg',
	'https://fonts.googleapis.com/css2?family=Roboto+Mono:ital,wght@0,400;0,500;0,700;1,500&display=swap'
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
