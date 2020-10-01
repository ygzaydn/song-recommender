import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core/'
import 'fontsource-roboto';
import { ListComponent } from './ListComponent'
import { mapDispatchToProps, mapStateToProps } from '../store'
import { connect } from 'react-redux'
import dotenv from 'dotenv'
import axios from 'axios'
import { StyledButton } from './StyledButtonComponent'
import { StyledTextField } from './StyledTextField'

const useStyles = makeStyles((theme) => ({
    container: {
      display: 'grid',
      width: 'auto',
      margin: 'auto',
      gridTemplateColumns: `${window.innerWidth < 600 ? '45vw 45vw' : '22.5vw 22.5vw 22.5vw 22.5vw'}`,
    },
    form :{
      margin: '0 0 1vh 0'
    }
  }));

export const RecommendArtist = ({onRecommendArtist, artistState, onGetArtist, onStateChange, onGetTopAlbums, onGetTopTracks}) => {
  const classes = useStyles();
    const [searchText, setSearchText] = useState('');

  const setTextField = (event) => {
    setSearchText(event.target.value)
  }

  const search = async () => {
    try {
      const res = await axios.get(`https://ws.audioscrobbler.com/2.0/?method=artist.getsimilar&artist=${searchText}&api_key=${process.env.REACT_APP_API_KEY}&format=json`)
      if (res) {
        onRecommendArtist(res);
      }
    } catch (error) {
      console.log(error)
    }
  }

  const getArtist = async (mbid) => {
    const res = await axios.get(`https://ws.audioscrobbler.com/2.0/?method=artist.getinfo&mbid=${mbid}&api_key=${process.env.REACT_APP_API_KEY}&format=json`)
    if(res) {
    onGetArtist(res);
    getArtistTopTracks(mbid);
    }
  }
  const getArtistTopTracks = async (mbid) => {
    const res = await axios.get(`https://ws.audioscrobbler.com/2.0/?method=artist.gettoptracks&mbid=${mbid}&api_key=${process.env.REACT_APP_API_KEY}&format=json`)
    if(res) {
     onGetTopTracks(res);
     getArtistTopAlbums(mbid)
    }
  }
  const getArtistTopAlbums = async (mbid) => {
    const res = await axios.get(`https://ws.audioscrobbler.com/2.0/?method=artist.gettopalbums&mbid=${mbid}&api_key=${process.env.REACT_APP_API_KEY}&format=json`)
    if(res) {
     onGetTopAlbums(res);
     onStateChange('ArtistInfo')
    }
  }
  
return (
    <div>
      <form className={classes.form} noValidate autoComplete="off">
       <StyledTextField label="Artist Name" onChange={setTextField}/>
        <StyledButton color="primary" variant="outlined" onClick={search}>
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
            getArtist={getArtist}
            /> 
          )
        }) 
        : null }
      </Grid>
    </div>
)
}

export const ConnectedRecommendArtist = connect(mapStateToProps,mapDispatchToProps)(RecommendArtist)