import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { TextField, } from '@material-ui/core/'
import 'fontsource-roboto';

const useStyles = makeStyles(() => ({
    searchField: {
      background: 'white',
      color: 'white',
      borderRadius: 3,
      border: 0,
    }
}));

export const StyledTextField = ({label, onChange}) => {
    const classes = useStyles();
    return (
        <TextField id="standard-basic" className={classes.searchField} color={"secondary" }defaultValue={label} variant="outlined" onChange={onChange}/>
    )
}