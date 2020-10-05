import React, { useEffect } from 'react';
import { connect } from 'react-redux'
import { mapDispatchToProps, mapStateToProps } from '../store'
import { makeStyles } from '@material-ui/core/styles'
import { Grid } from '@material-ui/core/'
import { ListComponent } from './ListComponent'
import { getTopTags, getTagInfoFromName } from '../axiosCalls'

const useStyles = makeStyles(() => ({
    form: {
      display: 'flex',
      flexDirection: 'column',
      //alignItems: 'center',
      margin: 'auto',
      width: '80vw',
    },
    container: {
      display: 'grid',
      width: 'auto',
      margin: 'auto',
      gridTemplateColumns: `${window.innerWidth < 600 ? '45vw 45vw' : '22.5vw 22.5vw 22.5vw 22.5vw'}`,
    }

}))
//trackInfoState.getRecommendedTrack

const RecommendTag = ({tagState, onGetTopTags, onGetTopAlbumsTag, onGetTopArtistTag ,onGetTag, onGetTopTracksTag, onStateChange}) => {
    const classes = useStyles();
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