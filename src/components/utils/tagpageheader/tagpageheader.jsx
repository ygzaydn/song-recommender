import React, { useState } from "react";

import { Grid, Typography } from "@material-ui/core";

import { withStyles } from "@material-ui/core/styles";
import { compose } from "recompose";

const useStyles = () => ({
    artistPageUpperGridTitle: {
        marginBottom: "0.5rem",
        fontSize: "3.5rem",
        textAlign: "start",
        fontSizeAdjust: "0.5",
    },
    artistPageUpperContentGrid: {
        maxWidth: "900px",
        padding: "0.2rem 1.5rem",
        alignItems: "start",
        display: "flex",
    },
    artistPageUpperGridBio: {
        color: "lightGray",
        textDecoration: "underline",
        cursor: "pointer",
        textAlign: "start",

        "&:hover": {
            cursor: "pointer",
            textDecoration: "none",
            paddingLeft: "1rem",
        },
    },
    transition: {
        transition: "all .5s",
    },
    close: {
        height: "15rem",
    },
    open: {
        height: "25rem",
        animationName: "overflow",
        animationDelay: ".3s",
        animationDuration: ".1s",
        animationFillMode: "forwards",
    },
    artistPageUpperGridStats: {
        display: "inline-block",
        color: "gray",
        paddingRight: "2rem",
        paddingTop: "1.5rem",
        fontWeight: 600,
        paddingLeft: "2rem",
        textAlign: "center",
    },
    "@global": {
        "@keyframes overflow": {
            "0%": {
                overflowY: "inherit",
            },
            "100%": {
                overflowY: "auto",
            },
        },
    },
});

const Tagpageheader = ({ tagState, classes }) => {
    const [readState, setReadState] = useState("Read more...");
    return (
        <Grid container className={classes.artistPageUpperContentGrid}>
            <Grid item xs={12} sm={6} style={{ alignSelf: "flex-start" }}>
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
                <Grid item xs={12} style={{ display: "flex" }}>
                    <Typography
                        variant="subtitle2"
                        className={classes.artistPageUpperGridStats}
                    >
                        Reach:
                        <br />
                        <strong style={{ color: "white" }}>
                            {tagState.reach}
                        </strong>
                        <br />
                    </Typography>
                    <Typography
                        variant="subtitle2"
                        className={classes.artistPageUpperGridStats}
                    >
                        Total count:
                        <br />
                        <strong style={{ color: "white" }}>
                            {tagState.total}
                        </strong>
                        <br />
                    </Typography>
                </Grid>
            </Grid>
            <Grid
                item
                xs={12}
                sm={6}
                style={{ padding: "2rem 0" }}
                className={`${classes.transition} ${
                    readState === "Read more..."
                        ? ` ${classes.close}`
                        : `${classes.open}`
                }`}
            >
                <Grid item xs={12} style={{ padding: "1rem 0" }}>
                    <Typography
                        variant="subtitle2"
                        style={{ color: "white", padding: "1rem 0" }}
                    >
                        {readState === "Read more..." &&
                        tagState.wiki.summary.length > 150
                            ? `${tagState.wiki.summary.slice(0, 150)}...`
                            : `${tagState.wiki.summary}`}
                    </Typography>
                    {tagState.wiki.summary.length > 150 && (
                        <Typography
                            variant="subtitle2"
                            className={classes.artistPageUpperGridBio}
                        >
                            <strong
                                onClick={() =>
                                    readState === "Read more..."
                                        ? setReadState("Show less...")
                                        : setReadState("Read more...")
                                }
                            >
                                {readState}
                            </strong>
                        </Typography>
                    )}
                </Grid>
            </Grid>
        </Grid>
    );
};

export default compose(withStyles(useStyles))(Tagpageheader);
