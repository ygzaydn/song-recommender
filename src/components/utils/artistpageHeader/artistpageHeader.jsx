import React from "react";

import { Grid, Typography, Chip } from "@material-ui/core";

import { withStyles } from "@material-ui/core/styles";
import { compose } from "recompose";

const useStyles = () => ({
    artistPageUpperGridTitle: {
        marginBottom: "0.5rem",
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
        margin: "0.5rem",
        transition: "all 0.5s",
        borderRadius: 0,
        fontSize: "1rem",
        "&:hover": {
            backgroundColor: "#3f51b5 !important",
            color: "white !important",
        },
    },
});

const ArtistpageHeader = ({ artistState, classes }) => {
    const { getArtist } = artistState;

    const routeToBio = () => {
        window.open(getArtist.bio.links.link.href);
    };

    return (
        <Grid item xs={12} className={classes.artistPageUpperContentGrid}>
            <Grid item xs={8}>
                <Typography
                    color="primary"
                    variant="h2"
                    className={classes.artistPageUpperGridTitle}
                >
                    {getArtist.name.toUpperCase()}
                </Typography>
                <Typography
                    variant="subtitle2"
                    className={classes.artistPageUpperGridBio}
                    onClick={() => {
                        routeToBio();
                    }}
                >
                    Click for bio
                </Typography>
                <Typography
                    variant="subtitle2"
                    className={classes.artistPageUpperGridStats}
                >
                    Listeners:
                    <br />
                    <strong style={{ color: "white" }}>
                        {getArtist.stats.listeners}
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
                        {getArtist.stats.playcount}
                    </strong>
                    <br />
                </Typography>
            </Grid>
            <Grid item xs={4}>
                {getArtist.tags.tag.map((el) => (
                    <Chip
                        color="primary"
                        label={el.name}
                        key={el.name}
                        variant="outlined"
                        onClick={() => window.open(el.url)}
                        className={classes.artistPageUpperGridTags}
                    />
                ))}
            </Grid>
        </Grid>
    );
};

export default compose(withStyles(useStyles))(ArtistpageHeader);
