import React from 'react';
import { Breadcrumbs, Link, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  ol: {
    margin: '5%',
    justifyContent: 'center',
  },
}));

export const Header = ({handleClick}) => {
    const classes = useStyles();
    return (
    <Breadcrumbs classes={{ol: classes.ol}} aria-label="breadcrumb">
        <Link color="inherit" href="#" onClick={handleClick}>
            Material-UI
        </Link>
        <Link color="inherit" href="#" onClick={handleClick}>
            Core
        </Link>
        <Typography color="textPrimary" href="#">Breadcrumb</Typography>
    </Breadcrumbs>
    )
}