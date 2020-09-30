import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Paper, Typography, Collapse, GridList, GridListTile } from '@material-ui/core/'
import 'fontsource-roboto';
import { mapDispatchToProps, mapStateToProps } from '../store'
import { connect } from 'react-redux'
import { BigCard } from './BigCard'
import { SmallCard } from './SmallCard'
import { color } from '../colors'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexGrow: 1,
    margin: '1vh 0.2vw 5vh 0.2vw'
  },
  paper: {
    padding: theme.spacing(2),
    margin: 'auto',
    maxWidth: '90vw',
    background: `${color.PINKCOLOR}`,
  },
  title: {
    maxWidth: 'inherit',
    height: 'auto',
    textAlign: 'center',
    color: `${color.WHITECOLOR}`,
    fontWeight: 'bold',
    fontSize: '150%',
    background: `${color.BLACKCOLOR}`,
  },
  bioTitle: {
    maxWidth: 'inherit',
    height: 'auto',
    textAlign: 'center',
    color: `${color.WHITECOLOR}`,
    background: `${color.BLACKCOLOR}`, 
  },
  bio: {
    textAlign: 'center',
    color: `${color.BLACKCOLOR}`,
    border: `2px solid ${color.BLACKCOLOR}`,
    padding: '1%',
    background: `${color.YELLOWCOLOR}`,
  },
  gridList: {
    flexWrap: 'nowrap',
    padding: 0,
    height: '100%',
    width: '100%'
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
                        <Typography variant="subtitle1" className={classes.bioTitle}>
                            {checked ?  'Click to close bio!' : 'Click here for bio!'}
                        </Typography>
                        <Collapse in={checked} collapsedSize={150}>
                            <Typography className={classes.bio}>
                                {artistState.getArtist.bio.content.split('<a hr')[0]}
                            </Typography>
                        </Collapse>
                    </Grid>
                    <Grid item xs={6}>
                        <SmallCard title="Stats" data1={artistState.getArtist.stats.listeners} data2={artistState.getArtist.stats.playcount} par1="Listeners" par2="Playcount"/>
                    </Grid>
                    <Grid item xs={6}>
                        <GridList className={classes.gridList} cols={1}>
                            {artistState.getArtist.similar.artist.map((el) => (
                                <GridListTile key={el.url} style={{height:'100%'}}cols={1}>
                                    <SmallCard title="Similar Artists" data1={el.name} data2="Click for more info!" par1="Name" par2="-"/>
                                </GridListTile>
                            ))}
                        </GridList>
                    </Grid>
                    <BigCard data={artistState.getTopTracks.track} title="Best Songs"/>
                    <BigCard data={artistState.getTopAlbums.album} title="Best Albums"/>
                </Grid>
            </Paper>
        </div>
    )
}

export const ConnectedArtistInfo = connect(mapStateToProps,mapDispatchToProps)(ArtistInfo)