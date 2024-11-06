import { getCityData, getCurrentWeatherData } from "./api.js";
import { DateTime } from "../node_modules/luxon/build/es6/luxon.js";

const isoDate = "2024-11-06T17:11:00+01:00";
const formattedDate = DateTime.fromISO(isoDate).toFormat("dd.MM.yyyy HH:mm");
console.log(formattedDate);

const search = document.getElementById("search-form");
const input = document.querySelector(".right-section__input");

//main right block
const cityNameEl = document.querySelector(".main-box-city");
const cityTempEl = document.querySelector(".main-grad");
const cityDateEl = document.querySelector(".main-box-time");
const cityWeatherStateEl = document.querySelector(".weather-state-img");

//weather data left
const cityMaxTempEl = document.querySelector(".temp-max-grad");
const cityMinTempEl = document.querySelector(".temp-min-grad");
const HumidityEl = document.querySelector(".humidity");
const CloudyEl = document.querySelector(".cloudy");
const WindEl = document.querySelector(".wind");

//Edit how to display city name and other data
function getEditedText(text, words, isCapitalized) {
  const editedText = text.trim().split(" ").slice(0, words).join(" ");


  if (isCapitalized) {
    const capitalizedText =
      editedText.at(0).toUpperCase() + editedText.slice(1);
    return capitalizedText;
  }
  return editedText;
}

async function displayWeatherParams(inputText) {
  const cityData = await getCityData(input.value);
  const currentWeatherData = await getCurrentWeatherData(cityData.cityKey);

  cityNameEl.textContent = getEditedText(inputText, 1, true);
  cityTempEl.textContent = `${currentWeatherData.temperature.toFixed(0)}°`;

  const date = DateTime.fromISO(currentWeatherData.time);
  cityDateEl.textContent = date.toFormat(`HH:mm - ccc , dd MMMM`);
  //   cityWeatherStateEl.textContent = getEditedText(input.value, 1, true);

  cityMaxTempEl.textContent = `${currentWeatherData.maxTempPastHours.Metric.Value.toFixed(
    0
  )}°`;
  cityMinTempEl.textContent = `${currentWeatherData.minTempPastHours.Metric.Value.toFixed(
    0
  )}°`;
  HumidityEl.textContent = `${currentWeatherData.humidity}%`;
  CloudyEl.textContent = `${currentWeatherData.cloudCover}%`;
  WindEl.textContent = `${currentWeatherData.windSpeed}km/h`;
}

search.addEventListener("submit", async (event) => {
  event.preventDefault();

  if (input.value) {
    displayWeatherParams(input.value);
  }

  input.value = "";
});
