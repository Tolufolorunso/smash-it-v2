// const filesToCache = [
// 	'/',
// 	'/index.html',
// 	'/contact.html',
// 	'/about.html',
// 	'/css/beautify.css',
// 	'/js/life.js',
// 	'/images/bg.jpg',
// 	'/images/Tolufolorunso.jpg',
// 	'/images/smashIt.png',
// 	'/favicon.ico',
// 	'/fallback.html',
// 	'/weather.html',
// 	'./images/icons/android-72x72.png',
// 	'./images/icons/apple-touch-icon-180x180.png',
// 	'./images/icons/browserconfig.xml',
// 	'./images/icons/pwa-192x192.png',
// 	'./images/icons/pwa-512x512.png',
// 	'./images/icons/favicon-16x16.png',
// 	'./images/icons/favicon-32x32.png',
// 	'./images/evening.jpg',
// 	'./images/flowers.jpg',
// 	'./images/storm.jpg',
// 	'./images/thunder.jpg',
// 	'./images/tree-1.jpg',
// 	'./images/tree-2.jpg',
// 	'./images/tree-3.jpg',
// 	'./images/tree.jpg',
// 	'./images/icons/tile310x310.png'
// ];

// const staticCacheName = 'pages-cache-v5';

// self.addEventListener('install', event => {
// 	// Add a call to skipWaiting here
// 	self.skipWaiting();
// 	event.waitUntil(
// 		caches.open(staticCacheName).then(cache => {
// 			return cache.addAll(filesToCache);
// 		})
// 	);
// });

// self.addEventListener('activate', event => {
// 	const cacheWhitelist = [staticCacheName];

// 	event.waitUntil(
// 		caches.keys().then(cacheNames => {
// 			return Promise.all(
// 				cacheNames.map(cacheName => {
// 					if (cacheWhitelist.indexOf(cacheName) === -1) {
// 						return caches.delete(cacheName);
// 					}
// 				})
// 			);
// 		})
// 	);
// });

// self.addEventListener('fetch', event => {
// 	event.respondWith(
// 		caches
// 			.match(event.request)
// 			.then(response => {
// 				if (response) {
// 					return response;
// 				}
// 				return fetch(event.request).then(response => {
// 					// TODO 5 - Respond with custom 404 page
// 					return caches.open(staticCacheName).then(cache => {
// 						cache.put(event.request.url, response.clone());
// 						return response;
// 					});
// 				});
// 			})
// 			.catch(error => {
// 				//  TODO 6 - Respond with custom offline page
// 			})
// 	);
// });
