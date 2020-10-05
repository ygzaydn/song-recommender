import React, {useState} from 'react';
import { Grid } from '@material-ui/core/'
import 'fontsource-roboto';
import { ListComponent } from './ListComponent'
import { mapDispatchToProps, mapStateToProps } from '../store'
import { connect } from 'react-redux'
import { StyledButton } from './StyledButtonComponent'
import { StyledTextField } from './StyledTextField'
import { searchByArtistName, getArtistInfoFromSearch, getArtistInfoFromName } from '../axiosCalls'
import { geoTopArtistStyle } from '../themes'

export const RecommendArtist = ({onRecommendArtist, artistState, onGetArtist, onStateChange, onGetTopAlbums, onGetTopTracks}) => {
  const classes = geoTopArtistStyle(window.innerWidth);
  const [searchText, setSearchText] = useState('');

  const setTextField = (event) => {
    setSearchText(event.target.value)
  }
  
  return (
    <div>
      <form className={classes.form} noValidate autoComplete="off">
       <StyledTextField label="Artist Name" onChange={setTextField}/>
        <StyledButton color="primary" variant="outlined" onClick={()=> searchByArtistName(searchText, onRecommendArtist)}>
          Search
        </StyledButton>
      </form>
      <Grid className={classes.container} container spacing={3}>
        {artistState.getSimilar
        ? artistState.getSimilar.map(el => {
          const handleClickFunction = () => el.mbid ? getArtistInfoFromSearch(el.mbid,onGetArtist,onGetTopTracks,onGetTopAlbums,onStateChange) :  getArtistInfoFromName(el.name,onGetArtist,onGetTopTracks,onGetTopAlbums,onStateChange);
          return (
            <ListComponent
            mbid={el.mbid}
            name={el.name}
            match={el.match}
            handleClick={handleClickFunction}
            /> 
          )
        }) 
        : null }
      </Grid>
    </div>
  )
}

export const ConnectedRecommendArtist = connect(mapStateToProps,mapDispatchToProps)(RecommendArtist)