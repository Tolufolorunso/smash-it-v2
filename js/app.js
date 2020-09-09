if ('serviceWorker' in navigator) {
	window.addEventListener('load', () => {
		navigator.serviceWorker
			.register('/sw.js')
			.then(registration => {
				console.log('registered');
			})
			.catch(err => {
				console.error('Registration failed:', err);
			});
	});
}
