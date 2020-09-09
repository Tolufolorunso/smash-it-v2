'use strict';
const city = document.getElementById('city');
const cityBox = document.getElementById('city-box');
const countryBox = document.getElementById('country-box');
const iconUrl = document.getElementById('icon');
const cityCondition = document.getElementById('city-condition');
const degUI = document.getElementById('deg');
const table = document.getElementById('table');
const dayUI = document.querySelector('#days');
const hrsUI = document.getElementById('hour');
const minsUI = document.getElementById('minute');
const secsUI = document.getElementById('second');
const date = document.getElementById('date');
const apUi = document.getElementById('ap');
const alert = document.getElementById('alert');
const searchForm = document.getElementById('search');
const getYear = document.querySelector('#get-year');
const closeModel = document.querySelector('.close');
const searchCityUI = document.querySelector('#search-city');
const iconsrc = document.querySelector('#iconsrc');
const descriptionCityUI = document.querySelector('#description');
const searchedCity = document.querySelector('#searched-city');
const searchedMain = document.querySelector('#searched-main');
const resetWeather = document.querySelector('#reset-weather');

const openWeatherToken = 'd2d2d256214cf836218a23bd385446f5';

const eventListener = () => {
	if (searchForm) {
		searchForm.addEventListener('submit', searchCity);
	}

	document.addEventListener('DOMContentLoaded', defaultCityLoaded);
	closeModel.addEventListener('click', closeSearchModel);
	resetWeather.addEventListener('click', reloadWeather);
};

const closeSearchModel = () => {
	searchCityUI.style.transform = 'translate(-50%, -200%)';
	// searchCityUI.style.opacity = 0;
	// searchCityUI.style.pointerEvents = 'none';
};

const addToLocalStorage = props => {
	localStorage.setItem('smashit', JSON.stringify(props));
};

getYear.textContent = new Date().getUTCFullYear();

const timeOut = setInterval(() => {
	const countdownDate = new Date('oct 12 2020 12:00:00').getTime();
	const now = new Date().getTime();
	const diff = countdownDate - now;
	let days = Math.floor(diff / (1000 * 60 * 60 * 24));
	let hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
	let minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
	let seconds = Math.floor((diff % (1000 * 60)) / 1000);

	if (diff < 0) {
		clearInterval(timeOut);
		console.log('time out');
	}

	seconds = seconds < 10 ? '0' + seconds : seconds;
	minutes = minutes < 10 ? '0' + minutes : minutes;
	hours = hours < 10 ? '0' + hours : hours;
	days = days < 10 ? '0' + days : days;
	days = days < 100 ? '0' + days : days;

	dayUI.innerHTML = `${days} <span>DAYS</span>`;
	hrsUI.innerHTML = `${hours} <span>HRS</span>`;
	minsUI.innerHTML = `${minutes} <span>MIN</span>`;
	secsUI.innerHTML = `${seconds} <span>SEC</span>`;
}, 1000);

const displayTime = () => {
	const now = new Date();
	let hour = now.getHours();
	let minutes = now.getMinutes();
	let seconds = now.getSeconds();
	const todayDate = now.toLocaleDateString('en-US', {
		weekday: 'long',
		year: 'numeric',
		month: 'long',
		day: 'numeric'
	});

	let ap = 'AM';
	if (hour > 11) ap = 'PM';
	if (hour > 12) hour = hour - 12;
	if (hour === 0) hour = 12;
	seconds = seconds < 10 ? '0' + seconds : seconds;
	minutes = minutes < 10 ? '0' + minutes : minutes;
	date.textContent = todayDate;
	hr.textContent = hour;
	min.textContent = minutes;
	sec.textContent = seconds;
	apUi.textContent = ap;
};

const displayData = props => {
	const {
		cityName,
		countryName,
		data: {
			current: {
				sunrise,
				sunset,
				temp,
				humidity,
				wind_speed,
				weather: [{ main, description, icon }]
			},
			lat,
			lon
		}
	} = props;

	if (cityCondition) {
		cityCondition.innerHTML = `
   <tr>
    <th>Humidity</th>
    <th>Weather</th>
    <th>Temperature</th>
    <th>Wind speed</th>
  </tr>
    <tr>
      <td>${humidity}%</td>
      <td>${main}</td>
      <td>${Math.round(temp)}<sup>0</sup>C</td>
      <td>${wind_speed}/s</td>
    </tr>
  `;

		cityBox.textContent = cityName;
		countryBox.textContent = countryName;
	}

	// cityCondition.textContent = main;
	// cityCondition.classList.add('city-condition');
};

