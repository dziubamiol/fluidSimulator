import { ExpansionPanel, ExpansionPanelDetails, ExpansionPanelSummary } from '@material-ui/core';
import React, {Component} from 'react';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import './styles/bucket.css';


class Bucket extends Component {
    render() {
        const parametersHandler = this.props.parametersHandler;
        console.log(parametersHandler);

        return (
            <div className='bucket-container'>
                <div className='bucket-img'>
                    <img
                        src={'/bucket.svg'}
                        alt='Nothing to show'
                    />
                    <div className='bucket-water' />
                </div>
                <div className='bucket-parameters-wrapper'>
                    <ExpansionPanel>
                        <ExpansionPanelSummary
                            expandIcon={<ExpandMoreIcon />}
                        >
                            <Typography>Bucket #{this.props.id} settings</Typography>
                        </ExpansionPanelSummary>
                        <ExpansionPanelDetails>
                            <div className='bucket-parameters'>
                                <TextField
                                    label='Maximum Level'
                                    name='maxLevel'
                                    fullWidth
                                    variant='outlined'
                                    size='small'
                                    onChange={parametersHandler}
                                />
                                <TextField
                                    label='Shutoff Level'
                                    name='shutLevel'
                                    defaultValue='25'
                                    fullWidth
                                    variant='outlined'
                                    size='small'
                                    onChange={parametersHandler}
                                />
                                <TextField
                                    label='Critical Level'
                                    name='critLevel'
                                    defaultValue='5'
                                    fullWidth
                                    variant='outlined'
                                    size='small'
                                    onChange={parametersHandler}
                                />
                                <TextField
                                    label='Minimum Level'
                                    name='minLevel'
                                    defaultValue='2'
                                    fullWidth
                                    variant='outlined'
                                    size='small'
                                    onChange={parametersHandler}
                                />
                                <hr />
                                <TextField
                                    label='Inlet Radius'
                                    name='inletR'
                                    defaultValue='2'
                                    fullWidth
                                    variant='outlined'
                                    size='small'
                                    onChange={parametersHandler}
                                />
                                <TextField
                                    label='Bucket Radius'
                                    name='buckR'
                                    defaultValue='8'
                                    fullWidth
                                    variant='outlined'
                                    size='small'
                                    onChange={parametersHandler}
                                />
                                <TextField
                                    label='Outlet Radius'
                                    name='outletR'
                                    defaultValue='3'
                                    fullWidth
                                    variant='outlined'
                                    size='small'
                                    onChange={parametersHandler}
                                />
                            </div>
                        </ExpansionPanelDetails>
                    </ExpansionPanel>
                </div>
            </div>
        );
    }
}

export default Bucket;
