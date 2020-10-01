import React from 'react';
import { Breadcrumbs, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import { color } from '../colors'

const useStyles = makeStyles(() => ({
  ol: {
    justifyContent: 'center',
  },
  root: {
      color: 'white',
      '&:hover': {
        textDecoration: 'underline',
    }
  },
  underlineTypo: {
    textDecoration: 'underline',
    color: `${color.PINKCOLOR}`,
  }
}));

export const BreadcrumbsComponent = ({onStateChange, handleClick, classTrigger}) => {
    const classes = useStyles();
    console.log(classes);
    return (
        <div className={classTrigger}>
            <Breadcrumbs classes={{ol: classes.ol}} aria-label="breadcrumb">
                <Typography id="header" className={classes.root} onClick={handleClick('Artist','ArtistRecommend')}> 
                    Artists
                </Typography>
                <Typography id="header1" className={classes.root} color="inherit" href="#" onClick={handleClick('Track')}>
                    Tracks
                </Typography>
                <Typography id="header2" className={classes.root} color="inherit" href="#" onClick={handleClick('Tag')}>
                    Tags
                </Typography>
                <Typography id="header3" className={classes.root} color="inherit" href="#" onClick={handleClick('Geo')}>
                    Geo
                </Typography>
            </Breadcrumbs>
        </div>  
    )
}