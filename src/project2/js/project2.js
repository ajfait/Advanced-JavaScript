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

      console.log(`Temperature (Celsius): ${temperature}`);

      convertTemperature(temperature);
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
      let lat = data.postalCodes[0].lat;
      let lng = data.postalCodes[0].lng;

      console.log(`Latitude: ${lat}`);
      console.log(`Longitude: ${lng}`);

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

  return temperatureFahrenheit;
};

window.onload = init;
