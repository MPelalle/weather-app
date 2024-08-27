// JavaScript

const container = document.querySelector(".container");
const search = document.querySelector(".search-box");
const weatherBox = document.querySelector(".weather-box"); 
const weatherDetails = document.querySelector(".weather-details");
const error404 = document.querySelector(".not-found");

search.addEventListener("click", () => {
    const APIKey = "c50c79dd8daaf0d1771066ff68378680";
    const city = document.getElementById("input").value;

    if (city === "") return;

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}`)
        .then(response => response.json())
        .then(json => {
            console.log(json);

            if (json.cod === "404") {
                container.style.height = "400px";
                weatherBox.style.display = "none";
                weatherDetails.style.display = "none";
                error404.style.display = "block";
                error404.classList.add("fadeIn");
                return;
            }

            error404.style.display = "none";
            error404.classList.remove("fadeIn");

            const image = document.querySelector(".weather-box img");
            const temperature = document.querySelector(".weather-box .temperature");
            const description = document.querySelector(".weather-box .description");
            const humidity = document.querySelector(".weather-details .humidity span");
            const wind = document.querySelector(".weather-details .wind span");

            if (image) {
                const weatherCondition = json.weather[0].main;
                switch (weatherCondition) {
                    case "Clear":
                        image.src = "./multimedia/conditions/soleado.png";
                        break;
                    case "Rain":
                        image.src = "./multimedia/conditions/lluvia.png";
                        break;
                    case "Mist":
                        image.src = "./multimedia/conditions/niebla.png";
                        break;
                    case "Clouds":
                        image.src = "./multimedia/conditions/nublado.png";
                        break;
                    case "Snow":
                        image.src = "./multimedia/conditions/nieve.png";
                        break;
                    default:
                        image.src = "";
                }
            } else {
                console.warn('Elemento de imagen no encontrado');
            }

            if (temperature) {
                temperature.innerHTML = `${parseInt(json.main.temp)}<span>°C</span>`;
            } else {
                console.warn('Elemento de temperatura no encontrado');
            }

            if (description) {
                description.innerHTML = `${json.weather[0].description}`;
            } else {
                console.warn('Elemento de descripción no encontrado');
            }

            if (humidity) {
                humidity.innerHTML = `${json.main.humidity}%`;
            } else {
                console.warn('Elemento de humedad no encontrado');
            }

            if (wind) {
                wind.innerHTML = `${parseInt(json.wind.speed)} Km/h`;
            } else {
                console.warn('Elemento de viento no encontrado');
            }

            weatherBox.style.display = "";
            weatherDetails.style.display = "";
            weatherBox.classList.add("fadeIn");
            weatherDetails.classList.add("fadeIn");
            container.style.height = "500px";
        })
        .catch(error => {
            console.error('Error al obtener los datos del clima:', error);
        });
});


