"use strict";

const username = "ajfait";

const init = () => {
  let weatherButton = document.querySelector("#getWeather");
  weatherButton.addEventListener("click", getLocation);
};

const getWeather = (lat, lng) => {
  let xhr = new XMLHttpRequest();
  let url = `https://secure.geonames.org/findNearByWeatherJSON?username=${username}&lat=${lat}&lng=${lng}`;

  xhr.open("get", url);

  xhr.onreadystatechange = () => {
    if (xhr.readyState == 4) {
      console.log(url);

      let data = JSON.parse(xhr.responseText);
      let temperature = data.weatherObservation.temperature;
      let windSpeed = data.weatherObservation.windSpeed;

      console.log(`Temperature (Celsius): ${temperature}`);
      console.log(`Wind Speed: ${windSpeed}`);

      document.querySelector("#windSpeed").innerHTML = windSpeed;

      convertTemperature(temperature);

      document
        .querySelector("#weatherResults")
        .classList.remove("visually-hidden");

      document.querySelector("#zip").value = "";
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

      document.querySelector("#city").innerHTML = city;

      getWeather(lat, lng);
    }
  };

  xhr.send(null);
};

const convertTemperature = (temperature) => {
  //°F = (°C × 9/5) + 32
  const CONVERSION_FACTOR = 1.8;
  const OFFSET = 32;

  let temperatureFahrenheit = temperature * CONVERSION_FACTOR + OFFSET;

  console.log(`Temperature (Fahrenheit): ${temperatureFahrenheit}`);

  document.querySelector("#temperatureFahrenheit").innerHTML =
    temperatureFahrenheit;

  return temperatureFahrenheit;
};

window.onload = init;
