
import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid';
import { connect } from 'react-redux'
import axios from 'axios'
import { mapDispatchToProps, mapStateToProps } from './store'
import './App.css';
import 'fontsource-roboto';
import dotenv from  'dotenv'
import { ListComponent } from './components/ListComponent'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    '& > *': {
      margin: theme.spacing(1),
      width: '95%',
    },
  },
  paper: {
    padding: theme.spacing(1),
    alignItems: 'center',
    alignContent: 'center',
    color: theme.palette.text.secondary,
    height: '50px',
    overflow: 'hidden'
  },
}));

const App = ({onRecommendSong, recommendSongState}) => {
  const classes = useStyles();
  const [searchText, setSearchText] = useState('');

  const setTextField = (event) => {
    setSearchText(event.target.value)
  }

  const search = async () => {
    const res = await axios.get(`https://ws.audioscrobbler.com/2.0/?method=artist.getsimilar&artist=${searchText}&api_key=${process.env.REACT_APP_API_KEY}&format=json`)
    if (res) onRecommendSong(res);
  }

  return (
    <div>
    <form className={classes.root} noValidate autoComplete="off">
      <TextField id="standard-basic" label="Standard" onChange={setTextField}/>
      <Button variant="contained" color="primary" onClick={search}>
        Search
      </Button>
    </form>
      <div >
      <Grid container spacing={3}>
        {recommendSongState.map(el => {
          return (
            <ListComponent 
            mbid={el.mbid}
            name={el.name}
            />
          )
        })}
      </Grid>
    </div>
  </div>
  );
}

export const ConnectedApp = connect(mapStateToProps,mapDispatchToProps)(App)


