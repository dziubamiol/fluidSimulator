import React, { Component } from 'react';
import Parameter from './Parameter';
import BucketParameters from './BucketParameters';
import './styles/parametersViewer.css';

class ParametersViewer extends Component {
    render() {


        return (
            <div className='parameters-container'>
                <div className='bordered-container'>
                    <Parameter
                        title='Water distribution'
                        minValue={-100}
                        maxValue={100}
                        valueDescription='%'
                        showCentralMark
                        value={40.1}
                    />
                </div>
                <BucketParameters
                    id='1'
                    {...this.props.buckets['1']}
                />
                <BucketParameters
                    id='2'
                    {...this.props.buckets['2']}
                />
            </div>
        );
    }
}

export default ParametersViewer;
