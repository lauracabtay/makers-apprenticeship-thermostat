'use strict';

describe('Thermostat', function() {
    let thermostat;

    beforeEach(function() {
        thermostat = new Thermostat();
    });

    describe('initially', function() {
        it('starts at 20 degrees', function() {
            expect(thermostat.getCurrentTemperature()).toEqual(20);
        });
    });

    it('increases the temperature', function() {
        expect(thermostat.up(5)).toEqual(25);
    });

    it('decreases the temperature', function() {
        expect(thermostat.down(6)).toEqual(14);
    });

    it('minimum temperature is 10 degrees', function() {
        expect(thermostat.MINIMUM).toEqual(10);
    });

    it('under 10 degrees, it stays at 10 degrees', function() {
        expect(thermostat.down(15)).toEqual(10);
    });

    it('if power save mode is on, max temperature is 25 ', function() {
        expect(thermostat.up(10)).toEqual(25);
    });

    it('if power save mode is on', function() {
        expect(thermostat.showPowerSavingMode()).toEqual('ON');
    });

    it('if power save mode is off, max temperature is 32 ', function() {
        thermostat.switchPowerSave();
        expect(thermostat.up(15)).toEqual(32);
    });

    it('if power save mode is on, it can be turned off', function() {
        thermostat.switchPowerSave();
        expect(thermostat.showPowerSavingMode()).toEqual('OFF');
    });

    it('resets the temperature to 20', function() {
        thermostat.temperature = 25;
        thermostat.reset();
        expect(thermostat.getCurrentTemperature()).toEqual(20);
    });

    it('shows low energy usage when temp. set under 18 degrees', function() {
        thermostat.temperature = 17;
        expect(thermostat.showEnergyUsage()).toEqual('low-usage');
    });

    it('shows medium energy usage when temp. set  over 17 and under 26 degrees', function() {
        thermostat.temperature = 18;
        expect(thermostat.showEnergyUsage()).toEqual('medium-usage');
    });

    it('shows high energy usage when temp. set  over 25 degrees', function() {
        thermostat.switchPowerSave();
        thermostat.up(13);
        expect(thermostat.showEnergyUsage()).toEqual('high-usage');
    });
});