const showCity = ({ countryName, main, icon, description, cityName, temp }) => {
	console.log(description);
	searchedCity.innerHTML = `${cityName}<sup class="searched-country">${countryName}</sup>`;
	searchedMain.textContent = main;
	console.log(cityName);
	degUI.innerHTML = `${Math.round(temp)} <sup>0</sup>C`;
	const iconSrc = `https://openweathermap.org/img/w/${icon}.png`;
	iconsrc.setAttribute('src', iconSrc);
	descriptionCityUI.textContent = description;

	searchCityUI.style.transform = 'translate(-50%, -50%)';
};

const fetchCityAndCountry = async props => {
	console.log(props);
	try {
		let url;
		if (props.cityName) {
			const { cityName, country } = props;
			if (country && cityName) {
				url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName},${country}&appid=${openWeatherToken}&units=metric`;
			} else {
				url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${openWeatherToken}&units=metric`;
			}
		}
		const fetchCity = await fetchWeatherDetail(url);
		const {
			coord: { lon, lat },
			sys: { country: countryName },
			name,
			main: { temp },
			weather: [{ main, icon, description }]
		} = fetchCity;

		showCity({ countryName, main, icon, description, temp, cityName: name });
	} catch (error) {
		showAlert('red', error.message);
	}
};

const searchCity = evt => {
	evt.preventDefault();
	if (city.value === '' && city.value.length < 2) {
		showAlert('green', 'Enter a city name');
		return false;
	}

	console.log(city.value);

	const value = city.value;
	let searchedData = value.split(' ').filter(Boolean);

	let cityName, country;

	if (searchedData.length > 1) {
		country = searchedData[searchedData.length - 1];
		searchedData.pop();
		cityName = searchedData.join(' ');
	} else {
		[cityName] = searchedData;
	}

	// const [cityName, country] = searchedData;

	city.value = '';

	fetchCityAndCountry({ cityName, country });
};

const map = (lat, lon) => {
	mapboxgl.accessToken =
		'pk.eyJ1IjoidG9sZm9sb3J1bnNvIiwiYSI6ImNrZTFsbXk0MzAwbjgzMHA2bm82Mm9kdWIifQ.WmgYZmUX1brBeTWUbEu5qA';
	var map = new mapboxgl.Map({
		container: 'map',
		style: 'mapbox://styles/mapbox/streets-v11',
		center: [lon, lat],
		zoom: 9
	});
};

const fetchDailyWeather = props => {
	const URL = `https://api.openweathermap.org/data/2.5/onecall?lat=${props.lat}&lon=${props.lon}&exclude=hourly,minutely&appid=${openWeatherToken}&units=metric`;

	fetchWeatherDetail(URL)
		.then(data => {
			console.log(data);
			displayData({
				data,
				countryName: 'USA',
				cityName: 'New York City'
			});
			console.log(data);
			addToLocalStorage({
				data,
				countryName: 'USA',
				cityName: 'New York City'
			});
		})
		.catch(error => {
			return error;
		});
};

const defaultCityLoaded = () => {
	const dataFromStorage = localStorage.getItem('smashit');
	// Check if weather details found in local storage
	if (dataFromStorage) {
		const data = JSON.parse(dataFromStorage);
		displayData(data);
		const {
			data: { lat, lon }
		} = data;
		map(lat, lon);
	} else {
		// New York as default
		map(40.73061, -73.98714967217245);
		fetchDailyWeather({ lat: 40.73061, lon: -73.98714967217245 });
	}
};

const fetchWeatherDetail = async url => {
	const response = await fetch(url);
	if (response.ok) {
		const data = await response.json();
		return data;
	} else {
		const data = await response.json();
		showAlert(data.message, 'red');
		throw Error(data.message);
	}
};

const reloadWeather = () => {
	if (!navigator.onLine) {
		showAlert('fail', 'You are offline, Access Denied');
	} else {
		localStorage.removeItem('smashit');
		defaultCityLoaded();
	}
};

eventListener();
