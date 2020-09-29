import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { TextField, } from '@material-ui/core/'
import { connect } from 'react-redux'
import axios from 'axios'
import { mapDispatchToProps, mapStateToProps } from '../store'
import 'fontsource-roboto';
import dotenv from 'dotenv'
import { StyledButton } from './StyledButtonComponent'
import { ConnectedRecommendArtist } from './RecommendArtist'

const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
      flexGrow: 1,
      margin: '1vh 3vw 3vh 3vw ',
      width: '95%',
      alignItems: 'center',
      alignContent: 'center',
    },
    container: {
      display: 'grid',
      gridTemplateColumns: 'auto auto auto',
    }
  }));

  const MainPage = ({onRecommendArtist, artistState}) => {
    const classes = useStyles();
    const [searchText, setSearchText] = useState('');
    const [renderState, setRenderState] = useState('')
  
    const setTextField = (event) => {
      setSearchText(event.target.value)
    }
  
    const search = async () => {
      try {
        const res = await axios.get(`https://ws.audioscrobbler.com/2.0/?method=artist.getsimilar&artist=${searchText}&api_key=${process.env.REACT_APP_API_KEY}&format=json`)
        if (res) {
          onRecommendArtist(res);
          setRenderState('ArtistRecommend')
        }
      } catch (error) {
        console.log(error)
      }
    }

    return (
    <div>
      <form className={classes.root} noValidate autoComplete="off">
        <TextField id="standard-basic" label="Artist Name" color="secondary" onChange={setTextField}/>
        <StyledButton variant="contained" color="primary" onClick={search}>
          Search
        </StyledButton>
      </form>
        <div>
        {renderState==='ArtistRecommend'
            ? <ConnectedRecommendArtist />
            : null }
        </div>
    </div>
    );
  }
  
  export const ConnectedMainPage = connect(mapStateToProps,mapDispatchToProps)(MainPage)