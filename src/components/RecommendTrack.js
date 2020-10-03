import React, { useState } from 'react';
import { StyledButton } from './StyledButtonComponent';
import { StyledTextField } from './StyledTextField';
import { connect } from 'react-redux'
import { mapDispatchToProps, mapStateToProps } from '../store'
import { makeStyles } from '@material-ui/core/styles'
import { Grid } from '@material-ui/core/'
import { ListComponent } from './ListComponent'
import { searchTrackByName, getTrackFromSearch } from '../axiosCalls'

const useStyles = makeStyles(() => ({
    form: {
      display: 'flex',
      flexDirection: 'column',
      //alignItems: 'center',
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
//trackInfoState.getRecommendedTrack

const RecommendTrack = ({trackInfoState, onRecommendTrack, onGetTrack,onGetSimilarTrack,onStateChange}) => {
    const classes = useStyles();
    const [searchText, setSeachText] = useState('')

    const setTextField = (event) => {
        setSeachText(event.target.value);
    }
    return (
        <div>
            <form className={classes.form} noValidate autoComplete="off">
                    <StyledTextField label="Track Name" onChange={setTextField}/>
                    <StyledTextField label="Track Artist" onChange={setTextField}/>
                <StyledButton color="primary" variant="outlined" onClick={() => {searchTrackByName(searchText, onRecommendTrack)}}>
                    Search
                 </StyledButton>
            </form>
            <Grid className={classes.container} container spacing={3}>
                {trackInfoState.getRecommendedTrack
                ? trackInfoState.getRecommendedTrack.map(el => {
                const handleClickFunction = () => el.mbid ? getTrackFromSearch(el.mbid,onGetTrack,onGetSimilarTrack,onStateChange) :  getTrackFromSearch(el.name,onGetTrack,onGetSimilarTrack,onStateChange);
                return (
                    <ListComponent 
                    mbid={el.mbid}
                    name={el.name}
                    listeners={el.listeners}
                    artist={el.artist}
                    handleClick={handleClickFunction}
                    /> 
                )
                }) 
                : null }
          </Grid>
        </div>
    )
}

export const ConnectedRecommendTrack = connect(mapStateToProps,mapDispatchToProps)(RecommendTrack);