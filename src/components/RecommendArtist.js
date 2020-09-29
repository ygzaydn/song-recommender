import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core/'
import 'fontsource-roboto';
import { ListComponent } from './ListComponent'
import { mapDispatchToProps, mapStateToProps } from '../store'
import { connect } from 'react-redux'



const useStyles = makeStyles((theme) => ({

    container: {
      display: 'grid',
      gridTemplateColumns: 'auto auto auto',
    }
  }));

export const RecommendArtist = ({artistState}) => {
    const classes = useStyles();
    return (
        <div>
          <Grid className={classes.container} container spacing={3}>
            {artistState.getSimilar
            ? artistState.getSimilar.map(el => {
              return (
                <ListComponent 
                mbid={el.mbid}
                name={el.name}
                match={el.match}
                /> 
              )
            }) 
            : null }
          </Grid>
        </div>
    )
}

  export const ConnectedRecommendArtist = connect(mapStateToProps,mapDispatchToProps)(RecommendArtist)