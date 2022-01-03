import React from "react";
import { Grid, Typography } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import { compose } from "recompose";

import { connect } from "react-redux";

import * as trackActionCreators from "../../../redux/actionCreators/trackActionCreators";

import { useNavigate } from "react-router";

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
});

const Songgrid = ({ classes, item, ind, maxListen, searchTrackByMbid }) => {
    const pageProperty = window.location.href.includes("track/")
        ? "Track"
        : "Artist";

    const { name, playcount, match, mbid } = item;
    const navigate = useNavigate();

    const getSong = () => {
        searchTrackByMbid(mbid);
        navigate(`/track/${mbid}`);
    };

    const width =
        pageProperty === "Artist"
            ? (100 * parseInt(playcount)) / parseInt(maxListen)
            : parseFloat(match) * 100;

    return (
        <Grid
            item
            xs={12}
            key={name}
            className={classes.songBarGrid}
            style={{
                padding: "1%",
                animationDelay: `${parseInt(ind) * 50}ms`,
            }}
        >
            <Grid item xs={7} style={{ position: "relative" }}>
                <div className={classes.animationDiv} />
                <Typography
                    variant="subtitle1"
                    onClick={() => getSong()}
                    className={classes.songNameTypo}
                >
                    {name}{" "}
                </Typography>
            </Grid>
            <Grid
                item
                xs={5}
                style={{
                    background: "gray",
                    border: "0.1px solid gray",
                    borderRadius: "5px",
                }}
            >
                <Typography
                    variant="subtitle1"
                    style={{
                        width: `min(${width}%,100%)`,
                        display: "inline-block",
                        background: "#3f51b5",
                        borderRadius: "5px",
                        height: "100%",
                        color: "white",
                    }}
                >
                    {pageProperty === "Artist"
                        ? playcount
                        : parseInt(match * 100) + "%"}{" "}
                    {ind === 0
                        ? pageProperty === "Artist"
                            ? "listeners"
                            : "match"
                        : null}
                </Typography>
            </Grid>
        </Grid>
    );
};

const mapDispatchToProps = (dispatch) => ({
    searchTrackByMbid: (mbid) =>
        dispatch(trackActionCreators.searchTrackByMbid(mbid)),
});

export default compose(
    connect(null, mapDispatchToProps),
    withStyles(useStyles)
)(Songgrid);
