import React, { useState, useCallback, useEffect } from "react";

import { Paper, Grid, Typography, TextField, Button } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import { useNavigate } from "react-router";
import { connect } from "react-redux";
import { mapStateToProps } from "../../../store";
import { compose } from "recompose";
import BackgroundImage from "../../../assets/images/searchboxbackground.jpg";

const useStyles = () => ({
    searchpageFormPaperContainer: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        boxShadow: "none",
        height: "25rem",
        width: "25rem",
        background: "transparent",
        position: "relative",
    },
    searchpageFormPaperGrid: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "60%",
        height: "4rem",
        flexDirection: "column",
        zIndex: 2,
    },

    searchpageFormPaperBackgroundGrid: {
        borderRadius: 150,
        backgroundImage: `linear-gradient(#ffffffd1, #ffffffd1), url(${BackgroundImage})`,
        height: "35rem",
        width: "20rem",
        transform: "rotate(12deg)",
        position: "absolute",
        overflow: "hidden",
        zIndex: 1,
        backgroundPosition: "center",
        backgroundSize: "cover",
        "@media only screen and (max-width:1000px)": {
            transform: "rotate(0deg)",
            height: "25rem",
            borderRadius: 20,
        },
    },
});

const SearchpageForm = ({
    classes,
    title,
    properties,
    trackInfoState,
    artistState,
    tagState,
    geoState,
}) => {
    const [text, setText] = useState("");

    const handleChange = (event) => {
        setText({ ...text, [event.target.name]: event.target.value });
    };
    const navigate = useNavigate();

    const navigateMbid = useCallback(() => {
        if (properties !== null) {
            switch (properties.toLink) {
                case "/artist/":
                    navigate(
                        `/artist/${artistState.getArtist.name}/${artistState.getArtist.mbid}`
                    );
                    break;
                case "/track/":
                    navigate(`/track/${trackInfoState.getTrack.mbid}`);
                    break;
                case "/geo/":
                    navigate(`/geo/${text.country}`);
                    break;
                case "/tag/":
                    navigate(`/tag/${text.tag}`);
                    break;
                default:
                    break;
            }
        }
    }, [artistState, navigate, properties, text, trackInfoState]);

    const makeQuery = useCallback(
        (input, state) => {
            let parsedInput = Object.values(input).map((el) =>
                el.replace(/ /g, "%20")
            );
            properties.function(...parsedInput, ...properties.dispatcher);
        },
        [properties]
    );

    useEffect(() => {
        navigateMbid();
    }, [artistState, tagState, geoState, trackInfoState]);

    return properties ? (
        <Paper className={classes.searchpageFormPaperContainer}>
            <Grid item className={classes.searchpageFormPaperBackgroundGrid} />
            <Grid item xs={12} className={classes.searchpageFormPaperGrid}>
                <Typography color="primary" variant="h6">
                    {title}
                </Typography>
            </Grid>
            <Grid
                item
                xs={12}
                className={classes.searchpageFormPaperGrid}
                style={{ justifyContent: "flex-start" }}
            >
                {properties.inputFields.map((el) => (
                    <TextField
                        label={el.name}
                        variant="standard"
                        onChange={handleChange}
                        name={el.key}
                        key={el.key}
                    />
                ))}
            </Grid>

            <Grid item xs={12} className={classes.searchpageFormPaperGrid}>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={() => makeQuery(Object.values(text), text)}
                >
                    Search
                </Button>
            </Grid>
        </Paper>
    ) : null;
};

export default compose(
    withStyles(useStyles),
    connect(mapStateToProps)
)(SearchpageForm);
