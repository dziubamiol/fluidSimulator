class Valve {
    constructor(...buckets) {
        this.buckets = buckets;
        this.valvePosition = 0;
    }

    get totalBuckets() {
        return this.buckets.length;
    }

    sendEvent(sender, event) {
    }

    calculate(tickTime) {
    }

    add(bucket) {
        this.buckets.push(bucket);
    }
}


class Bucket {
    constructor(parameters) {
        this._currentLevel = parameters.currentLevel;
        this._maxLevel = parameters.maxLevel;
        this._shutLevel = parameters.shutLevel;
        this._critLevel = parameters.critLevel;
        this._minLevel = parameters.minLevel;
        this._inletRadius = parameters.inletR;
        this._outletRadius = parameters.outletR;
        this._bucketRadius = parameters.buckR;
        this._fluidController = parameters.fluidController;

        this._currentVolume = this._currentLevel;
        this._isFilling = false;

        this._inVolume = parameters.inletSpeed * 2 * Math.PI * this._inletRadius ** 2;
        this._outVolume = parameters.outletSpeed * 2 * Math.PI * this._outletRadius ** 2;

        if (this._inVolume - this._outVolume < 0) {} // todo add solver for invalid scheme


    }

    get currentParameters() {
        return {
            fluidFlow: {
                min: 0,
                max: this._inVolume,
                value: this._inVolume * this._isFilling,
            },
            fluidLevel: {
                min: this._minLevel,
                max: this._maxLevel,
                value: this.currentLevel,
            },
            fluidLevelTrend: {
                min: this._outVolume,
                max: this._inVolume - this._outVolume,
                value: this._inVolume * this._isFilling - this._outVolume,
            }
        }
    }

    get currentLevel() {
        return this._currentVolume / (2 * Math.PI * this._bucketRadius ** 2);
    }

    fill() {
        this._currentVolume += this._inVolume;
        this._isFilling = true;
    }

    stopFilling() {
        this._isFilling = false;
    }

    fluidController() {
        this._currentVolume -= this._outVolume;
    }

}

export default {
    Valve,
    Bucket
};
