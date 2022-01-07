import React from "react";

import { Grid } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import { compose } from "recompose";
import Gif from "../../../assets/videos/Infinity-1s-200px.gif";

const useStyles = () => ({
    mainGrid: {
        display: "flex",
        height: "100%",
        width: "100vw",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
    },
    iFrame: {
        width: "10rem",
    },
    container: {
        minHeight: "100%",
        width: "100vw",
        position: "fixed",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(255,255,255,0.7)",
        zIndex: 150,
    },
});

const Loading = ({ classes }) => {
    return (
        <Grid container className={classes.container}>
            <Grid item xs={10} sm={8} className={classes.mainGrid}>
                <img className={classes.iFrame} src={Gif} alt="gif" />
            </Grid>
        </Grid>
    );
};

export default compose(withStyles(useStyles))(Loading);
