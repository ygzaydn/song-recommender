import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Typography, GridList, GridListTile } from '@material-ui/core/'
import 'fontsource-roboto';
import { CardComponent } from './CardComponent'
import { color } from '../colors'

const useStyles = makeStyles(() => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        overflow: 'hidden',
        border: 'none',

    },
    bio: {
      textAlign: 'center',
      background: `${color.BLACKCOLOR}`,
      color: `${color.WHITECOLOR}`,
      fontWeight: 'bold'
    },
    gridList: {
      flexWrap: 'nowrap',
      maxHeight: 300,
    },
    gridListTile: {
        maxWidth:700
    }
  }));

export const BigCard = ({data, title, icon}) => {
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
                            <CardComponent name={el.name} artist={el.artist.name} url={el.url} playcount={el.playcount} img={el.image[2]["#text"]} icon={icon}/>
                        </GridListTile>
                    ))}
                </GridList>
            </Grid>
        </div>
    )
}


