import React, { useState, useEffect, useCallback } from "react";
import { Grid } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import Background1 from "../../../assets/images/search-1.jpg";
import Background2 from "../../../assets/images/search-2.jpg";
import Background3 from "../../../assets/images/search-3.jpg";
import Background4 from "../../../assets/images/search-4.jpg";

import ArrowBackOutlinedIcon from "@mui/icons-material/ArrowBackOutlined";
import HomeIcon from '@mui/icons-material/Home';

import { useLocation, useNavigate } from "react-router-dom";

import SearchpageForm from "../../utils/searchpageForm/searchpageForm";

import { connect } from "react-redux";
import { mapDispatchToProps, mapStateToProps } from "../../../store";

import { compose } from "recompose";

import {
    getArtistInfoFromName,
    getTrackFromSearchwithNameandArtist,
    getGeoInfo,
    getTagInfoFromName,
} from "../../../axiosCalls";

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
        "@media only screen and (max-width: 1000px)": {
            clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 80%)",
        },

        "& svg": {
            margin:"2rem",
            fill: "white",
            stroke: "white",
            height: 50,
            width: 50,
            cursor: "pointer",
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
        position: "relative",
        right: "1rem",
        zIndex: 2,
        "@media only screen and (max-width:1000px)": {
            right: 0,
        },
    },
});

const Searchpage = ({
    classes,
    searchText,
    title,
    onGetArtist,
    onGetTopTracks,
    onGetTopAlbums,
    onGetTrack,
    onGetSimilarTrack,
    onGetGeoTopArtists,
    onGetGeoTopTracks,
    onGetTag,
    onGetTopAlbumsTag,
    onGetTopArtistTag,
    onGetTopTracksTag,
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
        } else if (window.location.href.includes("/track")) {
            setProperties({
                function: getTrackFromSearchwithNameandArtist,
                dispatcher: [onGetTrack, onGetSimilarTrack],
                inputFields: [
                    { name: "Track Name", key: "trackName" },
                    { name: "Artist", key: "trackArtist" },
                ],
                toLink: "/track/",
            });
        } else if (window.location.href.includes("/geo")) {
            setProperties({
                function: getGeoInfo,
                dispatcher: [onGetGeoTopTracks, onGetGeoTopArtists],
                inputFields: [{ name: "Country", key: "country" }],
                toLink: "/geo/",
            });
        } else if (window.location.href.includes("/tag")) {
            setProperties({
                function: getTagInfoFromName,
                dispatcher: [
                    onGetTag,
                    onGetTopAlbumsTag,
                    onGetTopArtistTag,
                    onGetTopTracksTag,
                ],
                inputFields: [{ name: "Tag", key: "tag" }],
                toLink: "/tag/",
            });
        }
    }, [
        goBackHomepage,
        state,
        onGetArtist,
        onGetTopTracks,
        onGetTopAlbums,
        onGetTrack,
        onGetSimilarTrack,
        onGetGeoTopArtists,
        onGetGeoTopTracks,
        onGetTag,
        onGetTopAlbumsTag,
        onGetTopArtistTag,
        onGetTopTracksTag,
    ]);

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
                <ArrowBackOutlinedIcon onClick={() => navigate(-1)} style={{padding: "0 2rem"}}/>
                <HomeIcon onClick={()=>navigate("/")}/>
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
