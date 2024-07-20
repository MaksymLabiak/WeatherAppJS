// Weather APP

const weatherForm = document.querySelector(".weather-form");
const cityInput = document.querySelector(".city-input");
const card = document.querySelector(".card");
const apiKey = "5a217b55b6f8a02e231408258c4c6d6a";

weatherForm.addEventListener("submit", async event => {
    event.preventDefault();
    const city = cityInput.value;

    if (city) {
        try {
            const weatherData = await getWeatherData(city);
            displayWeatherInfo(weatherData);
        }
        catch (error) {
            console.log(error);
            displayError(error);
        }
    } else {
        displayError("Please enter a city");
    }

    cityInput.value = "";
});

async function getWeatherData(city) {

    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`

    const response = await fetch(apiUrl);

    if (!response.ok) {
        throw new Error("City not found");
    }

    return await response.json();
}

function displayWeatherInfo(data) {

    console.log(data);
    const {
        name: city,
        main: { temp, humidity },
        weather: [{ description, id }]
    } = data;

    card.textContent = "";
    card.style.display = "flex";

    const cityDisplay = document.createElement("h1");
    const tempDisplay = document.createElement("p");
    const humidityDisplay = document.createElement("p");
    const conditionDisplay = document.createElement("p");
    const weatherDisplay = document.createElement("p");

    cityDisplay.textContent = city;
    tempDisplay.textContent = `${(temp - 273.15).toFixed(1)}°C`;
    humidityDisplay.textContent = `Humidity: ${humidity}`;
    conditionDisplay.textContent = description;
    weatherDisplay.textContent = getWeatherEnoji(id);

    cityDisplay.classList.add("city-display");
    tempDisplay.classList.add("temp-display");
    humidityDisplay.classList.add("humidity-display");
    conditionDisplay.classList.add("condition-display");
    weatherDisplay.classList.add("weather-emoji");

    card.appendChild(cityDisplay);
    card.appendChild(tempDisplay);
    card.appendChild(humidityDisplay);
    card.appendChild(conditionDisplay);
    card.appendChild(conditionDisplay);
    card.appendChild(weatherDisplay);
}

function getWeatherEnoji(weatherId) {
    switch (true) {
        case (weatherId >= 200 && weatherId < 300):
            return "⛈️";
        case (weatherId >= 300 && weatherId < 400):
            return "🌦️";
        case (weatherId >= 500 && weatherId < 600):
            return "🌧️";
        case (weatherId >= 600 && weatherId < 700):
            return "🌨️";
        case (weatherId >= 700 && weatherId < 800):
            return "🌫️";
        case (weatherId === 800):
            return "☀️";
        case (weatherId >= 801 && weatherId < 810):
            return "☁️";
        default:
            return "?";
    }
}

function displayError(message) {
    const errorDisplay = document.createElement("p");
    errorDisplay.textContent = message;
    errorDisplay.classList.add("error-display");

    card.textContent = "";
    card.style.display = "flex";
    card.appendChild(errorDisplay);
}