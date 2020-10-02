import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux'
import { mapDispatchToProps, mapStateToProps } from '../store'
import 'fontsource-roboto';
import { ConnectedRecommendArtist } from './RecommendArtist'
import { ConnectedArtistInfo } from './ArtistInfo'

const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      flexGrow: 1,
      margin: '6vh auto ',
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