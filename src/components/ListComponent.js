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
    margin: '1% 5%',
  },
  label: {
    textTransform: 'capitalize',
  },
  elevation1: {
    alignItems: 'center',
    alignContent: 'center',
    color: theme.palette.text.secondary,
    height: '50px',
    overflow: 'hidden',
    '&:hover':{
        border: "2px solid #000000",
        color: "#000000"
        /*theme.transitions.create("all", {
            easing: theme.transitions.easing.sharp, 
            duration: theme.transitions.duration.leavingScreen
        })*/
    },
   }
}));

export const ListComponent = ({mbid, name}) => {
    const classes = useStyles();
    return (
        <Grid key={mbid} item xs={3}>
            <Paper 
                key={mbid} 
                elevation={1} 
                classes={{
                    root: classes.root,
                    elevation1: classes.elevation1
                }}
                color="secondary"
            >
            {name}
            </Paper>
        </Grid>
    )
}