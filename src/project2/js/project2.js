"use strict";

const username = "ajfait";
const WIND_SPEED_LIMIT = 15;
const TEMPERATURE_LIMIT = 83;

const init = () => {
  let weatherButton = document.querySelector("#getWeather");
  weatherButton.addEventListener("click", getLocation);
};

const createImage = (src, alt, className) => {
  const image = document.createElement("img");
  image.src = src;
  image.alt = alt;
  image.className = className;
  return image;
};

const displayResults = () => {
  document.querySelector("#weatherResults").classList.remove("visually-hidden");
  document.querySelector("#zip").value = "";
};

const convertTemperature = (temperature) => {
  const CONVERSION_FACTOR = 1.8;
  const OFFSET = 32;

  let temperatureFahrenheit = Math.round(
    temperature * CONVERSION_FACTOR + OFFSET
  );
  console.log(`Temperature (Fahrenheit): ${temperatureFahrenheit}`);

  const image = createImage(
    "images/thermometer-sun.svg",
    "Thermometer Sun Icon",
    "ps-2"
  );

  document.querySelector("#temperatureFahrenheit").innerHTML =
    temperatureFahrenheit;
  if (temperatureFahrenheit > TEMPERATURE_LIMIT) {
    document.querySelector("#temperatureFahrenheit").appendChild(image);
  }

  return temperatureFahrenheit;
};

const getWeather = (lat, lng) => {
  const image = createImage("images/wind.svg", "Wind Icon", "ps-2");

  let xhr = new XMLHttpRequest();
  let url = `https://secure.geonames.org/findNearByWeatherJSON?username=${username}&lat=${lat}&lng=${lng}`;

  xhr.open("get", url);

  xhr.onreadystatechange = () => {
    if (xhr.readyState == 4) {
      console.log(url);

      let data = JSON.parse(xhr.responseText);
      let temperature = data.weatherObservation.temperature;
      let windSpeed = Math.round(data.weatherObservation.windSpeed);

      console.log(`Temperature (Celsius): ${temperature}`);
      console.log(`Wind Speed: ${windSpeed}`);

      document.querySelector("#windSpeed").innerHTML = windSpeed;
      if (windSpeed > WIND_SPEED_LIMIT) {
        document.querySelector("#windSpeed").appendChild(image);
      }

      convertTemperature(temperature);

      displayResults();
    }
  };

  xhr.send(null);
};

const getLocation = () => {
  let xhr = new XMLHttpRequest();
  let zip = document.querySelector("#zip").value;
  let url = `https://secure.geonames.org/postalCodeSearchJSON?username=${username}&postalcode=${zip}`;

  console.log(url);

  xhr.open("get", url);

  xhr.onreadystatechange = () => {
    if (xhr.readyState == 4) {
      let data = JSON.parse(xhr.responseText);
      let city = data.postalCodes[0].placeName;
      let lat = data.postalCodes[0].lat;
      let lng = data.postalCodes[0].lng;

      console.log(`City: ${city}`);
      console.log(`Latitude: ${lat}`);
      console.log(`Longitude: ${lng}`);

      document.querySelector("#weatherHeading").innerHTML =
        "Current Weather for " + city;

      getWeather(lat, lng);
    }
  };

  xhr.send(null);
};

window.onload = init;
