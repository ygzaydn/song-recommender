import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux'
import { mapDispatchToProps, mapStateToProps } from '../store'
import 'fontsource-roboto';
import { ConnectedRecommendArtist } from './RecommendArtist'
import { ConnectedArtistInfo } from './ArtistInfo'
import { ConnectedRecommendTrack } from './RecommendTrack'
import { ConnectedTrackInfo } from './TrackInfo'
import { ConnectedTagInfo } from './TagInfo'

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

const MainPage = ({renderState}) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      {renderState==='ArtistRecommend'
          ? <ConnectedRecommendArtist />
          : null }
      {renderState==='ArtistInfo'
          ? <ConnectedArtistInfo />
          : null }
      {renderState==='TrackSearch'
          ? <ConnectedRecommendTrack />
          : null }
      {renderState==='TrackInfo'
          ? <ConnectedTrackInfo />
          : null }
      {renderState==='TagInfo'
          ? <ConnectedTagInfo />
          : null }
    </div>
  );
}

export const ConnectedMainPage = connect(mapStateToProps,mapDispatchToProps)(MainPage)