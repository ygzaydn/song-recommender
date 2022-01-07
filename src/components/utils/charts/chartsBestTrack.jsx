import React from "react";

import { withStyles } from "@material-ui/styles";
import { Grid, Typography } from "@material-ui/core";

import { compose } from "recompose";

import { connect } from "react-redux";
import { searchArtist } from "../../../redux/actionCreators/artistActionCreators";
import { useNavigate } from "react-router";
import { searchTrackByMbid } from "../../../redux/actionCreators/trackActionCreators";

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
            paddingLeft: "1rem",
            cursor: "pointer",
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

    return (
        <Grid
            container
            key={mbid + name + listeners}
            className={classes.container}
            style={{ animationDelay: `${ind * 50}ms` }}
        >
            <Grid item xs={12} md={6}>
                <Typography variant="h6">
                    <strong
                        className={classes.text}
                        onClick={() => searchAnArtist(name, (x) => navigate(x))}
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
            <Grid item xs={12} md={6} className={classes.statsGrid}>
                <Typography variant="subtitle1">
                    <strong>Listeners:</strong>
                    <br />
                    {listeners}
                </Typography>
                <Typography variant="subtitle1">
                    <strong>Playcount:</strong>
                    <br />
                    {playcount}
                </Typography>
            </Grid>
        </Grid>
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
