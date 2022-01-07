import React from "react";

import { withStyles } from "@material-ui/styles";
import { Chip } from "@material-ui/core";

import { connect } from "react-redux";
import { compose } from "recompose";

import { searchTag } from "../../../redux/actionCreators/tagActionCreators";
import { useNavigate } from "react-router";

const useStyles = () => ({
    "@global": {
        "@keyframes fadeIn": {
            "0%": {
                opacity: "0",
            },
            "100%": {
                opacity: "1",
            },
        },
    },
    container: {
        opacity: "0",
        animationName: "fadeIn",
        animationDuration: "2s",
        animationFillMode: "forwards",
        padding: "2rem",
        backgroundColor: "black",
        color: "white",
        margin: "1rem",
        border: ".2px solid black",
        transition: "all .5s",
        "&:hover": {
            backgroundColor: "white",
            color: "black",
            cursor: "pointer",
        },
    },
    statsGrid: {
        display: "flex",
        justifyContent: "space-evenly",
    },
});

const ChartBestTag = ({ item, classes, ind, searchATag }) => {
    const { name, reach } = item;
    const navigate = useNavigate();
    return (
        <Chip
            label={name}
            key={name + reach}
            className={classes.container}
            style={{
                animationDelay: `${ind * 50}ms`,
                fontSize: `calc(100% - ${0.1 * parseFloat(ind)}px)`,
                padding: `calc(5% - ${0.1 * parseFloat(ind)}rem)`,
            }}
            onClick={() => searchATag(name, (x) => navigate(x))}
        ></Chip>
    );
};

const mapDispatchToProps = (dispatch) => ({
    searchATag: (tag, func) => dispatch(searchTag(tag, func)),
});

export default compose(
    withStyles(useStyles),
    connect(null, mapDispatchToProps)
)(ChartBestTag);
