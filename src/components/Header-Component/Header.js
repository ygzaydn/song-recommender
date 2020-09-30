import React from 'react';
import { Breadcrumbs, Link } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import './Header-style.css'

const useStyles = makeStyles((theme) => ({
  ol: {
    justifyContent: 'center',
  },
  root: {
      color: '#E5E5E5'
  }
}));

export const Header = ({handleClick, changeSection, classTrigger}) => {
    const classes = useStyles();
    const headerClassName = classTrigger!=='' ? 'fixed-header' : ''
    return (
        <div className={headerClassName}>
            <Breadcrumbs  classes={{ol: classes.ol}} aria-label="breadcrumb">
                <Link id="header" className={classes.root}color="inherit" href="#" onClick={handleClick('Artist')}>
                    Artists
                </Link>
                <Link id="header" className={classes.root} color="inherit" href="#" onClick={() => {handleClick(); changeSection('Track')}}>
                    Tracks
                </Link>
                <Link id="header" className={classes.root} color="inherit" href="#" onClick={() => {handleClick(); changeSection('Tag')}}>
                    Tags
                </Link>
                <Link id="header" className={classes.root} color="inherit" href="#" onClick={() => {handleClick(); changeSection('Geo')}}>
                    Geo
                </Link>
            </Breadcrumbs>
        </div>  
    )
}