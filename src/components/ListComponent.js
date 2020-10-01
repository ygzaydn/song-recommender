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
    backgroundColor: `${color.YELLOWCOLOR}`,
  },
  label: {
    textTransform: 'capitalize',
  },
  elevation1: {
    minHeight: '10vh',
    maxHeight: 250,
    overflow: 'hidden',
    textAlign: 'center',
    fontWeight: 'bold',
    color: `${color.YELLOWCOLOR}`,
    '&:hover':{
        border: `2px solid ${color.PINKCOLOR}`,
    },
   },
   name: {
       display: 'grid',
       alignItems: 'center',
       color: `${color.WHITECOLOR}`,
       backgroundColor: `${color.BLACKCOLOR}`,

   },
   match: {
       display: 'grid',
       alignItems: 'end',
       fontWeight: 'bold',
       color: `${color.BLACKCOLOR}`,
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