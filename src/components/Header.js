import React from 'react';
import { Breadcrumbs, Link } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  ol: {
    margin: '2%',
    justifyContent: 'center',
    fontSize: '3vw',
  },
}));

export const Header = ({handleClick}) => {
    const classes = useStyles();
    return (
    <Breadcrumbs  classes={{ol: classes.ol}} aria-label="breadcrumb">
        <Link id="header" color="inherit" href="#" onClick={handleClick}>
            Artists
        </Link>
        <Link id="header" color="inherit" href="#" onClick={handleClick}>
            Tracks
        </Link>
        <Link id="header" color="inherit" href="#" onClick={handleClick}>
            Tags
        </Link>
        <Link id="header" color="inherit" href="#" onClick={handleClick}>
            Geo
        </Link>
    </Breadcrumbs>
    )
}