import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Typography, GridList, GridListTile } from '@material-ui/core/'
import 'fontsource-roboto';
import { CardComponent } from './CardComponent'

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        overflow: 'hidden',
        backgroundColor: theme.palette.background.paper,
        marginTop: '2%'
    },
    paper: {
      padding: theme.spacing(2),
      margin: 'auto',
    },
    title: {
      maxWidth: 'inherit',
      height: 'auto',
      textAlign: 'center'
    },
    bio: {
      textAlign: 'center'
    },
    gridList: {
      flexWrap: 'nowrap',
      maxHeight: 300,
    },
    img: {
        maxWidth: 300,
        maxHeight: 300
    },
    gridListTile: {
        maxWidth:700
    }
  }));

export const Best = ({data, title}) => {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <Grid item xs={12}>
                <Typography variant="h5" className={classes.bio}> 
                    {title}
                </Typography>
                <GridList className={classes.gridList} cols={1}>
                    {data.map((el) => (
                        <GridListTile key={el.url} cols={1} className={classes.gridListTile}>
                            <CardComponent name={el.name} artist={el.artist.name} url={el.url} playcount={el.playcount} img={el.image[2]["#text"]}/>
                        </GridListTile>
                    ))}
                </GridList>
            </Grid>
        </div>
    )
}


