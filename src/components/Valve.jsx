import React, {Component} from 'react';
import './styles/valve.css';

class Valve extends Component {
    render() {
        return (
            <div className='valve-container'>
                <img
                    className='valve-img'
                    src={'/valve.svg'}
                    alt='Nothing to show'
                />
            </div>
        );
    }
}

export default Valve;
