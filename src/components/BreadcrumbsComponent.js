import React, {useState,useEffect} from 'react';
import { Breadcrumbs, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import { color } from '../colors'
import { connect } from 'react-redux'
import { mapDispatchToProps, mapStateToProps } from '../store'

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
      '&:hover': {
        textDecoration: 'underline',
    },
    textDecoration: 'underline',
    color: `${color.PINKCOLOR}`,
  }
}));

const BreadcrumbsComponent = ({onStateChange, handleClick, classTrigger, renderState}) => {
    const classes = useStyles();
    const [classnames, setClassnames] = useState();
    useEffect(() => {
        setClassnames(renderState)
    },[renderState])
    return (
        <div className={classTrigger}>
            <Breadcrumbs classes={{ol: classes.ol}} aria-label="breadcrumb">
                <Typography id="header" className={classnames==='ArtistRecommend'? classes.underlineTypo: classes.root} onClick={handleClick('Artist','ArtistRecommend')}> 
                    Artists
                </Typography>
                <Typography id="header1" className={classnames==='TrackSearch'? classes.underlineTypo: classes.root} color="inherit" href="#" onClick={handleClick('Track','TrackSearch')}>
                    Tracks
                </Typography>
                <Typography id="header2" className={classnames==='TagRecommend'? classes.underlineTypo: classes.root} color="inherit" href="#" onClick={handleClick('Tag','TagRecommend')}>
                    Tags
                </Typography>
                <Typography id="header3" className={classnames==='GeoRecommend'? classes.underlineTypo: classes.root} color="inherit" href="#" onClick={handleClick('Geo','GeoRecommend')}>
                    Geo
                </Typography>
            </Breadcrumbs>
        </div>  
    )
}

export const ConnectedBreadcrumbsComponent = connect(mapStateToProps,mapDispatchToProps)(BreadcrumbsComponent)
