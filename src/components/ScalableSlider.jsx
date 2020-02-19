import React, { Component } from 'react';
import Slider from '@material-ui/core/Slider';

class ScalableSlider extends Component {
    render() {
        const marks = [
            {
                value: 0,
                label: `${this.props.minValue || 0} ${this.props.valueDescription}`
            },
            {
                value: 100,
                label: `${this.props.maxValue || 100} ${this.props.valueDescription}`
            }
        ];

        const scaleValue = (value) => ((value - this.props.minValue) / (this.props.maxValue - this.props.minValue)) * 100;

        if (this.props.centralMark) {
            const newMarkValue = (this.props.maxValue + this.props.minValue) / 2;
            marks.splice(1, 0, {
                value: 50,
                label: `${newMarkValue} ${this.props.valueDescription}`
            })
        }

        return (
            <Slider
                defaultValue={scaleValue(this.props.defaultValue)}
                value={scaleValue(this.props.value)}
                step={this.props.step}
                valueLabelDisplay={this.props.valueLabelDisplay}
                valueLabelFormat={this.props.value}
                marks={this.props.marks && marks}
            />
        );
    }
}

export default ScalableSlider;
