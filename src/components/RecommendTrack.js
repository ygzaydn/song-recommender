import React, { useState } from 'react';
import { StyledButton } from './StyledButtonComponent';
import { StyledTextField } from './StyledTextField';
import { connect } from 'react-redux'
import { mapDispatchToProps, mapStateToProps } from '../store'
import { Grid } from '@material-ui/core/'
import { ListComponent } from './ListComponent'
import { searchTrackByNameAndArtist, getTrackFromSearch,getTrackFromSearchwithNameandArtist } from '../axiosCalls'
import { geoTopArtistStyle } from '../themes'

const RecommendTrack = ({trackInfoState, onRecommendTrack, onGetTrack,onGetSimilarTrack,onStateChange}) => {
    const classes = geoTopArtistStyle();
    const [trackName, setTrackName] = useState('')
    const [trackArtist, setTrackArtist] = useState('')

    const getTrackName = (event) => {
        setTrackName(event.target.value);
    }
    const getTrackArtist = (event) => {
        setTrackArtist(event.target.value);
    }
    return (
        <div>
            <form className={classes.form} noValidate autoComplete="off">
                    <StyledTextField label="Track Name" onChange={getTrackName}/>
                    <StyledTextField label="Track Artist" onChange={getTrackArtist}/>
                <StyledButton color="primary" variant="outlined" onClick={() => {searchTrackByNameAndArtist(trackName, trackArtist, onRecommendTrack)}}>
                    Search
                 </StyledButton>
            </form>
            <Grid className={classes.container} container spacing={3}>
                {trackInfoState.getRecommendedTrack
                ? trackInfoState.getRecommendedTrack.map(el => {
                const handleClickFunction = () => el.mbid ? getTrackFromSearch(el.mbid,onGetTrack,onGetSimilarTrack,onStateChange) :  getTrackFromSearchwithNameandArtist(el.name,el.artist.name, onGetTrack,onGetSimilarTrack,onStateChange);
                return (
                    <ListComponent 
                    mbid={el.mbid}
                    name={el.name}
                    artist={el.artist.name}
                    handleClick={handleClickFunction}
                    match={el.match}
                    /> 
                )
                }) 
                : null }
          </Grid>
        </div>
    )
}

export const ConnectedRecommendTrack = connect(mapStateToProps,mapDispatchToProps)(RecommendTrack);