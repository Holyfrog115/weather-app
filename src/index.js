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

let location;
let unitGroup = "metric";

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
    const tempUnit = unitGroup == "metric" ? "C" : "F";

    address.textContent = apiData.resolvedAddress.split(",")[0];

    if (apiData.currentConditions.temp > 0) {
      temp.textContent = `+${apiData.currentConditions.temp}°${tempUnit}`;
    } else {
      temp.textContent = `${apiData.currentConditions.temp}°${tempUnit}`;
    }

    conditionName.textContent = iconToCondition[apiData.currentConditions.icon];
    conditionImage.src = weatherIcons[apiData.currentConditions.icon];

    if (apiData.currentConditions.feelslike > 0) {
      feelsLike.textContent = `Feels like: +${apiData.currentConditions.feelslike}°${tempUnit}`;
    } else {
      feelsLike.textContent = `Feels like: ${apiData.currentConditions.feelslike}°${tempUnit}`;
    }

    weekDays.forEach((weekDay) => {
      const datas = weekDay.children;
      datas[0].src = weatherIcons[apiData.days[weekDayNum].icon];
      if (apiData.days[weekDayNum].temp > 0) {
        datas[1].textContent = `+${apiData.days[weekDayNum].temp}°${tempUnit}`;
      } else {
        datas[1].textContent = `${apiData.days[weekDayNum].temp}°${tempUnit}`;
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
    location = search.value;
    processData(getApiData(location, unitGroup));
  });
}

async function defaultLocation() {
  try {
    const res = await fetch("https://ipapi.co/json/");
    if (!res.ok) throw new Error("IP lookup failed");
    const data = await res.json();
    processData(getApiData(data.city, unitGroup));
    location = data.city;
  } catch {
    processData(getApiData("London", unitGroup));
    location = "London";
  }
}

function setupUnitGroupBtns() {
  const celsiusBtn = document.querySelector("#celsius");
  const fahrenheitBtn = document.querySelector("#fahrenheit");

  celsiusBtn.addEventListener("click", () => {
    unitGroup = "us";
    fahrenheitBtn.classList.remove("hidden");
    celsiusBtn.classList.add("hidden");
    processData(getApiData(location, unitGroup));
  });

  fahrenheitBtn.addEventListener("click", () => {
    unitGroup = "metric";
    fahrenheitBtn.classList.add("hidden");
    celsiusBtn.classList.remove("hidden");
    processData(getApiData(location, unitGroup));
  });
}

setupSearch();
setupUnitGroupBtns();
defaultLocation();
