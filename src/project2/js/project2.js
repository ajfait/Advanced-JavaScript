"use strict";

const username = "ajfait";
const countrycode = "US";
const cold = 34;
const hot = 83;
const wind = 15;

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
  const iconCold = createImage(
    "images/thermometer-snow.svg",
    "Thermometer Snow Icon",
    "ps-2"
  );

  const iconHot = createImage(
    "images/thermometer-sun.svg",
    "Thermometer Sun Icon",
    "ps-2"
  );

  const conversionFactor = 1.8;
  const offset = 32;

  let temperatureFahrenheit = Math.round(
    temperature * conversionFactor + offset
  );

  document.querySelector("#temperatureFahrenheit").innerHTML =
    temperatureFahrenheit;
  if (temperatureFahrenheit >= hot) {
    document.querySelector("#temperatureFahrenheit").appendChild(iconHot);
  }
  if (temperatureFahrenheit <= cold) {
    document.querySelector("#temperatureFahrenheit").appendChild(iconCold);
  }

  console.log(`Temperature (Fahrenheit): ${temperatureFahrenheit}`);

  return temperatureFahrenheit;
};

const getWeather = (lat, lng) => {
  const iconWind = createImage("images/wind.svg", "Wind Icon", "ps-2");

  let xhr = new XMLHttpRequest();
  let url = `https://secure.geonames.org/findNearByWeatherJSON?username=${username}&lat=${lat}&lng=${lng}`;

  console.log(url);

  xhr.open("get", url);

  xhr.onreadystatechange = () => {
    if (xhr.readyState == 4) {
      let data = JSON.parse(xhr.responseText);
      let temperature = data.weatherObservation.temperature;
      let windSpeed = Math.round(data.weatherObservation.windSpeed);

      document.querySelector("#windSpeed").innerHTML = windSpeed;
      if (windSpeed > wind) {
        document.querySelector("#windSpeed").appendChild(iconWind);
      }

      console.log(`Wind Speed: ${windSpeed}`);
      console.log(`Temperature (Celsius): ${temperature}`);

      convertTemperature(temperature);

      displayResults();
    }
  };

  xhr.send(null);
};

const getLocation = () => {
  let xhr = new XMLHttpRequest();
  let zip = document.querySelector("#zip").value;
  let url = `https://secure.geonames.org/postalCodeSearchJSON?username=${username}&postalcode=${zip}&countrycode=${countrycode}`;

  console.log(url);

  xhr.open("get", url);

  xhr.onreadystatechange = () => {
    if (xhr.readyState == 4) {
      let data = JSON.parse(xhr.responseText);
      let city = data.postalCodes[0].placeName;
      let lat = data.postalCodes[0].lat;
      let lng = data.postalCodes[0].lng;

      document.querySelector("#weatherHeading").innerHTML =
        "Current Weather for " + city;

      console.log(`City: ${city}`);
      console.log(`Latitude: ${lat}`);
      console.log(`Longitude: ${lng}`);

      getWeather(lat, lng);
    }
  };

  xhr.send(null);
};

window.onload = init;
