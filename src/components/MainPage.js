import React from 'react';
import { connect } from 'react-redux'
import { mapDispatchToProps, mapStateToProps } from '../store'
import 'fontsource-roboto';
import { ConnectedRecommendArtist } from './RecommendArtist'
import { ConnectedArtistInfo } from './ArtistInfo'
import { ConnectedRecommendTrack } from './RecommendTrack'
import { ConnectedTrackInfo } from './TrackInfo'
import { ConnectedTagInfo } from './TagInfo'
import { ConnectedRecommendTag } from './RecommendTag'
import { ConnectedGeoTopArtist } from './GeoTopArtist'
import { ConnectedGeoTopTrack } from './GeoTopTrack'
import { mainPageStyle } from '../themes'

const MainPage = ({renderState}) => {
  const classes = mainPageStyle();

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
      {renderState==='TagRecommend'
          ? <ConnectedRecommendTag />
          : null}
      {renderState==='GeoTopArtist'
          ? <ConnectedGeoTopArtist />
          : null}
      {renderState==='GeoTopTrack'
          ? <ConnectedGeoTopTrack />
          : null}
    </div>
  );
}

export const ConnectedMainPage = connect(mapStateToProps,mapDispatchToProps)(MainPage)