import React, { Component } from 'react';
import Typography from '@material-ui/core/Typography';
import './styles/parameter.css';
import ScalableSlider from './ScalableSlider';

class Parameter extends Component {
    render() {
        return (
            <div className='parameter-row'>
                <Typography>{this.props.title}</Typography>
                <ScalableSlider
                    value={this.props.value}
                    step={0.01}
                    valueLabelDisplay='on'
                    marks
                    centralMark
                    maxValue={this.props.maxValue}
                    minValue={this.props.minValue}
                    valueDescription={this.props.valueDescription}
                />
            </div>
        );
    }
}

export default Parameter;
