import config from "./config";
import fetch from "node-fetch";

const weatherApiByCity = (city) =>
    resolveToJson(
        apiFetch("q=" + city)
    );

const weatherApiByCoords = (coords) =>
    resolveToJson(
        apiFetch("lat=" + coords.latitude + "&lon=" + coords.longitude)
    );

const weatherApiById = (id) =>
    resolveToJson(
        apiFetch("id=" + id)
    );

const apiFetch = (searchString) =>
    fetch("https://api.openweathermap.org/data/2.5/weather?" + searchString + "&appid=" + config.weatherApi.key);

const resolveToJson = (weatherPromise) =>
    weatherPromise.then(
        (response) => {
            return response;
        },
        (e) => {
            console.log(e);
        }
    ).then(
        async (response) => {
            let json = await response.json().then((json) => {
                return json;
            });
            if (response.ok) {
                return {status: "ok", response: repackData(json)}
            } else {
                return {status: "fail", response: json}
            }
        }
    );

const repackData = (obj) => ({
    name: obj.name,
    country: obj.sys.country,
    temp: obj.main.temp,
    wind: {
        speed: obj.wind.speed,
        heading: obj.wind.deg
    },
    clouds: obj.weather[0].description,
    pressure: obj.main.pressure,
    humidity: obj.main.humidity,
    coords: {
        lat: obj.coord.lat,
        lon: obj.coord.lon
    },
    icon: obj.weather[0].icon
});


export {weatherApiByCity, weatherApiByCoords, weatherApiById};
