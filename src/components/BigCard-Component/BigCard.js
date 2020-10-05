import React, {useState, useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Typography, GridList, GridListTile } from '@material-ui/core/'
import 'fontsource-roboto';
import { CardComponent } from '../CardComponent'
import { color } from '../../colors'
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import { CardActions } from '@material-ui/core';

const useStyles = makeStyles(() => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        overflow: 'hidden',
        border: 'none',
    },
    title: {
      textAlign: 'center',
      background: `${color.BLACKCOLOR}`,
      color: `${color.WHITECOLOR}`,
      fontWeight: 'bold'
    },
    gridList: {
      flexWrap: 'nowrap',
      maxHeight: 300,
    },

    iconStyle: {
        color: 'white',
    },
    cardActions: {
        background: `${color.BLACKCOLOR}`,
        display: 'grid',
        gridTemplateColumns: '20% 60% 20%',
    }
  }));

export const BigCard = ({ data, title, icon, iterable, playcount}) => {
    const classes = useStyles();
    const [counter,setCounter] = useState(0);
    const [usefulData, setusefulData] = useState({})
    const changeCounter = (input) => setCounter(input);
    useEffect(() => {
        setusefulData(data[counter]);
    },[counter, data])
    return (
        <div className={classes.root}>
        {Object.keys(usefulData).length
        ? <Grid item xs={12}>
                <CardActions className={classes.cardActions}>
                    {counter===0
                    ?  <ChevronLeftIcon className={classes.iconStyle} style={{color:'black'}}fontSize="large"/>
                    :  <ChevronLeftIcon className={classes.iconStyle} fontSize="large" onClick={() => changeCounter(counter-1)}/>}
                    <Typography variant="h5" className={classes.title}> 
                        {title}
                    </Typography>
                    <ChevronRightIcon className={classes.iconStyle} style={{justifySelf:'end'}} fontSize="large" onClick={() => changeCounter(counter+1)}/>
                </CardActions>
                <GridList className={classes.gridList} cols={1}>
                    <GridListTile key={usefulData.name} cols={1} className={classes.gridListTile}>
                        <CardComponent name={usefulData.name} url={usefulData.url} img={usefulData.image[2]["#text"]} artist={usefulData.artist.name} icon={icon} playcount={playcount}/>
                    </GridListTile>
                </GridList>
            </Grid>
        : null}
        </div>
    )
}

