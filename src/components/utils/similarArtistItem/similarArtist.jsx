import React from "react";

import { Grid, Typography } from "@material-ui/core";

import { withStyles } from "@material-ui/core/styles";
import { compose } from "recompose";

import LibraryMusicIcon from "@mui/icons-material/LibraryMusic";
import { useNavigate } from "react-router-dom";
import { searchArtist } from "../../../redux/actionCreators/artistActionCreators";
import { connect } from "react-redux";
import { artistInfo } from "../../../redux/selectors/artistSelectors";

const useStyles = () => ({
    "@global": {
        "@keyframes fadeIn": {
            "0%": {
                opacity: 0,
            },
            "100%": {
                opacity: 1,
            },
        },
    },
    similarArtistItem: {
        display: "flex",
        maxWidth: 200,
        padding: "0.5rem",
        flexDirection: "column",
        alignItems: "center",
        animationName: "fadeIn",
        animationDuration: "2s",
        opacity: 0,
        animationFillMode: "forwards",
        "& svg": {
            color: "black",
        },
    },

    similarArtistText: {
        paddingBottom: "1rem",
        textAlign: "center",
        textDecoration: "underline",
        padding: "0.5rem",
        cursor: "pointer",
        margin: "auto",
        transition: "all .5s",
        "&:hover": {
            cursor: "pointer",
            textDecoration: "none",
            paddingLeft: "1rem",
        },
    },
});

const Similarartist = ({ item, classes, searchArtist, getArtist }) => {
    const { name } = item;
    const navigate = useNavigate();

    const getArtistQuery = async (name) => {
        searchArtist(name);
    };

    return (
        <Grid
            key={name}
            item
            xs={6}
            sm={4}
            md={3}
            className={classes.similarArtistItem}
        >
            <LibraryMusicIcon />
            <Typography
                variant="subtitle2"
                className={classes.similarArtistText}
                onClick={() => {
                    getArtistQuery(name);
                }}
            >
                {name}
            </Typography>
        </Grid>
    );
};

const mapStateToProps = (state) => ({
    getArtist: artistInfo(state),
});

const mapDispatchToProps = (dispatch) => ({
    searchArtist: (artist) => dispatch(searchArtist(artist)),
});

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    withStyles(useStyles)
)(Similarartist);
