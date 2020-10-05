import React from 'react';
import { TextField } from '@material-ui/core/'
import 'fontsource-roboto';
import { styledTextFieldStyle } from '../themes'

export const StyledTextField = ({label, onChange}) => {
    const classes = styledTextFieldStyle();
    return (
        <TextField id="standard-basic" className={classes.searchField} color={"secondary" } label={label} variant="outlined" variant="filled" onChange={onChange}/>
    )
}