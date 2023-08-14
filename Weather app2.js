document.addEventListener("DOMContentLoaded", () => {
    const apiKey = "1c32e6c1fc13c6eb21f80099e3387c58"; // Replace with your actual API key
    const apiUrl = "https://api.openweathermap.org/data/2.5/weather?&units=metric&q=";

    const searchBox = document.querySelector(".search input");
    const searchBtn = document.querySelector(".search button");
    const weatherIcon = document.querySelector(".weather-icon");
    const gmtTimeElement = document.querySelector(".gmt-time");
    const celsiusEl = document.getElementById("celsius");
    const fahrenheitEl = document.getElementById("fahrenheit");

    async function fetchWeather(city) {
        const response = await fetch(apiUrl + city + `&appid=${apiKey}`);
        const data = await response.json();
        return data;
    }

    async function updateWeather(city) {
        const weatherData = await fetchWeather(city);

        document.querySelector(".city").innerHTML = weatherData.name;
        const celsiusTemperature = Math.round(weatherData.main.temp);
        document.querySelector(".temp").innerHTML = celsiusTemperature + "°c";
        document.querySelector(".humidity").innerHTML = weatherData.main.humidity + "%";
        document.querySelector(".wind").innerHTML = weatherData.wind.speed + " km/h";

        if (weatherData.weather[0].main === "Clouds") {
            weatherIcon.src = "images/cloudy.png";
        } else if (weatherData.weather[0].main === "Clear") {
            weatherIcon.src = "images/sun.png";
        } else if (weatherData.weather[0].main === "Rain") {
            weatherIcon.src = "images/rain.png";
        } else if (weatherData.weather[0].main === "Drizzle") {
            weatherIcon.src = "images/drizzle.png";
        } else if (weatherData.weather[0].main === "Mist") {
            weatherIcon.src = "images/mist.png";
        }

        // Calculate and display Fahrenheit temperature
        const fahrenheitTemperature = (celsiusTemperature * 1.8 + 32).toFixed(2);
        if (fahrenheitEl) {
            fahrenheitEl.value = fahrenheitTemperature;
        }
    }

    searchBtn.addEventListener("click", () => {
        const city = searchBox.value.trim();
        if (city) {
            document.querySelector(".weather").style.display = "block";
            updateWeather(city);
        }
    });

    searchBox.addEventListener("keydown", (event) => {
        if (event.key === "Enter") {
            event.preventDefault();
            updateWeather(searchBox.value);
        }
    });

    function updateGMTTime() {
        const gmtTime = new Date().toUTCString();
        if (gmtTimeElement) {
            gmtTimeElement.textContent = gmtTime;
        }
    }

    setInterval(updateGMTTime, 1000);


});


//  api key : 1c32e6c1fc13c6eb21f80099e3387c58
// api url : https://api.openweathermap.org/data/2.5/weather?&units=metric&q=