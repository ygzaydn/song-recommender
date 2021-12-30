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
        padding: "2rem",
        alignItems: "center",
        display:'flex',
    },
    artistPageUpperGridBio: {
        color: "lightGray",
        textDecoration: "underline",
        cursor: "pointer",
        paddingLeft: "2rem",
        transition: "all .5s",
        display: "inline-block",
        "&:hover": {
            cursor: "pointer",
            textDecoration: "none",
            paddingLeft: "1rem",
        },
    },
    artistPageUpperGridStats: {
        display: "inline-block",
        color: "gray",
        paddingRight: "5rem",
        paddingTop: "1.5rem",
        fontWeight: 600,
        paddingLeft: "2rem",
    },

    artistPageUpperGridTags: {
        margin: "0.5rem 0.2rem",
        transition: "all 0.5s",
        borderRadius: 0,
        fontSize: "1rem",
        maxWidth: "100%",
        backgroundColor: "transparent",
        color: "gray",
        "&:hover": {
            backgroundColor: "#3f51b5 !important",
            color: "white !important",
            borderRadius: 5,
        },
    },
});

const Tagpageheader = ({ tagState, classes }) => {
    return (
        <Grid item xs={12} className={classes.artistPageUpperContentGrid}>
            <Grid item xs={12} sm={6}>
                <Typography
                    color="primary"
                    variant="h2"
                    className={classes.artistPageUpperGridTitle}
                >
                    {tagState.name.toUpperCase()}
                </Typography>
                <Grid item xs={12}>
                    <Typography
                        variant="subtitle2"
                        className={classes.artistPageUpperGridBio}
                    >
                        Click for more info
                    </Typography>
                </Grid>
                <Typography
                    variant="subtitle2"
                    className={classes.artistPageUpperGridStats}
                >
                    Reach:
                    <br />
                    <strong style={{ color: "white" }}>{tagState.reach}</strong>
                    <br />
                </Typography>
                <Typography
                    variant="subtitle2"
                    className={classes.artistPageUpperGridStats}
                >
                    Total count:
                    <br />
                    <strong style={{ color: "white" }}>{tagState.total}</strong>
                    <br />
                </Typography>
            </Grid>
            <Grid item xs={12} sm={6} style={{ padding: "3rem 0" }}>
                <Grid item xs={12}>
                    <Typography variant="subtitle2" style={{ color: "white" }}>
                        {tagState.wiki.summary}
                    </Typography>
                </Grid>
            </Grid>
        </Grid>
    );
};

export default compose(withStyles(useStyles))(Tagpageheader);
