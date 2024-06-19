const apiKey = "0a4344b4866b256b242f6d35936478c6";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";
const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");
const errorBox = document.querySelector(".error");
const weatherBox = document.querySelector(".weather");

searchBtn.addEventListener("click", () => {
    const city = searchBox.value.trim();
    if (city) {
        checkWeather(city);
    } else {
        errorBox.style.display = "block";
        weatherBox.style.display = "none";
        errorBox.querySelector("p").textContent = "Please enter a city name.";
    }
});

async function checkWeather(city) {
    try {
        const response = await fetch(apiUrl + city + `&appid=${apiKey}`);
        if (!response.ok) {
            throw new Error("City not found or invalid query.");
        }
        const data = await response.json();
        console.log(data);

        document.querySelector(".city").textContent = data.name;
        document.querySelector(".temp").textContent = Math.round(data.main.temp) + "°C";
        document.querySelector(".humidity").textContent = data.main.humidity + "%";
        document.querySelector(".wind").textContent = data.wind.speed + " km/h";

        const weatherCondition = data.weather[0].main;
        if (weatherCondition === "Clouds") {
            weatherIcon.src = "images/clouds.png";
        } else if (weatherCondition === "Clear") {
            weatherIcon.src = "images/clear.png";
        } else if (weatherCondition === "Rain") {
            weatherIcon.src = "images/rain.png";
        } else if (weatherCondition === "Drizzle") {
            weatherIcon.src = "images/drizzle.png";
        } else if (weatherCondition === "Mist") {
            weatherIcon.src = "images/mist.png";
        }

        weatherBox.style.display = "block";
        errorBox.style.display = "none";
    } catch (error) {
        console.error(error);
        errorBox.style.display = "block";
        weatherBox.style.display = "none";
        errorBox.querySelector("p").textContent = "Invalid City Name";
    }
}
