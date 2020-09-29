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

export const Header = ({handleClick, changeSection}) => {
    const classes = useStyles();
    return (
    <Breadcrumbs  classes={{ol: classes.ol}} aria-label="breadcrumb">
        <Link id="header" color="inherit" href="#" onClick={handleClick('Artist')}>
            Artists
        </Link>
        <Link id="header" color="inherit" href="#" nClick={() => {handleClick(); changeSection('Track')}}>
            Tracks
        </Link>
        <Link id="header" color="inherit" href="#" nClick={() => {handleClick(); changeSection('Tag')}}>
            Tags
        </Link>
        <Link id="header" color="inherit" href="#" nClick={() => {handleClick(); changeSection('Geo')}}>
            Geo
        </Link>
    </Breadcrumbs>
    )
}