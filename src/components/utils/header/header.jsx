import React from "react";
import { Grid } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";

import { compose } from "recompose";
import { connect } from "react-redux";

import HomeIcon from "@mui/icons-material/Home";

import { resetActions } from "../../../redux/actionCreators/resetActionCreators";

import { useNavigate } from "react-router-dom";

const useStyles = () => ({
    searchpageImageGrid: {
        padding: "0 0.5rem",
        "& svg": {
            fill: "white",
            stroke: "white",
            cursor: "pointer",
            "@media only screen and (min-width: 1000px)": {
                width: 50,
                height: 50,
            },
            top: "5%",
            left: "5%",
            transition: "all .4s",
            "&:hover": {
                transform: "scale(1.25)",
            },
        },
    },
});

const Header = ({ classes, resetState }) => {
    const navigate = useNavigate();
    return (
        <Grid item xs={12} className={classes.searchpageImageGrid}>
            <HomeIcon onClick={() => resetState(navigate("/"))} />
        </Grid>
    );
};

const mapDispatchToProps = (dispatch) => ({
    resetState: () => dispatch(resetActions()),
});

export default compose(
    withStyles(useStyles),
    connect(null, mapDispatchToProps)
)(Header);
