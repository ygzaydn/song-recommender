import React from 'react';
import {Link, Card, CardContent, CardMedia, Typography} from '@material-ui/core'
import LibraryMusicIcon from '@material-ui/icons/LibraryMusic';
import { cardComponentStyle } from '../themes'

export const CardComponent = ({name, url, playcount, img, artist, icon}) => {
  const classes = cardComponentStyle();

  return (
  <div>
    <Card className={classes.root}>
      {icon 
      ? icon !== 'none' ?  <LibraryMusicIcon
        className={classes.cover}
        image={img}
        title={classes.artist}
      />  : null

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