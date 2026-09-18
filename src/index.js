import "./styles.css";
import { getApiData } from "./weatherapi.js";

async function processData(apiPromiseData) {
  const apiData = await apiPromiseData;
  console.log(apiData);
}

processData(getApiData("Barnaul"));
