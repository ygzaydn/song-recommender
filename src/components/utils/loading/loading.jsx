import React from 'react'

import {Grid, Typography} from '@material-ui/core'
import {withStyles} from '@material-ui/core/styles'
import { compose } from 'recompose'

const useStyles = () => ({
    mainGrid:{
        display:"flex",
        flexDirection:"column",
        justifyContent:"center",
        alignItems:"center"
    },
    iFrame:{
        width:"40rem",
        
    },
    container:{
        height:"100vh",
        width:"100vw",
        display:"flex",
        justifyContent:"center",
        backgroundColor:"black"
    }
})


const Loading = ({classes}) => {
    return <Grid container className={classes.container}>
        <Grid xs={10} sm={8} className={classes.mainGrid}>
            <img className={classes.iFrame} src="https://media0.giphy.com/media/B4BuUFKxfgwhi/giphy.gif?cid=790b761165b04368fec9f241d67e7a4054ec98fa3366fdbe&rid=giphy.gif&ct=g" alt="gif"/>
            <Typography style={{color:'white'}} variant="h6">
                Loading...
            </Typography>
        </Grid>
    </Grid>
}

export default compose(withStyles(useStyles))(Loading)