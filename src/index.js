import "./styles.css";
import { getApiData } from "./weatherapi.js";
import weatherIcons from "./importIcons.js";

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

async function processData(apiPromiseData) {
  const loadStatus = document.querySelector(".loadStatus");
  loadStatus.classList.remove("hidden");
  const apiData = await apiPromiseData;
  if (apiData) {
    const address = document.querySelector("#address");
    const temp = document.querySelector("#temp");
    const conditionName = document.querySelector(".condition-name");
    const conditionImage = document.querySelector(".condition-img");
    const feelsLike = document.querySelector("#feelslike");
    const weekDays = document.querySelectorAll(".weekDay");
    let weekDayNum = 0;

    address.textContent = apiData.resolvedAddress.split(",")[0];

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
  loadStatus.classList.add("hidden");
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
