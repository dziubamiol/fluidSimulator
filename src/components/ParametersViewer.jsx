import React, { Component } from 'react';
import ValveParameter from './ValveParameter';
import BucketParameters from './BucketParameters';
import StartControls from './StartControls';
import './styles/parametersViewer.css';


class ParametersViewer extends Component {
    render() {
        return (
            <div className='parameters-container'>
                <ValveParameter
                    valvePosition={this.props.valvePosition}
                />
                <BucketParameters
                    id='1'
                    {...this.props.buckets['1']}
                />
                <BucketParameters
                    id='2'
                    {...this.props.buckets['2']}
                />
                <StartControls
                    isRunning={this.props.isRunning}
                    valveHandler={this.props.valveHandler}
                />
            </div>
        );
    }
}


export default ParametersViewer;
