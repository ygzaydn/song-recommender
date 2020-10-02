import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { color } from '../colors';
import { connect } from 'react-redux';
import { mapDispatchToProps, mapStateToProps } from '../store'
import axios from 'axios'
import dotenv from 'dotenv'
import ChevronRightIcon from '@material-ui/icons/ChevronRight';

const useStyles = makeStyles({
  root: {
    width: '40vw',
    minHeight: '270px',
    padding: 0,
    borderColor: `${color.BLACKCOLOR}`,
    backgroundColor: `${color.YELLOWCOLOR}`,
    
  },
  rootTitle1: {
    padding: 0,
    borderColor: `${color.BLACKCOLOR}`,
    display: 'grid',
    height: '100%',
    gridTemplateRows: '15% 15% 15% 15% 15% 15%',
  },
  rootTitle2: {
    padding: 0,
    borderColor: `${color.BLACKCOLOR}`,
    display: 'grid',
    height: '100%',
    gridTemplateRows: '15% 65%',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: `${color.WHITECOLOR}`,
    textAlign: 'center',
    backgroundColor: `${color.BLACKCOLOR}`,
  },
  pos: {
    color: `${color.BLACKCOLOR}`,
    textDecoration : 'underline',
    fontSize: 20,
  },
  moreInfo: {
    color: `${color.BLACKCOLOR}`,
    fontSize: 16,
    textAlign:'center'
  },
  similarArtistLine: {
    display:'flex',
    justifyContent:'space-between'
  }
});

const SmallCard = ({artistState, onGetArtist, onStateChange, onGetTopAlbums, onGetTopTracks, title, data1, data2, par1, par2, name, clickInfo}) => {
  const classes = useStyles();
  const classNameForContent = clickInfo? classes.rootTitle1 : classes.rootTitle2;

  const getArtist = async (name) => {
    const res = await axios.get(`https://ws.audioscrobbler.com/2.0/?method=artist.getinfo&artist=${name}&api_key=${process.env.REACT_APP_API_KEY}&format=json`)
    if(res) {
    onGetArtist(res);
    getArtistTopTracks(name);
    }
  }
  const getArtistTopTracks = async (name) => {
    const res = await axios.get(`https://ws.audioscrobbler.com/2.0/?method=artist.gettoptracks&artist=${name}&api_key=${process.env.REACT_APP_API_KEY}&format=json`)
    if(res) {
     onGetTopTracks(res);
     getArtistTopAlbums(name)
    }
  }
  const getArtistTopAlbums = async (name) => {
    const res = await axios.get(`https://ws.audioscrobbler.com/2.0/?method=artist.gettopalbums&artist=${name}&api_key=${process.env.REACT_APP_API_KEY}&format=json`)
    if(res) {
     onGetTopAlbums(res);
     onStateChange('ArtistInfo')
    }
  }

  return (
    <Card className={classes.root} variant="outlined" >
      <CardContent className={classNameForContent}>
        <Typography className={classes.title} gutterBottom>
          {title}
        </Typography>
        {clickInfo
        ? data1.map(el => {
          return (
            <div className={classes.similarArtistLine}>
          <Typography style={{alignSelf:'center'}}>
            {el.name}
          </Typography>
          <ChevronRightIcon style={{alignSelf:'center'}} onClick={()=> getArtist(el.name)}/>
            </div>
          )
        })
        : <div style={{alignSelf:'center', justifySelf:'center'}}>
        <Typography className={classes.pos} >
          {par1}
        </Typography>
        <Typography  className={classes.moreInfo} >
          {data1}
        </Typography>
        <Typography className={classes.pos} >
          {par2}
        </Typography> 
        <Typography className={classes.moreInfo} >
          {data2}
        </Typography>
        </div>
        }
      </CardContent>
    </Card>
  );
}

export const ConnectedSmallCard = connect(mapStateToProps,mapDispatchToProps)(SmallCard)