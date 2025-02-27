/*
 * Alison Fait
 * Online
 * ajfait@madisoncollege.edu
 *
 */

"use strict";

// Constants
const username = "ajfait";
const countrycode = "US";
const cold = 34;
const hot = 83;
const wind = 15;

/*
 * This function begins the application when the user clicks
 * on the Get Weather CTA.
 *
 */
const init = () => {
  let weatherButton = document.querySelector("#getWeather");
  weatherButton.addEventListener("click", getLocation);
};

/*
 * This function creates a generic image element including
 * image source, alt text, and CSS class name.
 *
 */
const createImage = (src, alt, className) => {
  const image = document.createElement("img");
  image.src = src;
  image.alt = alt;
  image.className = className;
  return image;
};

/*
 * This function displays the results of the current weather
 * by removing the visually-hidden class name from the results
 * table and clearing the zip code input field.
 *
 */
const displayResults = () => {
  document.querySelector("#weatherResults").classList.remove("visually-hidden");
  document.querySelector("#zip").value = "";
};

/*
 * This function converts the temperature from celsius to
 * fahrenheit using the formula °F = (°C × 9/5) + 32. It creates
 * the cold and hot icon image elements. It appends the temperature
 * in fahrenheit to the table, as well as the applicable icon.
 *
 */
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

/*
 * This function makes an HTTP request to the GeoNames website to
 * get the current temperature and wind speed for a given location
 * based on the latitude and longitude passed into the URL as query
 * parameters from the getLocation function. It creates the wind
 * speed icon image element. It appends the current wind speed to
 * the results table, as well as the wind icon if applicable.
 *
 */
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

/*
 * This function makes an HTTP request to the GeoNames website to get the
 * latitude and longitude for a given location based on the zip code passed
 * into the URL as a query parameter from the input field. It updates the
 * table heading with the city name.
 *
 */
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

// Kicks off the init method when the page is fully loaded.
window.onload = init;
