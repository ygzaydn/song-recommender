import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { color } from '../colors'

const useStyles = makeStyles({
  root: {
    maxWidth: '40vw',
    backgroundColor: `${color.PURPLECOLOR}`,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: `${color.WHITECOLOR}`,
    textAlign: 'center'
  },
  pos: {
    marginBottom: 12,
    color: `${color.WHITECOLOR}`,
  },
  moreInfo: {
    color: `${color.WHITECOLOR}`,
  }
});

export const SmallCard = ({title, data1, data2, par1, par2}) => {
  const classes = useStyles();

  return (
    <Card className={classes.root} variant="outlined">
      <CardContent>
        <Typography className={classes.title} gutterBottom>
          {title}
        </Typography>
        <Typography variant="h6" className={classes.moreInfo} >
          {par1}
        </Typography>
        <Typography className={classes.moreInfo} >
          {data1}
        </Typography>
        <Typography variant="h6" className={classes.moreInfo} >
          {par2}
        </Typography>
        <Typography className={classes.moreInfo} >
          {data2}
        </Typography>
      </CardContent>
    </Card>
  );
}