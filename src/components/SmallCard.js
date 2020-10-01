import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { StyledButton } from './StyledButtonComponent'
import { color } from '../colors';
import { connect } from 'react-redux';
import { mapDispatchToProps, mapStateToProps } from '../store'
import axios from 'axios'
import dotenv from 'dotenv'

const useStyles = makeStyles({
  root: {
    maxWidth: '40vw',
    minHeight: '270px',
    backgroundColor: `${color.PURPLECOLOR}`,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: `${color.WHITECOLOR}`,
    textAlign: 'center',
    border: `solid 2px ${color.WHITECOLOR}`,
  },
  pos: {
    color: `${color.WHITECOLOR}`,
    textDecoration : 'underline',
    fontSize: 20,
  },
  moreInfo: {
    color: `${color.WHITECOLOR}`,
    fontSize: 16,
  }
});

const SmallCard = ({artistState, onGetArtist, onStateChange, onGetTopAlbums, onGetTopTracks, title, data1, data2, par1, par2, name, clickInfo}) => {
  const classes = useStyles();

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
      <CardContent>
        <Typography className={classes.title} gutterBottom>
          {title}
        </Typography>
        <Typography className={classes.pos} >
          {par1}
        </Typography>
        <Typography  className={classes.moreInfo} >
          {data1}
        </Typography>
        {clickInfo
        ? <StyledButton style={{marginTop: '2vh'}}onClick={()=> getArtist(name)}>
            Change Artist
          </StyledButton>
        : <div>
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