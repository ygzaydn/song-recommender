import React from 'react';
import { makeStyles } from '@material-ui/core/styles'
import { Grid, Paper, Typography } from '@material-ui/core'
import 'fontsource-roboto';
import { color } from '../colors'

const useStyles = makeStyles((theme) => ({
  root: {
    borderRadius: 3,
    border: 0,
    padding: '5%',
    display: 'flex',
    flexWrap: 'wrap',
    backgroundColor: `${color.PINKCOLOR}`,
  },
  label: {
    textTransform: 'capitalize',
  },
  elevation1: {
    flexDirection: 'column',
    justifyContent: 'center',
    minHeight: '10vh',
    maxHeight: 250,
    overflow: 'hidden',
    textAlign: 'center',
    fontWeight: 'bold',
    color: `${color.WHITECOLOR}`,
    '&:hover':{
        border: `2px solid ${color.PINKCOLOR}`,
    },
   }
}));



export const ListComponent = ({mbid, name, match, getArtist}) => {
    
    const classes = useStyles();
    return (
        <Grid key={mbid} item xs={12}>
            <Paper
                key={name} 
                elevation={1} 
                classes={{
                    root: classes.root,
                    elevation1: classes.elevation1
                }}
                color="secondary"
                onClick={() => getArtist(mbid)}
            >
                <Typography variant="h6" display="block">
                {name}
                </Typography>
                <Typography variant="subtitle2" display="block">
                Match: {parseInt(match*10)}
                </Typography>
            </Paper>
        </Grid>
    )
}