import React, { useState, useEffect, useCallback } from "react";
import { Grid } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import Background1 from "../../../assets/images/search-1.jpg";
import Background2 from "../../../assets/images/search-2.jpg";
import Background3 from "../../../assets/images/search-3.jpg";
import Background4 from "../../../assets/images/search-4.jpg";

import ArrowBackOutlinedIcon from "@mui/icons-material/ArrowBackOutlined";

import { useLocation, useNavigate } from "react-router-dom";

import SearchpageForm from "../../utils/searchpageForm/searchpageForm";

import { connect } from "react-redux";
import { mapDispatchToProps, mapStateToProps } from "../../../store";

import { compose } from "recompose";

import { getArtistInfoFromName } from "../../../axiosCalls";

const useStyles = () => ({
    "@global": {
        "@keyframes fromLeft": {
            "0%": {
                transform: "translateX(-100%)",
            },
            "75%": {
                transform: "translateX(1%)",
            },
            "100%": {
                transform: "translateX(0%)",
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
    searchpageContainer: {
        height: "100vh",
        width: "100vw",
    },
    searchpageImageGrid: {
        transform: "translateX(-100%)",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "bottom",
        clipPath: "polygon(0% 0%, 80% 0%, 100% 100%,0% 100%)",
        animationName: "fromLeft",
        animationDuration: "1.2s",
        animationDelay: ".5s",
        "animation-fill-mode": "forwards",
        zIndex: 2,
        "& svg": {
            fill: "white",
            stroke: "white",
            height: 50,
            width: 50,
            cursor: "pointer",
            position: "absolute",
            top: "5%",
            left: "5%",
            transition: "all .4s",
            "&:hover": {
                transform: "scale(1.25)",
            },
        },
    },
    searchpageFromGrid: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        opacity: 0,
        animationName: "fadeIn",
        animationDuration: "1.2s",
        animationDelay: "1.5s",
        "animation-fill-mode": "forwards",
    },
});

const Searchpage = ({
    classes,
    searchText,
    title,
    onGetArtist,
    onGetTopTracks,
    onGetTopAlbums,
}) => {
    const [properties, setProperties] = useState(null);

    const { state } = useLocation();
    const navigate = useNavigate();

    const goBackHomepage = useCallback(() => {
        navigate("/");
    }, [navigate]);

    useEffect(() => {
        if (!state) {
            goBackHomepage();
        }
        if (window.location.href.includes("/artist")) {
            setProperties({
                function: getArtistInfoFromName,
                dispatcher: [onGetArtist, onGetTopTracks, onGetTopAlbums],
                inputFields: [{ name: "Artist Name", key: "artistname" }],
                toLink: "/artist/",
            });
        }
    }, [goBackHomepage, state, onGetArtist, onGetTopTracks, onGetTopAlbums]);

    return state ? (
        <Grid container className={classes.searchpageContainer}>
            <Grid
                item
                xs={12}
                md={8}
                className={classes.searchpageImageGrid}
                style={{
                    backgroundImage:
                        state.backgroundId === 0
                            ? `url(${Background1})`
                            : state.backgroundId === 1
                            ? `url(${Background2})`
                            : state.backgroundId === 2
                            ? `url(${Background3})`
                            : `url(${Background4})`,
                }}
            >
                <ArrowBackOutlinedIcon onClick={() => goBackHomepage()} />
            </Grid>
            <Grid item xs={12} md={4} className={classes.searchpageFromGrid}>
                <SearchpageForm title={title} properties={properties} />
            </Grid>
        </Grid>
    ) : null;
};

export default compose(
    withStyles(useStyles),
    connect(mapStateToProps, mapDispatchToProps)
)(Searchpage);