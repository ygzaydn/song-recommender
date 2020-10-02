import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core/'
import 'fontsource-roboto';
import { ListComponent } from './ListComponent'
import { mapDispatchToProps, mapStateToProps } from '../store'
import { connect } from 'react-redux'
import { StyledButton } from './StyledButtonComponent'
import { StyledTextField } from './StyledTextField'
import { searchByArtistName, getArtistInfoFromSearch } from '../axiosCalls'


const useStyles = makeStyles((theme) => ({
    container: {
      display: 'grid',
      width: 'auto',
      margin: 'auto',
      gridTemplateColumns: `${window.innerWidth < 600 ? '45vw 45vw' : '22.5vw 22.5vw 22.5vw 22.5vw'}`,
    },
    form: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      margin: 'auto',
      width: '80vw',
    }
  }));

export const RecommendArtist = ({onRecommendArtist, artistState, onGetArtist, onStateChange, onGetTopAlbums, onGetTopTracks}) => {
  const classes = useStyles();
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
          return (
            <ListComponent
            mbid={el.mbid}
            name={el.name}
            match={el.match}
            handleClick={()=> {getArtistInfoFromSearch(el.mbid,onGetArtist,onGetTopTracks,onGetTopAlbums,onStateChange)}}
            /> 
          )
        }) 
        : null }
      </Grid>
    </div>
  )
}

export const ConnectedRecommendArtist = connect(mapStateToProps,mapDispatchToProps)(RecommendArtist)