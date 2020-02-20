import React, {Component} from 'react';
import Parameter from './Parameter';
import './styles/bucketParameters.css';

class BucketParameters extends Component {
    render() {

        const {
            fluidFlow,
            fluidLevel,
            fluidLevelTrend,
        } = this.props;

        return (
            <div className='bordered-container'>
                <Parameter
                    title={`Bucket #${this.props.id} FLOW`}
                    minValue={fluidFlow.min}
                    maxValue={fluidFlow.max}
                    value={fluidFlow.value}
                    valueDescription='L/S'
                />
                <Parameter
                    title={`Bucket #${this.props.id} LVL`}
                    minValue={fluidLevel.min}
                    maxValue={fluidLevel.max}
                    value={fluidLevel.value}
                    valueDescription='L'
                />
                <Parameter
                    title={`Bucket #${this.props.id} LVL TREND`}
                    minValue={fluidLevelTrend.min}
                    maxValue={fluidLevelTrend.max}
                    value={fluidLevelTrend.value}
                    valueDescription='L/S'
                />
            </div>
        );
    }
}

export default BucketParameters;
