import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Paper, Typography, Collapse } from '@material-ui/core/'
import 'fontsource-roboto';
import { mapDispatchToProps, mapStateToProps } from '../store'
import { connect } from 'react-redux'
import dotenv from 'dotenv'
import axios from 'axios'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    margin: 'auto',
    maxWidth: 750,
  },
  title: {
    maxWidth: 750,
    height: 'auto',
    textAlign: 'center'
  }
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
                        <Typography className={classes.title}>
                            Click here for bio!
                        </Typography>
                        <Collapse in={checked} collapsedSize={150}>
                            <Typography className={classes.title}>
                                {artistState.getArtist.bio.content.split('<a hr')[0]}
                            </Typography>
                        </Collapse>
                    </Grid>
                </Grid>
            </Paper>
        </div>
    )
}

export const ConnectedArtistInfo = connect(mapStateToProps,mapDispatchToProps)(ArtistInfo)