import React from 'react'

import {Grid, Typography} from '@material-ui/core'

import {withStyles} from '@material-ui/core/styles'
import {compose} from 'recompose'

const useStyles = () => ({
    albumGridItem: {
        display: "flex",
        maxWidth:250,
        padding:"1rem",
        "& img":{
            width:"50%",
        },
        "@media only screen and (max-width: 1000px)":{
            flexDirection:"column",
            justifyContent:"center",
            alignItems:"center",
            "& h6":{
                fontSize:"0.75rem",
            },
            border:'0.1px solid lightgray',
        }
    },
    bestAlbumText: {
        paddingBottom: "1rem",
        textAlign:'center',
        textDecoration:"underline",
        padding:"0.5rem",
        cursor:"pointer",
        margin:"auto",
        transition: "all .5s",
        "&:hover": {
            cursor: "pointer",
            textDecoration: "none",
            paddingLeft: "0.2rem",
        },
    },
})


const Albumgrid = ({item, classes}) => {
    const {name, image, url} = item
    return (
            <Grid key={name} item xs={12} className={classes.albumGridItem}> 
                <img src={image[1].["#text"]} alt={image[3].["#text"]}/>
                <Typography variant="subtitle2" className={classes.bestAlbumText} onClick={() => window.open(url)}>
                    {name}
                </Typography>
           </Grid>
    )
}


export default compose(withStyles(useStyles))(Albumgrid)
