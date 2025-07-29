document.addEventListener("DOMContentLoaded", () => {
  const typewriter = document.querySelector(".typewriter");

  // Function to restart the animation
  function restartAnimation() {
    typewriter.style.animation = "none";       // Remove animation
    typewriter.offsetHeight;                    // Trigger reflow to reset
    typewriter.style.animation = "";            // Restore animation (from CSS)
  }

  // Listen for animation end to restart it
  typewriter.addEventListener("animationend", () => {
    setTimeout(restartAnimation, 2000); // wait 2 seconds before restart
  });
});
// script.js
const apiKey = "be4888e737e52bbf4d042fb0c725db0f";

function getWeather() {
  const city = document.getElementById("cityInput").value.trim();
  const resultDiv = document.getElementById("weatherResult");

  if (!city) {
    resultDiv.innerHTML = "Please enter a city name.";
    return;
  }

  resultDiv.innerHTML = "Loading...";

  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`)
    .then(response => {
      if (!response.ok) {
        throw new Error("City not found");
      }
      return response.json();
    })
    .then(data => {
      const temp = data.main.temp;
      const desc = data.weather[0].description;
      const icon = data.weather[0].icon;
      const iconUrl = `https://openweathermap.org/img/wn/${icon}@2x.png`;

      resultDiv.innerHTML = `
        <p><strong>${city}</strong></p>
        <img src="${iconUrl}" alt="${desc}" />
        <p>${temp}°C – ${desc}</p>
      `;
    })
    .catch(error => {
      resultDiv.innerHTML = "Couldn't fetch weather: " + error.message;
    });
}
