import React, { useState, useEffect } from "react";

import { Grid, Typography } from "@material-ui/core";

import { withStyles } from "@material-ui/core/styles";
import { compose } from "recompose";

import { searchSingerImage } from "../../../axiosCalls";

const useStyles = () => ({
    albumGridItem: {
        display: "flex",
        maxWidth: 200,
        padding: "0.5rem",
    },
    bestAlbumText: {
        color: "white",
        paddingBottom: "1rem",
        textAlign: "center",
        textDecoration: "underline",
        padding: "0.5rem",
        cursor: "pointer",
        margin: "auto",
    },
});

const Similarartist = ({ item, classes }) => {
    const [imageUrl, setImageUrl] = useState("");
    const { name, url } = item;

    useEffect(() => {
        searchSingerImage(name, setImageUrl);
    }, []);
    console.log(imageUrl);
    return (
        <Grid key={name} item xs={12} className={classes.albumGridItem}>
            <Typography
                variant="subtitle2"
                className={classes.bestAlbumText}
                onClick={() => window.open(url)}
            >
                {name}
            </Typography>
        </Grid>
    );
};

export default compose(withStyles(useStyles))(Similarartist);
