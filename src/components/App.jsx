import React, { Component } from 'react';
import './styles/app.css';
import Bucket from './Bucket';
import Valve from './Valve';
import ParametersViewer from './ParametersViewer';

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            valvePosition: 0, // 0-180
            buckets: {},
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
                <div className='view-grid'>
                    <Valve />
                    <div className='buckets-container'>
                        <Bucket
                            parametersHandler={this.bucketParametersHandler.bind(this, '0')}
                        />
                        <Bucket
                            parametersHandler={this.bucketParametersHandler.bind(this, '1')}
                        />
                    </div>
                </div>
                <div className='parameters-grid'>
                    <ParametersViewer />
                </div>
            </div>
        );
    }
}

export default App;
