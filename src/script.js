
document.addEventListener("DOMContentLoaded", () => {
  // Execute this code when the page is fully loaded
  thermostat = new Thermostat();

  let currentTemperature = document.querySelector("#current-temp");
  currentTemperature.innerHTML = `${thermostat.temperature}°C`;

  let increaseButton = document.querySelector("#increase").addEventListener('click', increaseTemperature);
  let decreaseButton = document.querySelector("#decrease").addEventListener('click', decreaseTemperature);

  let currentPowerMode = document.querySelector("#powerSave");
  currentPowerMode.innerHTML = `Power Save ${thermostat.showPowerSavingMode()}`;

  let changePowerSaveMode = document.querySelector("#switchModeBtn").addEventListener('click', switchMode);

  let resetButton = document.querySelector("#resetBtn").addEventListener('click', resetMode);

    let currentEnergyUsage = document.querySelector("#dot");
    currentEnergyUsage.style.backgroundColor = '#000000';

    let decreaseEnergyUsage = document.querySelector("#decrease").addEventListener('click', checkEnergyUsage);
    let increaseEnergyUsage = document.querySelector("#increase").addEventListener('click', checkEnergyUsage);
});

function increaseTemperature() {
  thermostat.up(1);
  // checkEnergyUsage();
  document.querySelector("#current-temp").innerHTML = `${thermostat.temperature}°C`;
}

function decreaseTemperature() {
  thermostat.down(1);
  // checkEnergyUsage();
  document.querySelector("#current-temp").innerHTML = `${thermostat.temperature}°C`;
}

function switchMode() {
  if (!thermostat.powerSave && thermostat.temperature > 25) {
    thermostat.switchPowerSave();
    document.querySelector("#powerSave").innerHTML = ` Power Save ${thermostat.showPowerSavingMode()}`;
    document.querySelector("#current-temp").innerHTML = `${thermostat.maximum}°C`;
    console.log('I reset temperature at 25 max');
  } else {
      thermostat.switchPowerSave();
    document.querySelector("#powerSave").innerHTML = ` Power Save ${thermostat.showPowerSavingMode()}`;
  }
}

function resetMode() {
  thermostat.reset();
  document.querySelector("#current-temp").innerHTML = `${thermostat.temperature}°C`;
  document.querySelector("#powerSave").innerHTML = ` Power Save ${thermostat.showPowerSavingMode()}`;
  document.querySelector("#dot").style.backgroundColor = '#000000';
}

function checkEnergyUsage() {
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