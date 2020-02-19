import React, {Component} from 'react';
import TextField from "@material-ui/core/TextField";
import './styles/bucket.css';

class Bucket extends Component {
    render() {
        return (
            <div className='bucket-container'>
                <div className='bucket-img'>
                    <img
                        src={'/bucket.svg'}
                        alt='Nothing to show'
                    />
                    <div className='bucket-water' />
                </div>
                <div className='bucket-parameters'>
                    <TextField
                        label='Maximum Level'
                        name='maxLevel'
                        defaultValue='10'
                        fullWidth
                        variant='outlined'
                    />
                </div>
            </div>
        );
    }
}

export default Bucket;
