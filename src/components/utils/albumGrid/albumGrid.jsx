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
        }
    },
    bestAlbumText: {
        paddingBottom: "1rem",
        textAlign:'center',
        textDecoration:"underline",
        padding:"0.5rem",
        cursor:"pointer",
        margin:"auto"
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
