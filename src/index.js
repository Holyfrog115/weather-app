import "./styles.css";
import { getApiData } from "./weatherapi.js";
import weatherIcons from "./importIcons.js";

async function processData(apiPromiseData) {
  const apiData = await apiPromiseData;
  if (apiData) {
    console.log(apiData);
    const weatherData = {
      time: apiData.currentConditions.datetime,
      temp: apiData.currentConditions.temp,
      sunrise: apiData.currentConditions.sunrise,
      sunset: apiData.currentConditions.sunset,
      days: apiData.days,
      address: apiData.address,
      icon: apiData.currentConditions.icon,
    };

    const iconToCondition = {
      "clear-day": "Clear",
      "clear-night": "Clear",
      "partly-cloudy-day": "Partly Cloudy",
      "partly-cloudy-night": "Partly Cloudy",
      cloudy: "Cloudy",
      rain: "Rain",
      snow: "Snow",
      fog: "Fog",
      wind: "Wind",
    };

    const address = document.querySelector("#address");
    const temp = document.querySelector("#temp");
    const conditionName = document.querySelector(".condition-name");
    const conditionImage = document.querySelector(".condition-img");
    const feelsLike = document.querySelector("#feelslike");
    const weekDays = document.querySelectorAll(".weekDay");
    let weekDayNum = 0;

    address.textContent = apiData.address;

    if (apiData.currentConditions.temp > 0) {
      temp.textContent = `+${apiData.currentConditions.temp}°C`;
    } else {
      temp.textContent = `${apiData.currentConditions.temp}°C`;
    }

    conditionName.textContent = iconToCondition[apiData.currentConditions.icon];
    conditionImage.src = weatherIcons[apiData.currentConditions.icon];

    if (apiData.currentConditions.feelslike > 0) {
      feelsLike.textContent = `Feels like: +${apiData.currentConditions.feelslike}°C`;
    } else {
      feelsLike.textContent = `Feels like: ${apiData.currentConditions.feelslike}°C`;
    }

    weekDays.forEach((weekDay) => {
      const datas = weekDay.children;
      datas[0].src = weatherIcons[apiData.days[weekDayNum].icon];
      if (apiData.days[weekDayNum].temp > 0) {
        datas[1].textContent = `+${apiData.days[weekDayNum].temp}°C`;
      } else {
        datas[1].textContent = `${apiData.days[weekDayNum].temp}°C`;
      }
      weekDayNum++;
    });
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
