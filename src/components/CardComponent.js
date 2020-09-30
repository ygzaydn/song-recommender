import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {Link, Card, CardContent, CardMedia, Typography} from '@material-ui/core'


const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'left',
    border: '1px solid black',
    height: 160,
  },
  details: {
    display: 'flex',
    flexDirection: 'column',
  },
  content: {
    flex: '1 0 auto',
    padding: '0 0.5vw',
    paddingRight: '1vw'
  },
  cover: {
    minWidth: 150,
  },
  subtitle1: {
      maxWidth: '50vw',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      display:'inline-block',
      whiteSpace: 'nowrap'
  }
}));

export const CardComponent = ({name, url, playcount, img, artist}) => {
  const classes = useStyles();

  return (
      <div style={{maxWidth:800}}>
    <Card className={classes.root}>
      <CardMedia
        className={classes.cover}
        image={img}
        title={classes.artist}
      />
      <div className={classes.details}>
        <CardContent className={classes.content}>
          <Typography component="h6" variant="h6">
            {name}
          </Typography>
          <Typography variant="subtitle1" color="textSecondary">
            {artist}
          </Typography>
          <Link variant="subtitle1" href={url} className={classes.subtitle1}>
            {url}
          </Link>
          <Typography variant="subtitle2" color="textSecondary">
            Playcount: {playcount}
          </Typography>
        </CardContent>
      </div>
    </Card>
    </div>
  );
}