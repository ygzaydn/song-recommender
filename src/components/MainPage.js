import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux'
import axios from 'axios'
import { mapDispatchToProps, mapStateToProps } from '../store'
import 'fontsource-roboto';
import dotenv from 'dotenv'
import { StyledButton } from './StyledButtonComponent'
import { ConnectedRecommendArtist } from './RecommendArtist'
import { ConnectedArtistInfo } from './ArtistInfo'
import { StyledTextField } from './StyledTextField'

const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
      flexDirection: 'column',
      flexGrow: 1,
      margin: '6vh auto ',
      alignItems: 'center',
      alignContent: 'center',
    },
  }));

const MainPage = ({onStateChange, onRecommendArtist, artistState, renderState}) => {
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
        onStateChange('ArtistRecommend');
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
  <div className={classes.root}>
    <form noValidate autoComplete="off">
      <StyledTextField label="Artist Name" onChange={setTextField}/>
      <StyledButton color="primary" variant="outlined" onClick={search}>
        Search
      </StyledButton>
    </form>
      <div>
      {renderState==='ArtistRecommend'
          ? <ConnectedRecommendArtist />
          : null }
      {renderState==='ArtistInfo'
          ? <ConnectedArtistInfo />
          : null }
      </div>
  </div>
  );
}

export const ConnectedMainPage = connect(mapStateToProps,mapDispatchToProps)(MainPage)