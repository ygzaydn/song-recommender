import React, { useState } from 'react';
import { StyledButton } from './StyledButtonComponent';
import { StyledTextField } from './StyledTextField';
import { connect } from 'react-redux'
import { mapDispatchToProps, mapStateToProps } from '../store'
import { makeStyles } from '@material-ui/core/styles'
import { Grid } from '@material-ui/core/'
import { ListComponent } from './ListComponent'
import { getGeoTopArtists, getArtistInfoFromSearch, getArtistInfoFromName } from '../axiosCalls'

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

const GeoTopArtist = ({geoState, onGetGeoTopArtists, onStateChange, onGetArtist, onGetTopTracks, onGetTopAlbums}) => {
    const classes = useStyles();
    const [searchText, setSearchText] = useState('')

    const setTextField = (event) => {
        setSearchText(event.target.value)
    }

    return (

        <div>
        <form className={classes.form} noValidate autoComplete="off">
            <StyledTextField label="County name" onChange={setTextField}/>
            <StyledButton color="primary" variant="outlined" onClick={()=> getGeoTopArtists(searchText, onGetGeoTopArtists, onStateChange)}>
            Search
            </StyledButton>
        </form>
            <Grid className={classes.container} container spacing={3}>
                {geoState.getGeoTopArtists
                ? geoState.getGeoTopArtists.map(el => {
                const handleClickFunction = () => el.mbid ? getArtistInfoFromSearch(el.mbid,onGetArtist,onGetTopTracks,onGetTopAlbums,onStateChange) :  getArtistInfoFromName(el.name,onGetArtist,onGetTopTracks,onGetTopAlbums,onStateChange);
                return (
                    <ListComponent 
                    name={el.name}
                    listeners={el.listeners}
                    handleClick={handleClickFunction}
                    /> 
                )
                }) 
                : null }
          </Grid>
        </div>
    )
}

export const ConnectedGeoTopArtist = connect(mapStateToProps,mapDispatchToProps)(GeoTopArtist);