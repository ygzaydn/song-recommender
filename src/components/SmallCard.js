import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { color } from '../colors';
import { connect } from 'react-redux';
import { mapDispatchToProps, mapStateToProps } from '../store'
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import { getArtistInfoFromName } from '../axiosCalls'

const useStyles = makeStyles({
  root: {
    width: '40vw',
    minHeight: '270px',
    padding: 0,
    borderColor: `${color.BLACKCOLOR}`,
    backgroundColor: `${color.YELLOWCOLOR}`,
    
  },
  rootTitle1: {
    padding: 0,
    borderColor: `${color.BLACKCOLOR}`,
    display: 'grid',
    height: '100%',
    gridTemplateRows: '15% 15% 15% 15% 15% 15%',
  },
  rootTitle2: {
    padding: 0,
    borderColor: `${color.BLACKCOLOR}`,
    display: 'grid',
    height: '100%',
    gridTemplateRows: '15% 65%',
  },
  title: {
    fontSize: '2vh',
    fontWeight: 'bold',
    color: `${color.WHITECOLOR}`,
    textAlign: 'center',
    backgroundColor: `${color.BLACKCOLOR}`,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',

  },
  pos: {
    color: `${color.BLACKCOLOR}`,
    textDecoration : 'underline',
    fontSize: 20,
  },
  moreInfo: {
    color: `${color.BLACKCOLOR}`,
    fontSize: 16,
    textAlign:'center'
  },
  similarArtistLine: {
    display:'flex',
    justifyContent:'space-between',
    margin: '0 2vw'
  }
});

const SmallCard = ({onGetArtist, onStateChange, onGetTopAlbums, onGetTopTracks, title, data1, data2, par1, par2, clickInfo, stats, clickInfoFunction}) => {
  const classes = useStyles();
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
          <ChevronRightIcon style={{alignSelf:'center'}} fontSize="large" onClick={() => {getArtistInfoFromName(el.name,onGetArtist,onGetTopTracks,onGetTopAlbums,onStateChange)}}/>
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