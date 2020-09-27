import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import { connect } from 'react-redux'
import axios from 'axios'
import { mapDispatchToProps, mapStateToProps } from './store'
import './App.css';
import 'fontsource-roboto';
import { API_KEY } from './env-variables'

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
}));

const App = ({onRecommendSong}) => {
  const classes = useStyles();
  const [searchText, setSearchText] = useState('');

  const setTextField = (event) => {
    setSearchText(event.target.value)
  }

  const search = async () => {
    const res = await axios.get(`https://ws.audioscrobbler.com/2.0/?method=track.getsimilar&artist=cher&track=${searchText}&api_key=${API_KEY}&format=json`)
    onRecommendSong(res);
  }

  return (
    <form className={classes.root} noValidate autoComplete="off">
      <TextField id="standard-basic" label="Standard" onChange={setTextField}/>
      <TextField id="filled-basic" label="Filled" variant="filled" />
      <TextField id="outlined-basic" label="Outlined" variant="outlined" />
      <Button variant="contained" color="primary" onClick={search}>
        Primary
      </Button>
  </form>
  );
}

export const ConnectedApp = connect(mapStateToProps,mapDispatchToProps)(App)


