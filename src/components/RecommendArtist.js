import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core/'
import 'fontsource-roboto';
import { ListComponent } from './ListComponent'
import { mapDispatchToProps, mapStateToProps } from '../store'
import { connect } from 'react-redux'
import dotenv from 'dotenv'
import axios from 'axios'

const useStyles = makeStyles((theme) => ({

    container: {
      display: 'grid',
      gridTemplateColumns: 'auto auto auto',
    }
  }));

export const RecommendArtist = ({artistState, onGetArtist, onStateChange, onGetTopAlbums, onGetTopTracks}) => {
  const classes = useStyles();

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
    <div style={{width: '90%', margin:'auto'}}>
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