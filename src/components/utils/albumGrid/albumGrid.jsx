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
            width:"100%",
            height:"fit-content"
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


const Albumgrid = ({item, classes, mode, key}) => {
    const {name, image, url} = item
    return (
            <Grid key={url} item xs={12} sm={6} className={classes.albumGridItem}> 
                <img src={image[1].["#text"]} alt={image[3].["#text"]}/>
                <Grid item xs={12}>
                    <Typography variant="subtitle1" className={classes.bestAlbumText} onClick={() => window.open(url)}>
                        <strong>{name}</strong> 
                    </Typography>
                    {mode === "tag" && <Typography variant="subtitle2" style={{textAlign:'center'}}>
                        {item.artist.name}
                    </Typography>}
                </Grid>
           </Grid>
    )
}


export default compose(withStyles(useStyles))(Albumgrid)
