import React, { Component } from 'react';
import Parameter from './Parameter';


class ValveParameter extends Component {
    render() {
        return (
            <div className='bordered-container'>
                <Parameter
                    title='Water distribution'
                    minValue={-100}
                    maxValue={100}
                    valueDescription='%'
                    showCentralMark
                    value={this.props.valvePosition}
                />
            </div>
        );
    }
}

export default ValveParameter;
