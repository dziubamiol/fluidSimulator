import React, { Component } from 'react';
import Button from '@material-ui/core/Button';


class StartControls extends Component {
    render() {
        const isRunning = this.props.isRunning;
        const valveStatus = isRunning ? 'Valve opened' : 'Valve closed';

        return (
            <div className='bordered-container'>
                <div className='start-parameters'>
                    <Button
                        color={isRunning ? 'secondary' : 'primary'}
                        variant='contained'
                        onClick={this.props.valveHandler}
                    >
                        {valveStatus}
                    </Button>
                </div>
            </div>
        );
    }
}

export default StartControls;
