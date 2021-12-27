import React from "react";

import { Grid, Typography, Chip } from "@material-ui/core";

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

const TrackpageHeader = ({ trackState, classes }) => {
    const routeToBio = () => {
        window.open(trackState.wiki);
    };

    return (
        <Grid item xs={12} className={classes.artistPageUpperContentGrid}>
            <Grid item xs={8}>
                <Typography
                    color="primary"
                    variant="h2"
                    className={classes.artistPageUpperGridTitle}
                >
                    {trackState.name.toUpperCase()}
                </Typography>
                <Grid item xs={12}>
                    <Typography
                        variant="subtitle2"
                        className={classes.artistPageUpperGridBio}
                        onClick={() => {
                            routeToBio();
                        }}
                    >
                        Click for more info
                    </Typography>
                </Grid>
                <Typography
                    variant="subtitle2"
                    className={classes.artistPageUpperGridStats}
                >
                    Listeners:
                    <br />
                    <strong style={{ color: "white" }}>
                        {trackState.listeners}
                    </strong>
                    <br />
                </Typography>
                <Typography
                    variant="subtitle2"
                    className={classes.artistPageUpperGridStats}
                >
                    Play count:
                    <br />
                    <strong style={{ color: "white" }}>
                        {trackState.playcount}
                    </strong>
                    <br />
                </Typography>
            </Grid>
            <Grid item xs={4}>
                {trackState.toptags.tag.map((el) => (
                    <Chip
                        color="primary"
                        label={el.name}
                        key={el.name}
                        size="small"
                        variant="outlined"
                        onClick={() => window.open(el.url)}
                        className={classes.artistPageUpperGridTags}
                    />
                ))}
            </Grid>
        </Grid>
    );
};

export default compose(withStyles(useStyles))(TrackpageHeader);
