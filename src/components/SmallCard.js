import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
  root: {
    maxWidth: '40vw',
  },
  title: {
    fontSize: 14,
    textAlign: 'center'
  },
  pos: {
    marginBottom: 12,
  },
  url: {
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      display:'inline-block',
      whiteSpace: 'nowrap'
  }
});

export const SmallCard = ({title, data1, data2, par1, par2}) => {
  const classes = useStyles();
  const bull = <span className={classes.bullet}>•</span>;

  return (
    <Card className={classes.root} variant="outlined">
      <CardContent>
        <Typography className={classes.title} color="textSecondary" gutterBottom>
          {title}
        </Typography>
        <Typography variant="h6" component="h2">
          {par1}
        </Typography>
        <Typography className={classes.pos} color="textSecondary">
          {data1}
        </Typography>
        <Typography variant="h6" component="h2">
          {par2}
        </Typography>
        <Typography className={classes.url} color="textSecondary">
          {data2}
        </Typography>
      </CardContent>
    </Card>
  );
}