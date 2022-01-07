import React from "react";

import { withStyles } from "@material-ui/styles";
import { Grid, Typography } from "@material-ui/core";

import { compose } from "recompose";

import { connect } from "react-redux";
import { searchArtist } from "../../../redux/actionCreators/artistActionCreators";
import { useNavigate } from "react-router";

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

const ChartBestArtist = ({ item, classes, ind, searchAnArtist }) => {
    const { mbid, name, listeners, playcount, url } = item;
    const navigate = useNavigate();

    return (
        <Grid
            container
            key={mbid + name + listeners}
            className={classes.container}
            style={{ animationDelay: `${ind * 50}ms` }}
        >
            <Grid item xs={6}>
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
                    onClick={() => (window.location.href = url)}
                    className={classes.url}
                >
                    {url}
                </Typography>
            </Grid>
            <Grid item xs={6} className={classes.statsGrid}>
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
});

export default compose(
    withStyles(useStyles),
    connect(null, mapDispatchToProps)
)(ChartBestArtist);
