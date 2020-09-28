import React from 'react';
import { makeStyles } from '@material-ui/core/styles'
import { Grid, Paper } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  root: {
    borderRadius: 3,
    border: 0,
    height: 48,
    padding: '0 30px',
    display: 'flex',
    alignItems: 'center',
    alignContent: 'center',
    margin: '1% 5%'
  },
  label: {
    textTransform: 'capitalize',
  },
  paper: {
    alignItems: 'center',
    alignContent: 'center',
    color: theme.palette.text.secondary,
    height: '50px',
    overflow: 'hidden'
  },
}));

export const ListComponent = ({mbid, name}) => {
    const classes = useStyles();
    return (
        <Grid key={mbid} item xs={3}>
            <Paper 
                key={mbid} 
                elevation={3} 
                classes={{
                    root: classes.root,
                    paper: classes.paper
                }}
            >
            {name}
            </Paper>
        </Grid>
    )
}