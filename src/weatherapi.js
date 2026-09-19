async function getApiData(location, unitGroup = "metric") {
  const errorBox = document.querySelector(".searchError");
  try {
    errorBox.classList.add("hidden");
    const response = await fetch(
      `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?unitGroup=${unitGroup}&iconSet=icons1&key=FR5HV9LKCEUMYNX5JAZAF7GPV`,
    );
    if (!response.ok) {
      const errorMessage = await response.text();
      throw new Error(`HTTP ${response.status}: ${errorMessage}`);
    }
    const weatherData = await response.json();
    return weatherData;
  } catch (error) {
    errorBox.classList.remove("hidden");
    errorBox.textContent = "Specified location not found";
  }
}

export { getApiData };
