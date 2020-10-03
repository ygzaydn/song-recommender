import React, {useState,useEffect} from 'react';
import { Breadcrumbs, Typography, Menu, MenuItem, ListItemIcon, ListItemText} from '@material-ui/core'
import { makeStyles, withStyles } from '@material-ui/core/styles';
import { color } from '../colors'
import { connect } from 'react-redux'
import { mapDispatchToProps, mapStateToProps } from '../store'
import AlbumSharpIcon from '@material-ui/icons/AlbumSharp';
import LibraryMusicIcon from '@material-ui/icons/LibraryMusic';

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
  },
  menuStyle: {
      background: `${color.BLACKCOLOR}`,
      color: `${color.WHITECOLOR}`,
      border: `2px solid ${color.PINKCOLOR}`
  },
  padding: {
    paddingTop:'0',
    paddingBottom: '0'
  },
}));

const BreadcrumbsComponent = ({onStateChange, handleClick, classTrigger, renderState}) => {

    const classes = useStyles();
    const [classnames, setClassnames] = useState();
    const [anchorEl, setAnchorEl] = useState(null);
    const handleClickMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    useEffect(() => {
        setClassnames(renderState)
    },[renderState])
//onClick={handleClick('Track','TrackSearch')}

    return (
        <div className={classTrigger}>
            <Breadcrumbs classes={{ol: classes.ol}} aria-label="breadcrumb">
                <Typography id="header" className={classnames==='ArtistRecommend'? classes.underlineTypo: classes.root} onClick={handleClick('Artist','ArtistRecommend')}> 
                    Artists
                </Typography>
                <Typography id="header1" className={classnames==='TrackSearch'? classes.underlineTypo: classes.root} aria-controls="simple-menu" color="inherit" onClick={handleClickMenu}>
                    Tracks
                </Typography>
                <Typography id="header2" className={classnames==='TagRecommend'? classes.underlineTypo: classes.root} color="inherit" href="#" onClick={handleClick('Tag','TagRecommend')}>
                    Tags
                </Typography>
                <Typography id="header3" className={classnames==='GeoRecommend'? classes.underlineTypo: classes.root} color="inherit" href="#" onClick={handleClick('Geo','GeoRecommend')}>
                    Geo
                </Typography>
            </Breadcrumbs>
            
            <Menu
                    id="simple-menu"
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={handleClose}
                    getContentAnchorEl={null}
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'center',
                    }}
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'center',
                    }}
                    className={classes.padding}
                >   
                <div className={classes.menuStyle} >
                    <MenuItem>
                        <ListItemIcon>
                            <AlbumSharpIcon style={{color:'white'}} />
                        </ListItemIcon>
                        <ListItemText primary="Drafts" />
                    </MenuItem>
                    <MenuItem onClick={handleClick('Track','TrackSearch')} >
                        <ListItemIcon>
                            <LibraryMusicIcon style={{color:'white'}}  />
                        </ListItemIcon>
                        <ListItemText primary="Search for a track"/>
                    </MenuItem>
                </div>
                </Menu>
                
        </div>  
    )
}

export const ConnectedBreadcrumbsComponent = connect(mapStateToProps,mapDispatchToProps)(BreadcrumbsComponent)
