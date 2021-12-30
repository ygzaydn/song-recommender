import React from "react";

import { Grid, Typography } from "@material-ui/core";

import { withStyles } from "@material-ui/core/styles";
import { compose } from "recompose";

const useStyles = () => ({
    artistPageUpperGridTitle: {
        marginBottom: "0.5rem",
        fontSize: "min(10vw,3.5rem)",
    },
    artistPageUpperContentGrid: {
        maxWidth: "900px",
        padding: "0 2%",
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
    },
});

const Geopageheader = ({ countryName, classes }) => {
    return (
        <Grid item xs={12} className={classes.artistPageUpperContentGrid}>
            <Grid item xs={12}>
                <Typography
                    color="primary"
                    variant="h2"
                    className={classes.artistPageUpperGridTitle}
                >
                    {countryName.toUpperCase()}
                </Typography>
            </Grid>
            <Grid item xs={12}>
                <Typography variant="h6" style={{ color: "white" }}>
                    Best hits & bands for {countryName}
                </Typography>
            </Grid>
        </Grid>
    );
};

export default compose(withStyles(useStyles))(Geopageheader);
