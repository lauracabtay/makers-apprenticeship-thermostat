'use strict';

class Thermostat {

    constructor() {
        this.temperature = 20;
        this.powerSave = true;
        this.energyUsage = 'medium-usage';
        this.MINIMUM = 10;
        if (this.powerSave === true) {
            this.maximum = 25;
        } else {
            this.maximum = 32;
        }
    }

    up(degrees) {
        if(this.temperature + degrees >= this.maximum) {
            this.temperature = this.maximum;
        } else {
            this.temperature += degrees;
            this.showEnergyUsage();
        }
        return this.temperature
    }

    down(degrees) {
        if (this.temperature - degrees <= this.MINIMUM) {
            return this.temperature = this.MINIMUM;
        } else {
            this.temperature -= degrees;
            this.showEnergyUsage();
        }
        return this.temperature;
    }

    switchPowerSave() {
        if (this.powerSave === false) {
            if (this.temperature > 25) {
                this.powerSave = true;
                this.maximum = 25;
                this.temperature = 25;
                this.energyUsage = 'medium-usage';
            } else {
                this.powerSave = true;
                this.maximum = 25;
            }
        } else {
            this.powerSave = false;
            this.maximum = 32;
        }
        return this.powerSave;
    }

    showPowerSavingMode() {
        let powerSaveText = '';
        if (this.powerSave === true) {
            powerSaveText = 'ON';
        } else {
            powerSaveText = 'OFF';
        }
        return powerSaveText;
    }

    reset() {
        this.powerSave = true;
        this.energyUsage = 'medium-usage';
        return this.temperature = 20;
    }

    showEnergyUsage() {
        if (this.temperature < 18) {
            this.energyUsage = 'low-usage'
        } else if (this.temperature > 25) {
            this.energyUsage = 'high-usage';
        } else {
            this.energyUsage = 'medium-usage';
        }
        return this.energyUsage;
    }

    // async getTemperature() {
    //     try {
    //         const response = await fetch('http://localhost:4567/temperature');
    //         const data = await response.json();
    //         this.temperature = data.temperature;
    //     } catch(e) {
    //         this.temperature = 20
    //     }
    //     return this.temperature;
    // }

    // async getPowerSaveMode() {
    //     try {
    //         const response = await fetch('http://localhost:4567/temperature');
    //         const data = await response.json();
    //         this.powerSave = data.power_save_mode;
    //     } catch(e) {
    //         this.powerSave = true;
    //     }
    //     return this.powerSave;
    // }
}

