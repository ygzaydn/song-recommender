import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {Link, Card, CardContent, CardMedia, Typography} from '@material-ui/core'
import { color } from '../colors'
import LibraryMusicIcon from '@material-ui/icons/LibraryMusic';


const useStyles = makeStyles(() => ({
  root: {
    display: 'flex',
    justifyContent: 'left',
    borderBottom: '1px solid black',
    height: 160,
    background: `${color.YELLOWCOLOR}`,
    borderBottomLeftRadius: '4px',
    borderBottomRightRadius: '4px',
  },
  details: {
    display: 'flex',
    flexDirection: 'column',
    marginLeft: '2vh',
  },
  content: {
    flex: '1 0 auto',
    padding: '0 0.5vw',
    paddingRight: '1vw'
  },
  cover: {
    minWidth: 150,
    fontSize: '144px',
  },
  subtitle1: {
      maxWidth: '50vw',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      display:'inline-block',
      whiteSpace: 'nowrap',
      color: `${color.GRAYCOLOR}`,
      textDecoration: 'underline',
  },
  typoColor: {
    color: `${color.GRAYCOLOR}`
  },
  typoColorBold: {
    color: `${color.GRAYCOLOR}`,
    textShadow: `0.2px 0.2px ${color.GRAYCOLOR}`,
  }
}));

export const CardComponent = ({name, url, playcount, img, artist, icon}) => {
  const classes = useStyles();

  return (
  <div>
    <Card className={classes.root}>
      {icon
      ?<LibraryMusicIcon
        className={classes.cover}
        image={img}
        title={classes.artist}
      />
      :<CardMedia
        className={classes.cover}
        image={img}
        title={classes.artist}
      />}
      <div className={classes.details}>
        <CardContent className={classes.content}>
          <Typography component="h6" variant="h6" className={classes.typoColorBold}>
            {name}
          </Typography>
          <Typography variant="subtitle1" className={classes.typoColor}>
            {artist}
          </Typography>
          <Link variant="subtitle1" href={url} className={classes.subtitle1}>
            {url}
          </Link>
          {playcount === false 
          ? null 
          : <Typography variant="subtitle2" className={classes.typoColor}>
            Playcount: {playcount}
          </Typography> }
        </CardContent>
      </div>
    </Card>
  </div>
  );
}