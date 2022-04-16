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

  let currentTemperature = () => {
      document.querySelector(".current-temp").innerHTML = `${thermostat.getCurrentTemperature()}°C`;
  }

  let currentEnergyUsage = () => {
    document.querySelector("#dot").style.backgroundColor = '#000000';
  }

  let checkEnergyUsage = () => {
    if (thermostat.showEnergyUsage() === 'low-usage') {
      document.querySelector("#dot").style.backgroundColor = '#6BCB77';
    } else if (thermostat.showEnergyUsage() === 'high-usage') {
      document.querySelector("#dot").style.backgroundColor = '#FF8C32';
    } else {
      document.querySelector("#dot").style.backgroundColor = '#000000';
    };
  }

  currentTemperature();
  currentEnergyUsage();
  
  document.querySelector(".increase").addEventListener('click', () => {
    thermostat.up(1);
    currentTemperature();
    checkEnergyUsage();
  });

  document.querySelector(".decrease").addEventListener('click', () => {
    thermostat.down(1);
    currentTemperature();
    checkEnergyUsage();
  });

  document.querySelector("#powerSave").innerHTML = `Power Save ${thermostat.showPowerSavingMode()}`;

  document.querySelector("#switchModeBtn").addEventListener('click', () => {
      if (!thermostat.powerSave && thermostat.temperature > 25) {
        thermostat.switchPowerSave();
        document.querySelector("#powerSave").innerHTML = ` Power Save ${thermostat.showPowerSavingMode()}`;
        document.querySelector(".current-temp").innerHTML = `${thermostat.maximum}°C`;
        console.log('I reset temperature at 25 max');
      } else {
          thermostat.switchPowerSave();
        document.querySelector("#powerSave").innerHTML = ` Power Save ${thermostat.showPowerSavingMode()}`;
      }
  });

  document.querySelector("#resetBtn").addEventListener('click', () => {
    thermostat.reset();
    document.querySelector(".current-temp").innerHTML = `${thermostat.temperature}°C`;
    document.querySelector("#powerSave").innerHTML = ` Power Save ${thermostat.showPowerSavingMode()}`;
    document.querySelector("#dot").style.backgroundColor = '#000000';
  });


});





