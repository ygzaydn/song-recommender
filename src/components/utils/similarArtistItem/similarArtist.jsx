import React, { useEffect } from "react";

import { Grid, Typography } from "@material-ui/core";

import { withStyles } from "@material-ui/core/styles";
import { compose } from "recompose";

import LibraryMusicIcon from "@mui/icons-material/LibraryMusic";
import { useNavigate } from "react-router-dom";

const useStyles = () => ({
    "@global": {
        "@keyframes fadeIn": {
            "0%": {
                opacity: 0,
            },
            "100%": {
                opacity: 1,
            },
        },
    },
    similarArtistItem: {
        display: "flex",
        maxWidth: 200,
        padding: "0.5rem",
        flexDirection: "column",
        alignItems: "center",
        animationName: "fadeIn",
        animationDuration: "2s",
        opacity: 0,
        animationFillMode: "forwards",
        "& svg": {
            color: "black",
        },
    },

    similarArtistText: {
        paddingBottom: "1rem",
        textAlign: "center",
        textDecoration: "underline",
        padding: "0.5rem",
        cursor: "pointer",
        margin: "auto",
    },
});

const Similarartist = ({ item, classes }) => {
    const { name } = item;
    const navigate = useNavigate();
    useEffect(() => {}, [item]);

    return (
        <Grid key={name} item xs={12} className={classes.similarArtistItem}>
            <LibraryMusicIcon />
            <Typography
                variant="subtitle2"
                className={classes.similarArtistText}
                onClick={() => {
                    navigate(`/artist/artistname=${name}`);
                }}
            >
                {name}
            </Typography>
        </Grid>
    );
};

export default compose(withStyles(useStyles))(Similarartist);
