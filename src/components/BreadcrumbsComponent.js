import React, {useState,useEffect} from 'react';
import { Breadcrumbs, Typography, Menu, MenuItem, ListItemIcon, ListItemText} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import { color } from '../colors'
import { connect } from 'react-redux'
import { mapDispatchToProps, mapStateToProps } from '../store'
import AlbumSharpIcon from '@material-ui/icons/AlbumSharp';
import LibraryMusicIcon from '@material-ui/icons/LibraryMusic';
import QueueMusicIcon from '@material-ui/icons/QueueMusic';
import MusicVideoIcon from '@material-ui/icons/MusicVideo';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const useStyles = makeStyles(() => ({
  ol: {
    justifyContent: 'center',
  },
  root: {
      color: 'white',
      display: 'flex',
      justifyContent: 'center',
      '&:hover': {
        textDecoration: 'underline',
    }
  },
  underlineTypo: {
    display: 'flex',
    justifyContent: 'center',
    textDecoration: 'underline',
    color: `${color.PINKCOLOR}`,
  },
  menuStyle: {
      background: `${color.BLACKCOLOR}`,
      color: `${color.WHITECOLOR}`,
      border: `2px solid ${color.PINKCOLOR}`,
  },
  menuItemStyle: {
      borderBottom: `1px solid  ${color.PINKCOLOR}`,
      borderTop: `1px solid  ${color.PINKCOLOR}`,
      '&:hover': {
        background: `${color.PINKCOLOR}`,
      },
  },
  menuItemTitle: {
      textAlign:'center',
      background: `${color.PINKCOLOR}`,
      '&:hover': {
        background: `${color.PINKCOLOR}`,
      },
  }
}));

