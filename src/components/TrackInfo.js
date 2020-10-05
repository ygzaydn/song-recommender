import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Paper, Typography, Collapse, GridList } from '@material-ui/core/'
import 'fontsource-roboto';
import { mapDispatchToProps, mapStateToProps } from '../store'
import { connect } from 'react-redux'
import { BigCard } from './BigCard-Component/BigCard'
import { BigCardwithoutIteration } from './BigCard-Component/BigCardwithoutIteration'
import { ConnectedSmallCard } from './SmallCard'
import { color } from '../colors'
import { StyledTextField } from './StyledTextField'
import { StyledButton } from './StyledButtonComponent'
import { getTrackFromSearchwithNameandArtist } from '../axiosCalls'


const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexGrow: 1,
    margin: '1vh 0.2vw 5vh 0.2vw',
    flexDirection: 'column'
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
    padding: '1%',
    borderRadius: '15px'
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
    width: '100%',
    justifyContent: 'center',
  },
  collapseStyle: {
    border: `2px solid ${color.BLACKCOLOR}`, 
    padding: 0
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    //alignItems: 'center',
    margin: 'auto',
    width: '80vw',
    },

}));

const TrackInfo = ({trackInfoState, onGetTrack, onGetSimilarTrack, onStateChange}) => {
    const classes = useStyles();
    const [checked, setChecked] = useState(false);
    const [trackName, setTrackName] = useState('');
    const [trackArtist, setTrackArtist] = useState('');

    const getTrackName = (event) => {
        setTrackName(event.target.value)
    }

    const getTrackArtist = (event) => {
        setTrackArtist(event.target.value)
    }

    const unCollapse = () => {
        setChecked((prev) => !prev)
    }
    return( 
        <div className={classes.root}>
        {trackInfoState.getTrack&&trackInfoState.getSimilarTrack ?
        <Paper className={classes.paper}>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Paper className={classes.title}>
                        {trackInfoState.getTrack.name}
                    </Paper>
                </Grid>
                <Grid item xs={12} className={classes.collapseStyle}>
                    <Typography variant="subtitle1" className={classes.bioTitle} onClick={unCollapse}>
                        {checked ?  'Click to close!' : 'Click to open Artist Info'}
                    </Typography>
                    <Collapse in={checked} collapsedSize={150}>
                        <Typography className={classes.bio} style={{border:'none'}}>
                        Artist Name: {trackInfoState.getTrack.artist.name}
                        </Typography>
                        <Typography className={classes.bio} style={{border:'none'}}>
                            {trackInfoState.getTrack.artist.url}
                        </Typography>
                    </Collapse>
                </Grid>
                <Grid item xs={6} >
                    <GridList className={classes.gridList} cols={1}>
                        <ConnectedSmallCard clickInfo={false} title="Stats" data1={trackInfoState.getTrack.listeners} data2={trackInfoState.getTrack.playcount} par1="Listeners" par2="Playcount" stats={true}/>
                    </GridList>
                </Grid>
                <Grid item xs={6}>
                    <GridList className={classes.gridList} cols={1}>
                        <ConnectedSmallCard clickInfo={true} title="Top Tags" data1={trackInfoState.getTrack.toptags.tag}/>
                    </GridList>
                </Grid>
                {<Grid item xs={12}>
                    <BigCardwithoutIteration data={trackInfoState.getTrack.album}  title="Album of the song" iterable={false} />
                </Grid>}
                <Grid item xs={12}>
                    <BigCard data={trackInfoState.getSimilarTrack} icon={true} title="Similar Tracks"/>
                </Grid>
            </Grid>
        </Paper>
        :<div>
            <form className={classes.form} noValidate autoComplete="off">
                <StyledTextField label="Track Name" onChange={getTrackName}/>
                <StyledTextField label="Track Artist" onChange={getTrackArtist}/>
                <StyledButton color="primary" variant="outlined" onClick={() => {getTrackFromSearchwithNameandArtist(trackName, trackArtist, onGetTrack,onGetSimilarTrack,onStateChange)}}>
                    Search
                </StyledButton>
            </form>
        </div>}    
        </div>
    )
}

export const ConnectedTrackInfo = connect(mapStateToProps,mapDispatchToProps)(TrackInfo)

