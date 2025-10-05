
document.addEventListener('DOMContentLoaded', function () {
    const apiKey = '6b2cdc42b3724317a8a91939250510';
    const locationInput = document.getElementById('location-input');
    const searchBtn = document.getElementById('search-btn');
    const weatherInfo = document.getElementById('weather-info');
    const loading = document.getElementById('loading');
    const error = document.getElementById('error');

    const locationElement = document.getElementById('location');
    const dateElement = document.getElementById('date');
    const temperatureElement = document.getElementById('temperature');
    const weatherIcon = document.getElementById('weather-icon');
    const descriptionElement = document.getElementById('description');
    const feelsLikeElement = document.getElementById('feels-like');
    const humidityElement = document.getElementById('humidity');
    const windSpeedElement = document.getElementById('wind-speed');
    const pressureElement = document.getElementById('pressure');

    // Format date
    function formatDate(dateString) {
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    }

    // Fetch weather data
    async function fetchWeather(location) {
        try {
            loading.style.display = 'block';
            weatherInfo.style.display = 'none';
            error.style.display = 'none';

            const response = await fetch(`https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${location}&aqi=yes`);

            if (!response.ok) {
                throw new Error('Weather data not found');
            }

            const data = await response.json();

            // Update UI with weather data
            locationElement.textContent = `${data.location.name}, ${data.location.country}`;
            dateElement.textContent = formatDate(data.location.localtime);
            temperatureElement.textContent = `${Math.round(data.current.temp_c)}°C`;
            weatherIcon.src = `https:${data.current.condition.icon}`;
            descriptionElement.textContent = data.current.condition.text;
            feelsLikeElement.textContent = `${Math.round(data.current.feelslike_c)}°C`;
            humidityElement.textContent = `${data.current.humidity}%`;
            windSpeedElement.textContent = `${data.current.wind_kph} km/h`;
            pressureElement.textContent = `${data.current.pressure_mb} mb`;

            loading.style.display = 'none';
            weatherInfo.style.display = 'block';

        } catch (err) {
            console.error('Error fetching weather data:', err);
            loading.style.display = 'none';
            error.style.display = 'block';
        }
    }

    // Event listeners
    searchBtn.addEventListener('click', function () {
        const location = locationInput.value.trim();
        if (location) {
            fetchWeather(location);
        }
    });

    locationInput.addEventListener('keypress', function (e) {
        if (e.key === 'Enter') {
            const location = locationInput.value.trim();
            if (location) {
                fetchWeather(location);
            }
        }
    });

    // Load default location on page load
    fetchWeather('London');
});