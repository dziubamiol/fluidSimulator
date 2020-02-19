import React, { Component } from 'react';
import './styles/app.css';
import Bucket from './Bucket';
import Valve from './Valve';
import ParametersViewer from './ParametersViewer';

class App extends Component {
    constructor(props) {
        super(props);


        /*STUB DATA START*/
        const buckets = {
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
                    max: 15,
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

        this.state = {
            valvePosition: 0, // 0-180
            buckets: buckets,
        }

    }

    bucketParametersHandler(bucketID, parameterName, event) {
        this.setState((state) => {
            const oldBuckets = Object.assign({}, state.buckets);

            oldBuckets[bucketID][parameterName] = event.target.value;
        });
    }


    render() {
        return (
            <div className='main-grid'>
                <div className='parameters-grid'>
                    <ParametersViewer
                        buckets={this.state.buckets}
                        valve={this.state.valvePosition}
                    />
                </div>
                <div className='view-grid'>
                    <Valve/>
                    <div className='buckets-container'>
                        <Bucket
                            id='1'
                            parametersHandler={this.bucketParametersHandler.bind(this, '0')}
                        />
                        <Bucket
                            id='2'
                            parametersHandler={this.bucketParametersHandler.bind(this, '1')}
                        />
                    </div>
                </div>
            </div>
        );
    }
}

export default App;
