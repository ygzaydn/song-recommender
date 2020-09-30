import React from 'react';
import { Breadcrumbs, Link } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  ol: {
    justifyContent: 'center',
  },
  root: {
      color: 'white'
  },

}));

export const BreadcrumbsComponent = ({handleClick, classTrigger}) => {
    const classes = useStyles();
    return (
        <div className={classTrigger}>
            <Breadcrumbs classes={{ol: classes.ol}} aria-label="breadcrumb">
                <Link id="header" className={classes.root}color="inherit" href="#" onClick={handleClick('Artist')}>
                    Artists
                </Link>
                <Link id="header" className={classes.root} color="inherit" href="#" onClick={handleClick('Track')}>
                    Tracks
                </Link>
                <Link id="header" className={classes.root} color="inherit" href="#" onClick={handleClick('Tag')}>
                    Tags
                </Link>
                <Link id="header" className={classes.root} color="inherit" href="#" onClick={handleClick('Geo')}>
                    Geo
                </Link>
            </Breadcrumbs>
        </div>  
    )
}