import "./styles.css";
import { getApiData } from "./weatherapi.js";

console.log(await getApiData("Barnaul"));
