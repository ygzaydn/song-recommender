import React, { useState } from "react";

import { withStyles } from "@material-ui/styles";
import { Grid, Typography } from "@material-ui/core";

import { compose } from "recompose";

import { connect } from "react-redux";
import { searchArtist } from "../../../redux/actionCreators/artistActionCreators";
import { useNavigate } from "react-router";
import { searchTrackByMbid } from "../../../redux/actionCreators/trackActionCreators";

import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";

import { queryYoutubeLink } from "../../../axiosCalls.js";
import CircularProgress from "@mui/material/CircularProgress";

const useStyles = () => ({
    "@global": {
        "@keyframes fromLeftNoPad": {
            "0%": {
                transform: "translateX(-50rem)",
            },
            "100%": {
                transform: "translateX(0rem)",
            },
        },
    },
    container: {
        transform: "translateX(-50rem)",
        borderBottom: "0.2px solid lightgray",
        padding: "1rem 0",
        animationName: "fromLeftNoPad",
        animationDuration: "2s",
        animationFillMode: "forwards",
    },
    statsGrid: {
        display: "flex",
        justifyContent: "space-evenly",
        flexDirection: "column",
    },
    text: {
        transition: "all .2s",
        "&:hover": {
            paddingLeft: "1rem",
            cursor: "pointer",
        },
    },
    url: {
        textDecoration: "underline",
        transition: "all .2s",
        wordWrap: "break-word",
        overflowX: "hidden",
        display: "inline",
        "&:hover": {
            cursor: "pointer",
        },
    },
    accordionItem: {
        height: 300,
        width: "100",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
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

const ChartBestTrack = ({
    item,
    classes,
    ind,
    searchAnArtist,
    searchATrack,
}) => {
    const { mbid, name, listeners, playcount, artist } = item;
    const navigate = useNavigate();

    const [link, setLink] = useState(null);

    const [expand, setExpand] = useState(false);

    const toggleAcordion = () => {
        setExpand((prev) => !prev);
        if (!link) {
            queryYoutubeLink(setLink, name, artist.name);
        } else {
            setLink(null);
        }
    };

    return (
        <Accordion
            expanded={expand === true}
            style={{ background: "transparent", cursor: "default" }}
        >
            <AccordionSummary>
                <Grid
                    container
                    key={mbid + name + listeners}
                    className={classes.container}
                    style={{ animationDelay: `${ind * 50}ms` }}
                >
                    <Grid item xs={12} md={8} className={classes.iconGrid}>
                        <PlayCircleIcon
                            onClick={() => toggleAcordion()}
                            style={
                                expand
                                    ? { transform: "rotate(90deg)" }
                                    : { transform: "rotate(0deg)" }
                            }
                        />
                        <Grid container style={{ flexDirection: "column" }}>
                            <Typography variant="h6">
                                <strong
                                    className={classes.text}
                                    onClick={() =>
                                        searchAnArtist(name, (x) => navigate(x))
                                    }
                                >
                                    {name}
                                </strong>
                            </Typography>
                            <Typography
                                variant="subtitle2"
                                className={classes.url}
                                onClick={() =>
                                    mbid === ""
                                        ? {}
                                        : searchATrack(mbid, (x) => navigate(x))
                                }
                            >
                                {artist.name}
                            </Typography>
                        </Grid>
                    </Grid>
                    <Grid item xs={12} md={4} className={classes.statsGrid}>
                        <Typography variant="subtitle1">
                            <strong>Listeners:</strong>
                            {listeners}
                        </Typography>
                        <Typography variant="subtitle1">
                            <strong>Playcount:</strong>
                            {playcount}
                        </Typography>
                    </Grid>
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
    searchAnArtist: (name, func) => dispatch(searchArtist(name, func)),
    searchATrack: (mbid, func) => dispatch(searchTrackByMbid(mbid, func)),
});

export default compose(
    withStyles(useStyles),
    connect(null, mapDispatchToProps)
)(ChartBestTrack);
