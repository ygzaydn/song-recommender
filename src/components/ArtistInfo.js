import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Paper, Typography, Collapse, GridList, GridListTile } from '@material-ui/core/'
import 'fontsource-roboto';
import { mapDispatchToProps, mapStateToProps } from '../store'
import { connect } from 'react-redux'
import { Best } from './Best'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexGrow: 1,
    background: '#E5E5E5',
    marginBottom: '5vh'
  },
  paper: {
    padding: theme.spacing(2),
    margin: 'auto',
    maxWidth: '90vw',
    background: '#E5E5E5',
  },
  title: {
    maxWidth: 'inherit',
    height: 'auto',
    textAlign: 'center'
  },
  bio: {
    textAlign: 'left'
  },
  gridList: {
    flexWrap: 'nowrap',
    maxHeight: 300
  },

}));

const ArtistInfo = ({artistState, renderState}) => {
    const classes = useStyles();
    const [checked, setChecked] = useState(false);
    const unCollapse = () => {
        setChecked((prev) => !prev)
    }
    return(
        <div className={classes.root}>
            <Paper className={classes.paper}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Paper className={classes.title}>
                            {artistState.getArtist.name}
                        </Paper>
                    </Grid>
                    <Grid item xs={12} onClick={unCollapse}>
                        <Typography variant="subtitle1" className={classes.title}>
                            {checked ?  'Click to close bio!' : 'Click here for bio!'}
                        </Typography>
                        <Collapse in={checked} collapsedSize={150}>
                            <Typography className={classes.bio}>
                                {artistState.getArtist.bio.content.split('<a hr')[0]}
                            </Typography>
                        </Collapse>
                    </Grid>
                    <Grid item xs={6}>
                        <Paper className={classes.title}>
                            <Typography variant="subtitle1" className={classes.title}> Stats </Typography>
                            <Typography variant="subtitle2" className={classes.bio}> 
                                Listeners: {artistState.getArtist.stats.listeners} 
                            </Typography>
                            <Typography variant="subtitle2" className={classes.bio}> 
                                Playcount: {artistState.getArtist.stats.playcount} 
                            </Typography>
                        </Paper>
                    </Grid>
                    <Grid item xs={6}>
                        <Typography variant="subtitle2" className={classes.bio}> 
                           Similar Artists
                        </Typography>
                        <GridList className={classes.gridList} cols={1}>
                            {artistState.getArtist.similar.artist.map((el) => (
                                <GridListTile key={el.url} cols={1}>
                                    <Typography variant="subtitle2" className={classes.bio}> 
                                        Name: {el.name} 
                                    </Typography>
                                    <Typography variant="subtitle2" className={classes.bio}> 
                                        Url: {el.url} 
                                    </Typography>
                                </GridListTile>
                            ))}
                        </GridList>
                    </Grid>
                    <Best data={artistState.getTopTracks.track} title="Best Songs"/>
                    <Best data={artistState.getTopAlbums.album} title="Best Albums"/>
                </Grid>
            </Paper>
        </div>
    )
}

export const ConnectedArtistInfo = connect(mapStateToProps,mapDispatchToProps)(ArtistInfo)