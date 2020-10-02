import React, { useState } from 'react';
import { StyledButton } from './StyledButtonComponent';
import { StyledTextField } from './StyledTextField';
import { connect } from 'react-redux'
import { mapDispatchToProps, mapStateToProps } from '../store'
import { makeStyles } from '@material-ui/core/styles'
import { Grid } from '@material-ui/core/'
import axios from 'axios'
import dotenv from 'dotenv'
import { ListComponent } from './ListComponent'

const useStyles = makeStyles(() => ({
    form: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      margin: 'auto',
      width: '80vw',
    },
    container: {
      display: 'grid',
      width: 'auto',
      margin: 'auto',
      gridTemplateColumns: `${window.innerWidth < 600 ? '45vw 45vw' : '22.5vw 22.5vw 22.5vw 22.5vw'}`,
    }

}))
//trackInfoState.getTrack

const TrackSearch = ({trackInfoState, onSearchTracks}) => {
    const classes = useStyles();
    const [searchText, setSeachText] = useState('')

    const setTextField = (event) => {
        setSeachText(event.target.value);
    }

    const searchTrack = async () => {
        const res = await axios.get(`https://ws.audioscrobbler.com/2.0/?method=track.search&track=${searchText}&api_key=${process.env.REACT_APP_API_KEY}&format=json`)
        try {
            onSearchTracks(res);
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div>
            <form className={classes.form} noValidate autoComplete="off">
                <StyledTextField label="Track Name" onChange={setTextField}/>
                <StyledButton color="primary" variant="outlined" onClick={searchTrack}>
                    Search
                 </StyledButton>
            </form>
            <Grid className={classes.container} container spacing={3}>
                {trackInfoState.getTrack
                ? trackInfoState.getTrack.map(el => {
                return (
                    <ListComponent 
                    mbid={el.mbid}
                    name={el.name}
                    match={el.listeners}
                    artist={el.artist}
                    /> 
                )
                }) 
                : null }
          </Grid>
        </div>
    )
}

export const ConnectedTrackSearch = connect(mapStateToProps,mapDispatchToProps)(TrackSearch);