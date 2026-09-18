import "./styles.css";
import { getApiData } from "./weatherapi.js";

async function processData(apiPromiseData) {
  const apiData = await apiPromiseData;
  if (apiData) {
    const weatherData = {
      time: apiData.currentConditions.datetime,
      temp: apiData.currentConditions.temp,
      sunrise: apiData.currentConditions.sunrise,
      sunset: apiData.currentConditions.sunset,
      days: apiData.days,
      address: apiData.resolvedAddress,
    };
    console.log(weatherData);
  }
}

function setupSearch() {
  const search = document.querySelector("#locationSearch");
  const searchBtn = document.querySelector("#searchBtn");
  searchBtn.addEventListener("click", (event) => {
    event.preventDefault();
    const location = search.value;
    processData(getApiData(location));
  });
}

setupSearch();
