const updateOnlineStatus = evt => {
	if (!navigator.onLine) {
		showAlert('fail', 'You are offline');
	} else {
		showAlert('success', 'You are back online');
	}
};

const goUp = document.querySelector('#go-up');

window.addEventListener('scroll', function (e) {
	if (window.pageYOffset > 600) {
		goUp.style.opacity = '1';
	}
	if (window.pageYOffset < 600) {
		goUp.style.opacity = '0';
	}
});

// site navigation
const body = document.querySelector('body');
const menu = document.querySelector('#menu');
const nav = document.querySelector('#nav');
const i = document.querySelector('#menu i');

// Show alert for action on the page
const showAlert = (alertType, alertMessage) => {
	var alertDiv = document.getElementById('alert');
	var alertParagraph = document.getElementById('alert-p');

	if (alertType === 'success') {
		alertParagraph.textContent = alertMessage;
		alertDiv.style.background = 'green';
		alertDiv.style.opacity = 1;
	} else {
		alertParagraph.textContent = alertMessage;
		alertDiv.style.background = 'red';
		alertDiv.style.opacity = 1;
	}

	setTimeout(function () {
		alertParagraph.textContent = '';
		alertDiv.style.background = '';
		alertDiv.style.opacity = 0;
	}, 3000);
};

window.addEventListener('online', updateOnlineStatus);
window.addEventListener('offline', updateOnlineStatus);
menu.addEventListener('click', function (e) {
	nav.classList.toggle('open');
	menu.classList.toggle('close');
});
