import React, { useState } from 'react';
import { StyledButton } from './StyledButtonComponent';
import { StyledTextField } from './StyledTextField';
import { connect } from 'react-redux'
import { mapDispatchToProps, mapStateToProps } from '../store'
import { Grid } from '@material-ui/core/'
import { ListComponent } from './ListComponent'
import { getGeoTopTracks, getTrackFromSearch, getTrackFromSearchwithNameandArtist } from '../axiosCalls'
import { geoTopArtistStyle } from '../themes'

const GeoTopTrack = ({geoState, onGetGeoTopTracks, onStateChange, onGetTrack,onGetSimilarTrack}) => {
    const classes = geoTopArtistStyle();
    const [searchText, setSearchText] = useState('')

    const setTextField = (event) => {
        setSearchText(event.target.value)
    }

    return (
        <div>
        <form className={classes.form} noValidate autoComplete="off">
            <StyledTextField label="County name" onChange={setTextField}/>
            <StyledButton color="primary" variant="outlined" onClick={()=> getGeoTopTracks(searchText, onGetGeoTopTracks, onStateChange)}>
            Search
            </StyledButton>
        </form>
            <Grid className={classes.container} container spacing={3}>
                {geoState.getGeoTopTracks
                ? geoState.getGeoTopTracks.map(el => {
                const handleClickFunction = () => el.mbid ? getTrackFromSearch(el.mbid,onGetTrack,onGetSimilarTrack,onStateChange) :  getTrackFromSearchwithNameandArtist(el.name,el.artist.name, onGetTrack,onGetSimilarTrack,onStateChange);
                return (
                    <ListComponent 
                    mbid={el.mbid}
                    name={el.name}
                    artist={el.artist.name}
                    handleClick={handleClickFunction}
                    listeners={el.listeners}
                    /> 
                )
                }) 
                : null }
          </Grid>
        </div>
    )
}

export const ConnectedGeoTopTrack = connect(mapStateToProps,mapDispatchToProps)(GeoTopTrack);