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
    display: 'grid',
    flexWrap: 'wrap',
    backgroundColor: `${color.BLACKCOLOR}`,
  },
  label: {
    textTransform: 'capitalize',
  },
  elevation1: {
    minHeight: '10vh',
    maxHeight: 250,
    overflow: 'hidden',
    textAlign: 'center',
    '&:hover':{
        backgroundColor: `${color.PINKCOLOR}`,
    },
   },
   name: {
       display: 'grid',
       alignItems: 'center',
       color: `${color.WHITECOLOR}`,
       backgroundColor: `${color.BLACKCOLOR}`,
       height: 100,

   },
   match: {
       display: 'grid',
       alignItems: 'end',
       fontWeight: 'bold',
       color: `${color.WHITECOLOR}`,
       backgroundColor: `${color.PINKCOLOR}`,
       height: 25,

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
                <Typography className={classes.name} variant="h6" display="block">
                {name}
                </Typography>
                <Typography className={classes.match} variant="subtitle2" display="block">
                Match: {parseInt(match*10)}
                </Typography>
            </Paper>
        </Grid>
    )
}