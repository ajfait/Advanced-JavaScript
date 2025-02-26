const init = () => {
    let weatherButton = document.querySelector("#getWeather");
    weatherButton.addEventListener("click", getLocation);
}

const getWeather = (lat, lng) => {
    let xhr = new XMLHttpRequest();
    let url = `https://secure.geonames.org/findNearByWeatherJSON?username=ajfait&lat=${lat}&lng=${lng}`;

    xhr.open("get", url);

    xhr.onreadystatechange = () => {
        if(xhr.readyState == 4) {
            console.log(url);
        }
    }

    xhr.send(null);
}

const getLocation = () => {
    let xhr = new XMLHttpRequest();
    let zip = document.querySelector("#zip").value;
    let url = `https://secure.geonames.org/postalCodeSearchJSON?username=ajfait&postalcode=${zip}`;

    console.log(url);

    xhr.open("get", url);

    xhr.onreadystatechange = () => {
        if(xhr.readyState == 4) {
            let data = JSON.parse(xhr.responseText);
            let lat = data.postalCodes[0].lat;
            let lng = data.postalCodes[0].lng;

            console.log(lat);
            console.log(lng);
            
            getWeather(lat, lng);
        }
    }

    xhr.send(null);
}

window.onload = init;