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
                    value: 3.21
                },
                fluidLevel: {
                    min: 0,
                    max: 30,
                    value: 12.45
                },
                fluidLevelTrend: {
                    min: -7,
                    max: 7,
                    value: -3.56
                }
            },
            2: {
                fluidFlow: {
                    min: 0,
                    max: 10,
                    value: 3.21
                },
                fluidLevel: {
                    min: 0,
                    max: 30,
                    value: 7.30
                },
                fluidLevelTrend: {
                    min: -2,
                    max: 3,
                    value: 1.33
                }
            }
        };
        /*STUB DATA END*/

        this._valve = new FluidController.Valve(100, 200, (position) => this.valveParametersHandler(position));

        /*CONFIG DATA START*/
        const bucketsSettings = {
            1: {
                maxLevel: 30,
                shutLevel: 25,
                critLevel: 5,
                minLevel: 2,
                inletR: 5,
                buckR: 2,
                outletR: 3,
                currentLevel: 10,
                inletSpeed: 3,
                outletSpeed: 3,
                fluidController: this._valve
            },
            2: {
                maxLevel: 30,
                shutLevel: 25,
                critLevel: 5,
                minLevel: 2,
                inletR: 5,
                buckR: 2,
                outletR: 3,
                currentLevel: 10,
                inletSpeed: 3,
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
            const oldBucketsSettings = Object.assign({}, prevState.bucketsSettings);

            oldBucketsSettings[bucketID][parameterName] = value ? parseFloat(value) : '';

            return {
                bucketsSettings: oldBucketsSettings
            }
        });
    }

    valveHandler() {
        this.setState((prevState) => {

            if (!prevState.isRunning) {
                this._valve.start(10);
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
