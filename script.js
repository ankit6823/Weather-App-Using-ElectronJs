const Button = document.querySelector("#button");
const Search = document.querySelector("#Search");
Button.addEventListener("click", (event) => {
  event.preventDefault();
  const cityDetails = Search.value;
  console.log(cityDetails);
  cityDetails.innerHTML = cityDetails;
  if (window.Bridge) {
    window.Bridge.setCity(cityDetails);
  }
});

window.Bridge.cityName((event, cityDetails) => {
  const city = cityDetails;
  document.querySelector(".city").innerText = "Weather in " + city;
});

window.Bridge.cityData((event, data) => {
  console.log(data);
  // const name = data;
  const temp = data.temp;
  console.log(temp);
  document.querySelector(".temp").innerText = temp + "°C";

  const humidity = data.humidity;
  console.log(humidity);
  document.querySelector("#humidity").innerText = "Humidity:" + humidity + "%";

  const Wind_Speed = data.wind_speed;
  console.log(Wind_Speed);
  document.querySelector("#wind").innerText =
    "Wind Speed: " + Wind_Speed + " km/hr";
});
