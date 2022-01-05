import React, { useState, useEffect, useCallback } from "react";

import { Paper, Grid, Typography, TextField, Button } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import { useNavigate } from "react-router";
import { connect } from "react-redux";

import * as geoSelectors from "../../../redux/selectors/geoSelectors";
import * as trackSelectors from "../../../redux/selectors/trackSelectors";
import * as artistSelectors from "../../../redux/selectors/artistSelectors";
import * as tagSelectors from "../../../redux/selectors/tagSelectors";
import * as loadingSelectors from "../../../redux/selectors/loadingSelectors";

import { compose } from "recompose";
import BackgroundImage from "../../../assets/images/searchboxbackground.jpg";

import * as artistActionCreators from "../../../redux/actionCreators/artistActionCreators";
import * as trackActionCreators from "../../../redux/actionCreators/trackActionCreators";
import * as geoActionCreators from "../../../redux/actionCreators/geoActionCreators";
import * as tagActionCreators from "../../../redux/actionCreators/tagActionCreators";

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
    searchArtist,
    searchTrack,
    searchGeo,
    searchTag,
    loadingState,
}) => {
    const [text, setText] = useState("");
    const handleChange = (event) => {
        setText({ ...text, [event.target.name]: event.target.value });
    };
    const navigate = useNavigate();

    const makeQuery = useCallback(
        (input, state) => {
            let parsedInput = Object.values(input).map((el) =>
                el.replace(/ /g, "%20")
            );
            if (properties.toLink.includes("artist")) {
                searchArtist(...parsedInput);
            }
            if (properties.toLink.includes("track")) {
                searchTrack(...parsedInput);
            }
            if (properties.toLink.includes("geo")) {
                searchGeo(...parsedInput);
            }
            if (properties.toLink.includes("tag")) {
                searchTag(...parsedInput);
            }
        },
        [searchArtist, searchTrack, searchGeo, searchTag, properties]
    );

    useEffect(() => {
        if (tagState && tagState.name) {
            navigate(`/tag/${tagState.name}`);
        }
        if (
            artistState &&
            artistState.getArtist &&
            artistState.getArtist.name
        ) {
            navigate(`/artist/${artistState.getArtist.name}`);
        }
        if (
            trackInfoState &&
            trackInfoState.getTrack &&
            trackInfoState.getTrack.mbid
        ) {
            navigate(`/track/${trackInfoState.getTrack.mbid}`);
        }

        if (geoState && geoState.name) {
            navigate(`/geo/${geoState.name}`);
        }
    }, [artistState, trackInfoState, tagState, geoState, navigate]);

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

const mapStateToProps = (state) => ({
    trackInfoState: trackSelectors.trackState(state),
    artistState: artistSelectors.artistState(state),
    tagState: tagSelectors.tagState(state),
    geoState: geoSelectors.geoState(state),
    loadingState: loadingSelectors.loadingState(state),
});

const mapDispatchToProps = (dispatch) => ({
    searchArtist: (artist) =>
        dispatch(artistActionCreators.searchArtist(artist)),
    searchTrack: (name, artist) =>
        dispatch(trackActionCreators.searchTrack(name, artist)),
    searchGeo: (country) => dispatch(geoActionCreators.searchGeo(country)),
    searchTag: (tag) => dispatch(tagActionCreators.searchTag(tag)),
});

export default compose(
    withStyles(useStyles),
    connect(mapStateToProps, mapDispatchToProps)
)(SearchpageForm);
