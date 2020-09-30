import React from 'react';
import { Breadcrumbs, Link } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import './Header-style.css'
import HomeIcon from '@material-ui/icons/Home';
import IconButton from '@material-ui/core/IconButton';

const useStyles = makeStyles((theme) => ({
  ol: {
    justifyContent: 'center',
  },
  root: {
      color: 'white'
  },
  icon: {
      color: 'white',
      marginRight: 'auto'
  },
  blankicon: {
      color: 'black',
      marginLeft: 'auto'
  }
}));

export const Header = ({handleClick, changeSection, classTrigger}) => {
    const classes = useStyles();
    const headerClassName = classTrigger!=='' ? 'fixed-header' : '';
    return (
        <div className={headerClassName}>
            {headerClassName === 'fixed-header'
            ? <IconButton className={classes.icon} href={`${window.location.href.split('#')[0]}`}>
                <HomeIcon />
              </IconButton>
            : null}
            <Breadcrumbs classes={{ol: classes.ol}} aria-label="breadcrumb">
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
            {headerClassName === 'fixed-header'
            ? <HomeIcon className={classes.blankicon}/>
            : null}
        </div>  
    )
}