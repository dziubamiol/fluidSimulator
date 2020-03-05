import React, { Component } from 'react';
import Bucket from './Bucket';
import Valve from './Valve';
import ParametersViewer from './ParametersViewer';
import FluidController from './../utils/fluidController';
import './styles/app.css';


class App extends Component {
    constructor(props) {
        super(props);

        /*STUB DATA START*/
        const bucketsParameters = {
            1: {
                fluidFlow: {
                    min: 0,
                    max: 20,
                    value: 0
                },
                fluidLevel: {
                    min: 0,
                    max: 30,
                    value: 0
                },
                fluidLevelTrend: {
                    min: -7,
                    max: 7,
                    value: 0
                }
            },
            2: {
                fluidFlow: {
                    min: 0,
                    max: 10,
                    value: 0
                },
                fluidLevel: {
                    min: 0,
                    max: 30,
                    value: 0
                },
                fluidLevelTrend: {
                    min: -2,
                    max: 3,
                    value: 0
                }
            }
        };
        /*STUB DATA END*/

        const firstBucketChangeTime = 100;
        const secondBucketChangeTime = 200;

        this._valve = new FluidController.Valve(firstBucketChangeTime, secondBucketChangeTime, (position) => this.valveParametersHandler(position));

        /*CONFIG DATA START*/

        const bucketsSettings = {
            1: {
                timeToStart: firstBucketChangeTime,
                timeToStartAnother: secondBucketChangeTime,
                maxLevel: 300,
                shutLevel: 250,
                critLevel: 5,
                minLevel: 2,
                inletR: 5,
                buckR: 2,
                outletR: 3,
                currentLevel: 150,
                inletSpeed: 3,
                outletSpeed: 3,
                fluidController: this._valve
            },
            2: {
                timeToStartAnother: firstBucketChangeTime,
                timeToStart: secondBucketChangeTime,
                maxLevel: 300,
                shutLevel: 250,
                critLevel: 5,
                minLevel: 2,
                inletR: 5,
                buckR: 2,
                outletR: 3,
                currentLevel: 90,
                inletSpeed: 5,
                outletSpeed: 3,
                fluidController: this._valve
            }
        };

        this._bucket_1 = new FluidController.Bucket('1', bucketsSettings[1], (params) => this.bucketHandler(params));
        this._valve.add(this._bucket_1);
        this._bucket_2 = new FluidController.Bucket('2', bucketsSettings[2], (params) => this.bucketHandler(params));
        this._valve.add(this._bucket_2);

        this.state = {
            valvePosition: 0, // 0-180
            bucketsParameters: bucketsParameters,
            isRunning: false,
            bucketsSettings: bucketsSettings,
        };

        this.valveHandler = this.valveHandler.bind(this);
    }

    bucketParametersHandler(bucketID, event) {
        const parameterName = event.target.name;
        const value = event.target.value;

        this.setState((prevState) => {
            const { ...oldBucketsSettings } = prevState.bucketsSettings;

            oldBucketsSettings[bucketID][parameterName] = value ? parseFloat(value) : '';

            this[`_bucket_${bucketID}`] = new FluidController.Bucket(bucketID, oldBucketsSettings[bucketID], (params) => this.bucketHandler(params));

            return {
                bucketsSettings: oldBucketsSettings
            }
        });
    }

    valveHandler() {
        this.setState((prevState) => {

            if (!prevState.isRunning) {
                this._valve.start(100);
            } else {
                this._valve.stop();
            }

            return {
                isRunning: !prevState.isRunning,
            }
        });
    }

    valveParametersHandler(valvePosition) {
        this.setState({
            valvePosition: valvePosition
        });
    }

    bucketHandler(bucketParameters) {
        this.setState((prevState) => {
            const { ...oldBucketsParameters } = prevState.bucketsParameters;

            oldBucketsParameters[bucketParameters.id] = bucketParameters.parameters;

            return {
                bucketsParameters: oldBucketsParameters
            };
        });
    }

    render() {
        return (
            <div className='main-grid'>
                <div className='parameters-grid'>
                    <ParametersViewer
                        buckets={this.state.bucketsParameters}
                        valvePosition={this.state.valvePosition}
                        isRunning={this.state.isRunning}
                        valveHandler={this.valveHandler}
                    />
                </div>
                <div className='view-grid'>
                    <Valve/>
                    <div className='buckets-container'>
                        <Bucket
                            id='1'
                            parametersHandler={this.bucketParametersHandler.bind(this, '1')}
                            bucketParameters={this.state.bucketsParameters[1]}
                            bucketsSettings={this.state.bucketsSettings[1]}
                        />
                        <Bucket
                            id='2'
                            parametersHandler={this.bucketParametersHandler.bind(this, '2')}
                            bucketParameters={this.state.bucketsParameters[2]}
                            bucketsSettings={this.state.bucketsSettings[2]}
                        />
                    </div>
                </div>
            </div>
        );
    }
}

export default App;
