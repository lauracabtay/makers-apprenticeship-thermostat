document.addEventListener("DOMContentLoaded", () => {
  // Execute this code when the page is fully loaded

  document.querySelector('.select-city').addEventListener('submit', (event) => {
    event.preventDefault();
    const city = document.querySelector('.city-input').value;
    displayWeather(city);
  })

  const displayWeather = (city) => {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=21ef1a41bca3d148dda0245791799d41&units=metric`;

    fetch(url)
    .then((response) => {
      return response.json()
    })
    .then((data) => {
      document.querySelector('.city-temp').innerText = `${Math.round(data.main.temp)}°C in ${city}`;
    })
  }

  const thermostat = new Thermostat();
  const dot = document.querySelector("#dot");
  const currentTemp = document.querySelector(".current-temp");
  const powerSave = document.querySelector("#powerSave")

  let currentTemperature = () => {
    currentTemp.innerHTML = `${thermostat.temperature}°C`;
  }

  // let currentEnergyUsage = () => {
  //   dot.style.backgroundColor = '#000000';
  // }

  let currentPowerSave = () => {
    powerSave.innerHTML = `Power Save ${thermostat.showPowerSavingMode()}`;
  }

  let checkEnergyUsage = () => {
    if (thermostat.showEnergyUsage() === 'low-usage') {
      dot.style.backgroundColor = '#6BCB77';
      console.log(thermostat.showEnergyUsage());
    } else if (thermostat.showEnergyUsage() === 'high-usage') {
      dot.style.backgroundColor = '#FF8C32';
      console.log(thermostat.showEnergyUsage());
    } else {
      dot.style.backgroundColor = '#000000';
      console.log(thermostat.showEnergyUsage());
    };
  }
  
  currentTemperature();
  checkEnergyUsage();
  currentPowerSave();

  document.querySelector(".increase").addEventListener('click', () => {
    thermostat.up(1);
    currentTemperature();
    checkEnergyUsage() ;
  });

  document.querySelector(".decrease").addEventListener('click', () => {
    thermostat.down(1);
    currentTemperature();
    checkEnergyUsage() ;
  });

  document.querySelector("#switchModeBtn").addEventListener('click', () => {
      if (!thermostat.powerSave && thermostat.temperature > 25) {
        thermostat.switchPowerSave();
        currentPowerSave();
        currentTemperature();
        checkEnergyUsage() ;
      } else {
        thermostat.switchPowerSave();
        currentPowerSave();
        checkEnergyUsage() ;
      }
  });

  document.querySelector("#resetBtn").addEventListener('click', () => {
    thermostat.reset();
    currentTemperature();
    currentPowerSave();
    checkEnergyUsage();
  });


});