const BreadcrumbsComponent = ({onStateChange, handleClick, classTrigger, renderState}) => {

    const classes = useStyles();
    const [classnames, setClassnames] = useState();

    const [anchorElArtists, setanchorElArtists] = useState(null);
    const [anchorElTracks, setanchorElTracks] = useState(null);
    const [anchorElTags, setanchorElTags] = useState(null);
    const [anchorElGeos, setanchorElGeos] = useState(null);


    const handleClickMenu = (statefunction) => (event) => statefunction(event.currentTarget)
    
    const handleClose = (statefunction) => statefunction(null);

    useEffect(() => {
        setClassnames(renderState)
    },[renderState])
//onClick={handleClick('Track','TrackSearch')}

    return (
        <div className={classTrigger}>
            <Breadcrumbs classes={{ol: classes.ol}} aria-label="breadcrumb">
                <Typography id="header" className={classnames==='ArtistRecommend'? classes.underlineTypo: classes.root} aria-controls="artist-menu" color="inherit" onClick={ handleClickMenu(setanchorElArtists)}> 
                    Artists
                    <ExpandMoreIcon color="white" />
                </Typography>
                <Typography id="header1" className={classnames==='TrackSearch'? classes.underlineTypo: classes.root} aria-controls="track-menu" color="inherit" onClick={handleClickMenu(setanchorElTracks)}>
                    Tracks
                    <ExpandMoreIcon color="white" />
                </Typography>
                <Typography id="header2" className={classnames==='TagRecommend'? classes.underlineTypo: classes.root} aria-controls="tag-menu" color="inherit" onClick={handleClickMenu(setanchorElTags)}>
                    Tags
                    <ExpandMoreIcon color="white" />
                </Typography>
                <Typography id="header3" className={classnames==='GeoRecommend'? classes.underlineTypo: classes.root} color="inherit" aria-controls="geo-menu" onClick={handleClickMenu(setanchorElGeos)}>
                    Geo
                    <ExpandMoreIcon color="white" />
                </Typography>
            </Breadcrumbs>
            
            <Menu
                id="artist-menu"
                anchorEl={anchorElArtists}
                open={Boolean(anchorElArtists)}
                onClose={() => {handleClose(setanchorElArtists)}}
                getContentAnchorEl={null}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                }}
                MenuListProps={{
                    disablePadding: true
                }}
            >   
            <div className={classes.menuStyle} onClick={() => {handleClose(setanchorElArtists)}} >
                <MenuItem className={classes.menuItemTitle}>
                    <ListItemText primary="Artist Menu" />
                </MenuItem >
                <MenuItem className={classes.menuItemStyle}>
                    <ListItemIcon >
                        <QueueMusicIcon style={{color:'white'}} />
                    </ListItemIcon>
                    <ListItemText primary="Find an artist" />
                </MenuItem >
                <MenuItem onClick={handleClick('Artist','ArtistRecommend')}
                        className={classes.menuItemStyle}>
                    <ListItemIcon >
                        <MusicVideoIcon style={{color:'white'}}  />
                    </ListItemIcon>
                    <ListItemText primary="Find similar artists"/>
                </MenuItem>
            </div>
            </Menu>

            <Menu
                id="track-menu"
                anchorEl={anchorElTracks}
                open={Boolean(anchorElTracks)}
                onClose={() => {handleClose(setanchorElTracks)}}
                getContentAnchorEl={null}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                }}
                MenuListProps={{
                    disablePadding: true
                }}
            >   
            <div className={classes.menuStyle} onClick={() => {handleClose(setanchorElTracks)}}>
                <MenuItem className={classes.menuItemTitle}>
                    <ListItemText primary="Tracks Menu" />
                </MenuItem >
                <MenuItem className={classes.menuItemStyle}>
                    <ListItemIcon >
                        <AlbumSharpIcon style={{color:'white'}} />
                    </ListItemIcon>
                    <ListItemText primary="Find a track" />
                </MenuItem >
                <MenuItem onClick={handleClick('Track','TrackSearch')}
                        className={classes.menuItemStyle}>
                    <ListItemIcon>
                        <LibraryMusicIcon style={{color:'white'}}  />
                    </ListItemIcon>
                    <ListItemText primary="Find similar tracks"/>
                </MenuItem>
            </div>
            </Menu>
                
                <Menu
                    id="tag-menu"
                    anchorEl={anchorElTags}
                    open={Boolean(anchorElTags)}
                    onClose={() => {handleClose(setanchorElTags)}}
                    getContentAnchorEl={null}
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'center',
                    }}
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'center',
                    }}
                    MenuListProps={{
                        disablePadding: true
                    }}
                >   
                <div className={classes.menuStyle} onClick={() => {handleClose(setanchorElTags)}} >
                    <MenuItem className={classes.menuItemTitle}>
                        <ListItemText primary="Tag Menu" />
                    </MenuItem >
                    <MenuItem className={classes.menuItemStyle}>
                        <ListItemIcon >
                            <QueueMusicIcon style={{color:'white'}} />
                        </ListItemIcon>
                        <ListItemText primary="Find a tag" />
                    </MenuItem >
                    <MenuItem onClick={handleClick('Tag','TagRecommend')}
                            className={classes.menuItemStyle}>
                        <ListItemIcon >
                            <LibraryMusicIcon style={{color:'white'}}  />
                        </ListItemIcon>
                        <ListItemText primary="Find top tags"/>
                    </MenuItem>
                </div>
                </Menu>

                <Menu
                    id="geo-menu"
                    anchorEl={anchorElGeos}
                    open={Boolean(anchorElGeos)}
                    onClose={() => {handleClose(setanchorElGeos)}}
                    getContentAnchorEl={null}
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'center',
                    }}
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'center',
                    }}
                    MenuListProps={{
                        disablePadding: true
                    }}
                >   
                <div className={classes.menuStyle} onClick={() => {handleClose(setanchorElGeos)}} >
                    <MenuItem className={classes.menuItemTitle}>
                        <ListItemText primary="Tag Menu" />
                    </MenuItem >
                    <MenuItem className={classes.menuItemStyle}>
                        <ListItemIcon >
                            <QueueMusicIcon style={{color:'white'}} />
                        </ListItemIcon>
                        <ListItemText primary="Find top artist for your country" />
                    </MenuItem >
                    <MenuItem onClick={handleClick('Geo','GeoRecommend')}
                            className={classes.menuItemStyle}>
                        <ListItemIcon >
                            <AlbumSharpIcon style={{color:'white'}}  />
                        </ListItemIcon>
                        <ListItemText primary="Find top tracks for your country"/>
                    </MenuItem>
                </div>
                </Menu>
        </div>  
    )
}

export const ConnectedBreadcrumbsComponent = connect(mapStateToProps,mapDispatchToProps)(BreadcrumbsComponent)
