import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { connect } from 'react-redux';
import { mapDispatchToProps, mapStateToProps } from '../store'
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import { smallCardStyle } from '../themes'


const SmallCard = ({ title, data1, data2, par1, par2, clickInfo, stats, clickInfoFunction }) => {
  const classes = smallCardStyle();
  
  const classNameForContent = clickInfo? classes.rootTitle1 : classes.rootTitle2;

  return (
    <Card className={classes.root} variant="outlined" >
      <CardContent className={classNameForContent}>
        <Typography className={classes.title} gutterBottom>
          {title}
        </Typography>
        {clickInfo === true
        ? data1.map(el => {
          return (
            <div className={classes.similarArtistLine}>
          <Typography style={{alignSelf:'center'}}>
            {el.name}
          </Typography>
          <ChevronRightIcon style={{alignSelf:'center'}} fontSize="large" onClick={() => clickInfoFunction(el.name)}/>
            </div>
          )
        })
        : null}
        {stats === true
        ? <div style={{alignSelf:'center', justifySelf:'center'}}>
        <Typography className={classes.pos} >
          {par1}
        </Typography>
        <Typography  className={classes.moreInfo} >
          {data1}
        </Typography>
        <Typography className={classes.pos} >
          {par2}
        </Typography> 
        <Typography className={classes.moreInfo} >
          {data2}
        </Typography>
        </div>
        : null}
      </CardContent>
    </Card>
  );
}

export const ConnectedSmallCard = connect(mapStateToProps,mapDispatchToProps)(SmallCard)