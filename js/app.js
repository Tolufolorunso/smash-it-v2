if ('serviceWorker' in navigator) {
	window.addEventListener('load', () => {
		navigator.serviceWorker
			.register('service-worker.js')
			.then(registration => {
				console.log('registered');
			})
			.catch(err => {
				console.error('Registration failed:', err);
			});
	});
}
