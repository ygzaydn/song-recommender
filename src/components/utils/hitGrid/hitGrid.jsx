import React, { useState } from "react";
import { Grid, Typography } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import { compose } from "recompose";

import { connect } from "react-redux";

import { useNavigate } from "react-router";

import * as trackActionCreators from "../../../redux/actionCreators/trackActionCreators";
import * as artistActionCreators from "../../../redux/actionCreators/artistActionCreators";

import { queryYoutubeLink } from "../../../axiosCalls";

import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";
import CircularProgress from "@mui/material/CircularProgress";

const useStyles = () => ({
    "@global": {
        "@keyframes fromLeft": {
            "0%": {
                transform: "translateX(-50rem)",
            },
            "90%": {
                transform: "translateX(2rem)",
            },
            "100%": {
                transform: "translateX(0rem)",
            },
        },
        "@keyframes fadeIn": {
            "0%": {
                opacity: 0,
            },
            "100%": {
                opacity: 1,
            },
        },
    },

    songBarGrid: {
        display: "flex",
        transform: "translateX(-50rem)",
        animationName: "fromLeft",
        animationDuration: "1.5s",
        animationFillMode: "forwards",
    },

    songNameTypo: {
        display: "inline-block",
        textDecoration: "underline",
        transition: "all .5s",
        "&:hover": {
            cursor: "pointer",
            textDecoration: "none",
            paddingLeft: "1rem",
        },
    },

    songRankInfo: {
        display: "inline-block",
        color: "gray",
    },
    iconGrid: {
        position: "relative",
        display: "flex",
        "& svg": {
            margin: "0 .5rem 0 0",
            fill: "black",
            transition: "all .5s ",
        },
    },
});

const Hitgrid = ({
    classes,
    item,
    ind,
    searchTrackByMbid,
    searchArtist,
    mode,
}) => {
    const { name, listeners, artist, mbid } = item;
    const navigate = useNavigate();

    const [link, setLink] = useState(null);

    const [expand, setExpand] = useState(false);
    const toggleAcordion = () => {
        setExpand((prev) => !prev);
        if (!link) {
            queryYoutubeLink(setLink, name, item.artist.name);
        } else {
            setLink(null);
        }
    };

    const getSong = () => {
        searchTrackByMbid(mbid, (x) => navigate(x));
    };

    const getArtist = (mbid, artistName) => {
        searchArtist(artistName, (x) => navigate(x));
    };

    return (
        <Accordion expanded={expand === true}>
            <AccordionSummary>
                <Grid
                    item
                    xs={12}
                    key={mbid}
                    className={classes.songBarGrid}
                    style={{
                        padding: "1%",
                        animationDelay: `${parseInt(ind + 1) * 10}ms`,
                    }}
                >
                    <Grid
                        item
                        xs={8}
                        className={classes.iconGrid}
                        style={{
                            position: "relative",
                            display: "flex",
                            flexDirection: "row",
                        }}
                    >
                        {mode !== "artist" && (
                            <PlayCircleIcon
                                onClick={() => toggleAcordion()}
                                style={
                                    expand
                                        ? { transform: "rotate(90deg)" }
                                        : { transform: "rotate(0deg)" }
                                }
                            />
                        )}

                        <Grid
                            container
                            style={{ display: "flex", flexDirection: "column" }}
                        >
                            <Typography
                                variant="h6"
                                onClick={() =>
                                    mode === "artist"
                                        ? getArtist(mbid, name)
                                        : getSong()
                                }
                                className={classes.songNameTypo}
                            >
                                {name}{" "}
                            </Typography>
                            {mode !== "artist" && (
                                <Typography
                                    variant="subtitle2"
                                    onClick={() =>
                                        getArtist(artist.mbid, artist.name)
                                    }
                                    className={classes.songNameTypo}
                                    style={{ color: "gray" }}
                                >
                                    {artist.name}
                                </Typography>
                            )}
                        </Grid>
                    </Grid>
                    {mode !== "tagSong" ? (
                        <Grid
                            item
                            xs={4}
                            style={{
                                margin: "auto",
                            }}
                        >
                            <Typography
                                color="primary"
                                variant="subtitle1"
                                onClick={() => getSong()}
                                className={classes.songRankInfo}
                            >
                                {listeners}
                                <strong> listeners</strong>
                            </Typography>
                        </Grid>
                    ) : (
                        <Grid
                            item
                            xs={4}
                            style={{
                                margin: "auto",
                            }}
                        >
                            <Typography
                                color="primary"
                                variant="subtitle1"
                                onClick={() => getSong()}
                                className={classes.songRankInfo}
                            >
                                <strong>Rank: #</strong>
                                {item["@attr"].rank}
                            </Typography>
                        </Grid>
                    )}
                </Grid>
            </AccordionSummary>
            <AccordionDetails>
                <Grid container className={classes.accordionItem}>
                    {!link ? (
                        <CircularProgress />
                    ) : (
                        <iframe
                            height="300"
                            width="100%"
                            title={`${name}`}
                            src={`https://www.youtube.com/embed/${link}?autoplay=1`}
                            frameBorder="0"
                            allow="autoplay"
                        ></iframe>
                    )}
                </Grid>
            </AccordionDetails>
        </Accordion>
    );
};

const mapDispatchToProps = (dispatch) => ({
    searchArtist: (artist, func) =>
        dispatch(artistActionCreators.searchArtist(artist, func)),
    searchTrackByMbid: (mbid, func) =>
        dispatch(trackActionCreators.searchTrackByMbid(mbid, func)),
});

export default compose(
    connect(null, mapDispatchToProps),
    withStyles(useStyles)
)(Hitgrid);
