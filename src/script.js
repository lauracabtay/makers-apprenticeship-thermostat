document.addEventListener("DOMContentLoaded", () => {
  // Execute this code when the page is fully loaded
  const thermostat = new Thermostat();

  let currentTemperature = () => {
      document.querySelector(".current-temp").innerHTML = `${thermostat.temperature}°C`;
  }

  let currentEnergyUsage = () => {
    document.querySelector("#dot").style.backgroundColor = '#000000';
  }

  let checkEnergyUsage = () => {
    if (thermostat.temperature < 18) {
      document.querySelector("#dot").style.backgroundColor = '#6BCB77';
      console.log('it should have turned green');
    } else if (thermostat.temperature > 25) {
      document.querySelector("#dot").style.backgroundColor = '#FF8C32';
      console.log('it should have turned orange');
    } else {
      document.querySelector("#dot").style.backgroundColor = '#000000';
      console.log('it should be black');
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