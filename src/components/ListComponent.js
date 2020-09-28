import React from 'react';
import { makeStyles } from '@material-ui/core/styles'
import { Grid, Paper, Typography } from '@material-ui/core'
import 'fontsource-roboto';

const useStyles = makeStyles((theme) => ({
  root: {
    borderRadius: 3,
    border: 0,
    padding: '5%',
    display: 'flex',
    flexWrap: 'wrap',
    margin: '1% 5%',
  },
  label: {
    textTransform: 'capitalize',
  },
  elevation1: {
    flexDirection: 'column',
    color: theme.palette.text.secondary,
    maxHeight: '150px',
    overflow: 'hidden',
    textAlign: 'center',
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

export const ListComponent = ({mbid, name, match}) => {
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
                <Typography variant="subtitle1" display="block" wrap={false}>
                {name}
                </Typography>
                <Typography variant="subtitle2" display="block">
                Match: {match}
                </Typography>
            </Paper>
        </Grid>
    )
}