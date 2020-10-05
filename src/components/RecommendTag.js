import React, { useEffect } from 'react';
import { connect } from 'react-redux'
import { mapDispatchToProps, mapStateToProps } from '../store'
import { Grid } from '@material-ui/core/'
import { ListComponent } from './ListComponent'
import { getTopTags, getTagInfoFromName } from '../axiosCalls'
import { geoTopArtistStyle } from '../themes'


const RecommendTag = ({tagState, onGetTopTags, onGetTopAlbumsTag, onGetTopArtistTag ,onGetTag, onGetTopTracksTag, onStateChange}) => {
    const classes = geoTopArtistStyle(window.innerWidth);
    useEffect(() => {
        getTopTags(onGetTopTags, onStateChange)
    }, [])
    return (
        <div>
            <Grid className={classes.container} container spacing={3}>
                {tagState.getTopTags
                ? tagState.getTopTags.map(el => {
                const handleClickFunction = () => getTagInfoFromName(el.name, onGetTag, onGetTopAlbumsTag, onGetTopArtistTag, onGetTopTracksTag, onStateChange)
                return (
                    <ListComponent 
                    name={el.name}
                    count={el.count}
                    handleClick={handleClickFunction}
                    /> 
                )
                }) 
                : null }
          </Grid>
        </div>
    )
}

export const ConnectedRecommendTag = connect(mapStateToProps,mapDispatchToProps)(RecommendTag);