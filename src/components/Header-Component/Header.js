import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import './Header-style.css'
import HomeIcon from '@material-ui/icons/Home';
import IconButton from '@material-ui/core/IconButton';
import { BreadcrumbsComponent } from '../BreadcrumbsComponent'

const useStyles = makeStyles((theme) => ({
  ol: {
    justifyContent: 'center',
  },
  root: {
      color: 'white'
  },
  icon: {
      color: 'white',
      marginRight: 'auto',
      fontSize: '95%',
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
            <BreadcrumbsComponent handleClick={handleClick} classTrigger={''} />
            {headerClassName === 'fixed-header'
            ? <HomeIcon className={classes.blankicon}/>
            : null}
        </div>  
    )
}