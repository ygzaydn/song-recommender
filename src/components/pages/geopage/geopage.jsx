import React, { useEffect, useState } from "react";

import { Grid } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";

import { compose } from "recompose";
import { connect } from "react-redux";

import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import { mapDispatchToProps, mapStateToProps } from "../../../store";

import ArrowBackOutlinedIcon from "@mui/icons-material/ArrowBackOutlined";
import HomeIcon from '@mui/icons-material/Home';
import ResultBackground from "../../../assets/images/resultbackground.jpg";

import { getGeoInfo } from "../../../axiosCalls";

import GeopageHeader from "../../utils/geopageheader/geopageheader";
import FadeInTitle from "../../utils/fadeInTitle/fadeInTitle";
import HitGrid from "../../utils/hitGrid/hitGrid";
import Loading from '../../utils/loading/loading'

const useStyles = () => ({
    artistPageContainer: {
        backgroundColor: "white",
        backgroundSize: "cover",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        minHeight: "100vh",
    },
    artistPageContentContainer: {
        maxWidth: "1250px",
        padding: "1rem",
        margin: "1rem 0",
        borderRight: "0.1px solid lightgray",
        borderLeft: "0.1px solid lightgray",
    },
    artistPageUpperContainer: {
        backgroundImage: `linear-gradient(to right, #000000b6,#000000b6), url(${ResultBackground})`,
        backgroundPosition: "center",
        padding: "2rem 0.5rem 3rem 0.5rem",
        display: "flex",
        justifyContent: "center",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 90%)",
    },
    songBarGrid: {
        display: "flex",
        transform: "translateX(-50rem)",
        animationName: "fromLeft",
        animationDuration: "1.5s",
        animationFillMode: "forwards",
    },
    songListGrid: {
        height: "35rem",
        overflowY: "scroll",
        overflowX: "hidden",
    },
    albumGrid: {
        display: "grid",
        padding: "0 1.5rem",
    },
    artistPageAlbumGrid: {
        padding: "0 1.5rem",
        display: "flex",
        flexDirection: "column",
    },
    artistPageSimilarContainer: {
        maxWidth: 1600,
        display: "flex",
        justifyContent: "center",
        padding: "1rem 3rem",
    },
    similarArtistGrid: {
        display: "flex",
    },
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

const Geopage = ({
    classes,
    geoState,
    onGetGeoTopArtists,
    onGetGeoTopTracks,
}) => {
    const [countryName, setCountryName] = useState("");

    const navigate = useNavigate();
    const { countryId } = useParams();

    const { getGeoTopArtists, getGeoTopTracks } = geoState;

    useEffect(() => {
        if (countryId.length === 0 || countryName !== countryId) {
            setCountryName(countryId);
        }
        if (countryId.length > 0 && countryName.length === 0) {
            getGeoInfo(countryId, onGetGeoTopTracks, onGetGeoTopArtists);
        }
    }, [countryId, countryName, onGetGeoTopArtists, onGetGeoTopTracks]);

    return Object.keys(geoState).length > 1 ? (
        <Grid container className={classes.artistPageContainer}>
            <Grid container className={classes.artistPageUpperContainer}>
                <Grid item xs={12} className={classes.searchpageImageGrid}>
                    <ArrowBackOutlinedIcon onClick={() => navigate(-1)} style={{padding: "0 2rem"}}/>
                    <HomeIcon onClick={()=>navigate("/")}/>
                </Grid>
                <GeopageHeader countryName={countryName} />
            </Grid>
            <Grid container className={classes.artistPageContentContainer}>
                <Grid
                    item
                    xs={12}
                    sm={6}
                    className={classes.artistPageLeftGrid}
                    style={{ padding: "2%" }}
                >
                    <FadeInTitle text="Hit songs" />
                    <Grid item xs={12} className={classes.songListGrid}>
                        {getGeoTopTracks
                            .filter((el, ind) => ind < 25)
                            .map((el, ind) => (
                                <HitGrid
                                    key={el.name}
                                    item={el}
                                    ind={ind}
                                    maxListen={1}
                                />
                            ))}
                    </Grid>
                </Grid>
                <Grid
                    item
                    xs={12}
                    sm={6}
                    className={classes.artistPageLeftGrid}
                    style={{ padding: "2%" }}
                >
                    <FadeInTitle text="Hit bands" />
                    <Grid item xs={12} className={classes.songListGrid}>
                        {getGeoTopArtists
                            .filter((el, ind) => ind < 25)
                            .map((el, ind) => (
                                <HitGrid
                                    key={el.name}
                                    item={el}
                                    ind={ind}
                                    mode="artist"
                                />
                            ))}
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    ) : <Loading />;
};

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    withStyles(useStyles)
)(Geopage);
