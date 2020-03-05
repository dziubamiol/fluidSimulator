class Valve {
    _timeout;
    constructor(T_1, T_2, watcher, ...buckets) {
        this.buckets = buckets;
        this.valvePosition = 0;
        this.switchTimeout = [T_1, T_2];
        this._watcher = watcher;

        this.events = [];
    }

    get totalBuckets() {
        return this.buckets.length;
    }

    sendEvent(sender, event) {
        this.events.push({
            sender: this.buckets.indexOf(sender),
            event: event,
        });
    }

    switchValve(target) {
        if (this._timeout) {
            clearTimeout(this._timeout)
        }
        this._timeout = setTimeout(() => this.valvePosition = target, this.switchTimeout[target]);
    }

    calculate(tickTime) {
        if (this.events.length > 0) {
            const event = this.events.shift();

            if (event.event === 'fill') {
                if (this.valvePosition !== event.sender) {
                    this.switchValve(event.sender);
                }
            } else if (event.event === 'stop') {
                if (this.valvePosition === event.sender) {
                    this.valvePosition = -1;
                    // this.switchValve((this.valvePosition + 1) % this.totalBuckets)
                }
            } else if (event.event === 'emergency') {
                if (this.valvePosition !== event.sender) {
                    this.valvePosition = event.sender;
                }
            }
        }

        for (let [index, bucket] of this.buckets.entries()) {
            bucket.timeDelta = tickTime;
            bucket.fluidController();

            if (this.valvePosition === index) {
                bucket.fill();
            } else {
                bucket.stopFilling();
            }

            this._watcher(this.valvePosition);
        }
    }

    start(tickTime) {
        if (!this._timeoutID) {
            console.log('started');
            this._timeoutID = setInterval(() => this.calculate(tickTime), tickTime);
        }
    }

    stop() {
        if (this._timeoutID) {
            console.log('stopped');
            clearInterval(this._timeoutID);
            delete this._timeoutID;
        }
    }

    add(bucket) {
        this.buckets.push(bucket);
    }
}


class Bucket {
    constructor(id, parameters, watcher) {
        this._currentLevel = parameters.currentLevel;
        this._maxLevel = parameters.maxLevel;
        this._shutLevel = parameters.shutLevel;
        this._critLevel = parameters.critLevel;
        this._minLevel = parameters.minLevel;
        this._inletRadius = parameters.inletR;
        this._outletRadius = parameters.outletR;
        this._bucketRadius = parameters.buckR;
        this._fluidController = parameters.fluidController;
        this._watcher = watcher;
        this._id = id;
        this._timeToStart = parameters.timeToStart;
        this._timeToStartAnother = parameters.timeToStartAnother;

        this._currentVolume = this._currentLevel;
        this._isFilling = false;

        this._inVolume = parameters.inletSpeed * 2 * Math.PI * this._inletRadius ** 2;
        this._outVolume = parameters.outletSpeed * 2 * Math.PI * this._outletRadius ** 2;

        if (this._inVolume - this._outVolume < 0) {
        } // todo add solver for invalid scheme
    }

    set timeDelta(timeDelta) {
        this._timeDelta = timeDelta / 1000;
    }

    get currentParameters() {
        return {
            id: this._id,
            parameters: {
                fluidFlow: {
                    min: 0,
                    max: parseFloat(this._inVolume.toFixed(1)),
                    value: parseFloat((this._inVolume * this._isFilling * this._timeDelta).toFixed(2)),
                },
                fluidLevel: {
                    min: parseFloat(this._minLevel.toFixed(1)),
                    max: parseFloat(this._maxLevel.toFixed(1)),
                    value: parseFloat(this.currentLevel.toFixed(1)),
                },
                fluidLevelTrend: {
                    min: parseFloat((-this._outVolume).toFixed(1)),
                    max: parseFloat((this._inVolume - this._outVolume).toFixed(1)),
                    value: parseFloat((this._inVolume * this._isFilling * this._timeDelta - this._outVolume).toFixed(1)),
                }
            }
        }
    }

    get currentLevel() {
        return this._currentVolume / (2 * Math.PI * this._bucketRadius ** 2);
    }

    fill() {
        this._currentVolume += this._inVolume * this._timeDelta;
        this._isFilling = true;
    }

    stopFilling() {
        this._isFilling = false;
    }

    fluidController() {
        this._currentVolume -= this._outVolume * this._timeDelta;

        const event = this.makeEvent();

        if (event) {
            console.log(this._id, event);
            this._fluidController.sendEvent(this, event);
        }

        this._watcher(this.currentParameters);
    }

    makeEvent() {
        if (this.currentLevel <= this._critLevel && !this._isFilling) {
            return 'emergency'
        }
        if (this._isFilling) {
            const futureLevelIfDontStop = this._currentVolume + this._inVolume * (this._timeToStart / 1000 + this._timeDelta);
            if (futureLevelIfDontStop > this._maxLevel) {
                return 'stop'
            }
        }
        if (!this._isFilling) {
            const futureLevelIfDontStart = this._currentVolume - this._outVolume * (this._timeToStartAnother / 1000 + this._timeDelta);
            if (futureLevelIfDontStart < this._minLevel) {
                return 'fill'
            }
        }

    }
}


export default {
    Valve,
    Bucket
};
