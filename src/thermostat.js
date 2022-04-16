'use strict';

class Thermostat {

    constructor() {
        this.temperature = 20;
        this.powerSave = true;
        this.energyUsage = 'medium-usage';
        this.MINIMUM = 10;
        this.maximum = 25;
    }

    up(degrees) {
        if(this.temperature + degrees >= this.maximum) {
            return this.temperature = this.maximum;
        } else {
        return this.temperature += degrees;
        }
    }

    down(degrees) {
        if (this.temperature - degrees <= this.MINIMUM) {
            return this.temperature = this.MINIMUM;
        } else {
            return this.temperature -= degrees;
        }
    }

    switchPowerSave() {
        if (!this.powerSave) {
            this.powerSave = true;
            this.maximum = 25;
        } else {
            this.powerSave = false;
            this.maximum = 32;
        }
        return this.powerSave;
    }

    showPowerSavingMode() {
        if (this.powerSave) {
            return 'ON'
        } else {
            return 'OFF'
        }
    }

    reset() {
        this.powerSave = true;
        return this.temperature = 20;
    }

    showEnergyUsage() {
        if (this.temperature < 18) {
            this.energyUsage = 'low-usage'
        } else if (this.temperature > 25) {
            this.energyUsage = 'high-usage';
        } else {
            this.energyUsage;
        }
        return this.energyUsage;
    }

    async getTemperature() {
        const response = await fetch('http://localhost:4567/temperature');
        const data = await response.json();
        return data.temperature;
    }

    getCurrentTemperature() {
    console.log(this.getTemperature())
    }
}

