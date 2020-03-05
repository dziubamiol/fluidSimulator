import { ExpansionPanel, ExpansionPanelDetails, ExpansionPanelSummary } from '@material-ui/core';
import React, {Component} from 'react';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import './styles/bucket.css';


class Bucket extends Component {
    render() {
        const parametersHandler = this.props.parametersHandler;
        const bucketParameters = this.props.bucketParameters;
        const bucketSettings = this.props.bucketsSettings;

        const fluidLevel = bucketParameters.fluidLevel;
        const shutLevel = bucketSettings.shutLevel;
        const critLevel = bucketSettings.critLevel;
        const maxLevel = bucketSettings.maxLevel;
        const minLevel = bucketSettings.minLevel;

        const scaleValue = (value, min, max) => (value - min) / (max - min) * 350;

        /*console.log(`${this.props.id}, height ${scaleValue(fluidLevel.value, fluidLevel.min, fluidLevel.max)}`);*/

        return (
            <div className='bucket-container'>
                <div className='bucket-img'>
                    <img
                        src={'/bucket.svg?v=1.0'}
                        alt='Nothing to show'
                    />
                    <div className='bucket-water'
                        style={{
                            height: `${scaleValue(fluidLevel.value, fluidLevel.min, fluidLevel.max)}px`
                        }}
                    />
                    <img
                        src={'/shutLevel.svg'}
                        alt='Nothing to show'
                        className='level-constraints'
                        style={{
                            bottom: `${scaleValue(shutLevel, minLevel, maxLevel) + 120}px`
                        }}
                    />
                    <img
                        src={'/critLevel.svg'}
                        alt='Nothing to show'
                        className='level-constraints'
                        style={{
                            bottom: `${scaleValue(critLevel, minLevel, maxLevel) + 120}px`
                        }}
                    />
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
                                    label='Current level'
                                    value={bucketSettings.currentLevel}
                                    name='currentLevel'
                                    fullWidth
                                    variant='outlined'
                                    size='small'
                                    onChange={parametersHandler}
                                />
                                <TextField
                                    label='Maximum Level'
                                    value={bucketSettings.maxLevel}
                                    name='maxLevel'
                                    fullWidth
                                    variant='outlined'
                                    size='small'
                                    onChange={parametersHandler}
                                />
                                <TextField
                                    label='Shutoff Level'
                                    name='shutLevel'
                                    value={bucketSettings.shutLevel}
                                    fullWidth
                                    variant='outlined'
                                    size='small'
                                    onChange={parametersHandler}
                                />
                                <TextField
                                    label='Critical Level'
                                    name='critLevel'
                                    value={bucketSettings.critLevel}
                                    fullWidth
                                    variant='outlined'
                                    size='small'
                                    onChange={parametersHandler}
                                />
                                <TextField
                                    label='Minimum Level'
                                    name='minLevel'
                                    value={bucketSettings.minLevel}
                                    fullWidth
                                    variant='outlined'
                                    size='small'
                                    onChange={parametersHandler}
                                />
                                <hr />
                                <TextField
                                    label='Inlet Radius'
                                    name='inletR'
                                    value={bucketSettings.inletR}
                                    fullWidth
                                    variant='outlined'
                                    size='small'
                                    onChange={parametersHandler}
                                />
                                <TextField
                                    label='Inlet Speed'
                                    name='inletSpeed'
                                    value={bucketSettings.inletSpeed}
                                    fullWidth
                                    variant='outlined'
                                    size='small'
                                    onChange={parametersHandler}
                                />
                                <TextField
                                    label='Bucket Radius'
                                    name='buckR'
                                    value={bucketSettings.buckR}
                                    fullWidth
                                    variant='outlined'
                                    size='small'
                                    onChange={parametersHandler}
                                />
                                <TextField
                                    label='Outlet Radius'
                                    name='outletR'
                                    value={bucketSettings.outletR}
                                    fullWidth
                                    variant='outlined'
                                    size='small'
                                    onChange={parametersHandler}
                                />
                                <TextField
                                    label='Outlet Speed'
                                    name='outletSpeed'
                                    value={bucketSettings.outletSpeed}
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
