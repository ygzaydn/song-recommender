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

  return (
    <div className={classes.root}>
      {renderState==='ArtistRecommend'
          ? <ConnectedRecommendArtist />
          : null }
      {renderState==='ArtistInfo'
          ? <ConnectedArtistInfo />
          : null }
    </div>
  );
}

export const ConnectedMainPage = connect(mapStateToProps,mapDispatchToProps)(MainPage)