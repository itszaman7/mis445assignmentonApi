const url = 'https://restcountries.com/v3.1/all?fields=name,population,flags';

fetch(url)
    .then(response => response.json())
    .then(data => display(data)) 


function display(data) {
    const countriesContainer = document.getElementById('countries');

    data.forEach(country => {
        const countryElement = document.createElement('div');
        countryElement.classList.add('card');

        countryElement.innerHTML = `
            <h2>${country.name.common}</h2>
            <p>Population: ${country.population.toLocaleString()}</p>
            <img src="${country.flags.svg}" alt="Flag of ${country.name.common}" width="100">
        `;

        countriesContainer.appendChild(countryElement);
    });
}

function searchCountry() {
    const searchInput = document.getElementById('search-input').value.trim();
    const searchUrl = `https://restcountries.com/v3.1/name/${searchInput}?fullText=true`;

    fetch(searchUrl)
        .then(response => response.json())
        .then(data => {
            if (!data.status) { 
                displaySearchResults(data); 
            } else {
                alert('Country not found.');
            }
        })
        .catch(error => console.error('Error:', error));
}

function displaySearchResults(data) {
    const searchContainer = document.getElementById('searchItem');
    searchContainer.innerHTML = ''; // Clear previous results

    const country = data[0];
    const countryElement = document.createElement('div');
    countryElement.classList.add('search');

    countryElement.innerHTML = `
        <h2>${country.name.common}</h2>
        <p>Population: ${country.population.toLocaleString()}</p>
        <p>${country.capital[0] || 'Capital not available'}</p>
        <img src="${country.flags.svg}" alt="Flag of ${country.name.common}" width="100">
        <div class="weather-placeholder"></div> <!-- Placeholder for weather info -->
        <button onclick="showWeather('${country.capital[0]}')">Show More</button>
        <button onclick="closeSearchResults()">Close</button>
    `;

    searchContainer.appendChild(countryElement);
}


function closeSearchResults() {
    const searchContainer = document.getElementById('searchItem');
    searchContainer.innerHTML = ''; 
}

function showWeather(capitalCity) {
    const apiKey = '273312d121b2d9d948abe6ef10e7b61e'; 
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${capitalCity}&appid=${apiKey}&units=metric`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            if (data.cod === 200) {
                displayWeather(data);
            } l
        })
}

function displayWeather(data) {
    const weatherContainer = document.querySelector('#searchItem .weather-placeholder'); // Select the placeholder
    if (data && data.main && data.weather) {
        const temperature = data.main.temp;
        const weatherDescription = data.weather[0].description;
        const weatherIcon = data.weather[0].icon;

        weatherContainer.innerHTML = `
            <p>Temperature: ${temperature}°C</p>
            <p>Weather: ${weatherDescription}</p>
            <img src="http://openweathermap.org/img/wn/${weatherIcon}.png" alt="Weather icon">
        `;
    } else {
        alert("Weather data is not available.");
    }
}



