const apiKey = "1dea07b979323232f60946142a079e67";

function getWeather() {
  const city = document.getElementById("city").value;
  if (city === "") {
    alert("Enter city name");
    return;
  }

  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`)
    .then(res => res.json())
    .then(data => showWeather(data))
    .catch(() => alert("City not found"));
}

function showWeather(data) {
  document.getElementById("weather").innerHTML = `
    <h2>${data.name}, ${data.sys.country}</h2>
    <p>🌡 Temperature: ${data.main.temp}°C</p>
    <p>☁ Weather: ${data.weather[0].description}</p>
    <p>💨 Wind Speed: ${data.wind.speed} m/s</p>
  `;
}

function getLocationWeather() {
  navigator.geolocation.getCurrentPosition(pos => {
    const lat = pos.coords.latitude;
    const lon = pos.coords.longitude;

    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`)
      .then(res => res.json())
      .then(data => showWeather(data))
      .catch(() => alert("Unable to get weather for current location"));
  });
}
