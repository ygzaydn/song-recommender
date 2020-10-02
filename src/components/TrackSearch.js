import React, { useState } from 'react';
import { StyledButton } from './StyledButtonComponent';
import { StyledTextField } from './StyledTextField';
import { connect } from 'react-redux'
import { mapDispatchToProps, mapStateToProps } from '../store'
import { makeStyles } from '@material-ui/core/styles'
import { Grid } from '@material-ui/core/'
import { ListComponent } from './ListComponent'
import { searchTrackByName } from '../axiosCalls'

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
    return (
        <div>
            <form className={classes.form} noValidate autoComplete="off">
                <StyledTextField label="Track Name" onChange={setTextField}/>
                <StyledButton color="primary" variant="outlined" onClick={() => {searchTrackByName(searchText, onSearchTracks)}}>
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
                    listeners={el.listeners}
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