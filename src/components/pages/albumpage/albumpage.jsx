import React, { useEffect } from "react";

import { Grid, Typography } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";

import { compose } from "recompose";
import { connect } from "react-redux";

import { useParams } from "react-router-dom";

import * as loadingSelectors from "../../../redux/selectors/loadingSelectors";

import ResultBackground from "../../../assets/images/resultbackground.jpg";

import Songgrid from "../../utils/songGrid/songGrid";
import AlbumpageHeader from "../../utils/albumpageHeader/albumpageHeader";
import FadeInTitle from "../../utils/fadeInTitle/fadeInTitle";
import Loading from "../../utils/loading/loading";
import Header from "../../utils/header/header";

import { searchAlbum } from "../../../redux/actionCreators/albumActionCreators";

const useStyles = () => ({
    artistPageContainer: {
        backgroundColor: "white",
        backgroundSize: "cover",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        minHeight: "100vh",
        position: "relative",
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
        overflow: "auto",
    },
    albumGrid: {
        display: "grid",
        padding: "0 1.5rem",
        gridTemplateColumns: "auto auto",
        gridTemplateRows: "auto auto",
    },
    artistPageAlbumGrid: {
        padding: "1.5rem",
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
    leftGrid: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        paddingTop: "2rem",
        "& img": {
            "@media only screen and (min-width:1000px)": {
                position: "relative",
                bottom: "20%",
            },
            borderRadius: 20,
            border: "0.5px solid lightgray",
        },

        "& h6": {
            "@media only screen and (min-width:1000px)": {
                position: "relative",
                bottom: "15%",
            },
            padding: "2rem",
        },
    },
});

const Artistpage = ({ classes, albumState, searchAlbum, loadingState }) => {
    const { albumMbid } = useParams();

    useEffect(() => {
        if (!albumState.album) {
            searchAlbum(albumMbid);
        }
    }, []);
    return (
        Object.keys(albumState).length >= 1 &&
        albumState.album &&
        Object.keys(albumState.album).length >= 1 && (
            <Grid container className={classes.artistPageContainer}>
                {loadingState && <Loading />}
                <Grid container className={classes.artistPageUpperContainer}>
                    <Header />
                    <AlbumpageHeader albumState={albumState.album} />
                </Grid>
                <Grid container className={classes.artistPageContentContainer}>
                    <Grid
                        item
                        xs={12}
                        sm={6}
                        className={classes.artistPageSummaryGrid}
                    >
                        <FadeInTitle text="Best songs" />

                        <Grid item xs={12} className={classes.songListGrid}>
                            {albumState.album.tracks.track.map((el, ind) => (
                                <Songgrid
                                    key={el.name}
                                    item={el}
                                    ind={ind}
                                    mode={"album"}
                                />
                            ))}
                        </Grid>
                    </Grid>

                    <Grid item xs={12} sm={6} className={classes.leftGrid}>
                        <img
                            src={
                                albumState.album.image &&
                                albumState.album.image[5]["#text"]
                            }
                            alt={"cover"}
                        />
                        <Typography
                            variant="subtitle2"
                            style={{ paddingBottom: "3rem" }}
                        >
                            {albumState.album.wiki.summary.split("<a")[0]}
                        </Typography>
                    </Grid>
                </Grid>
            </Grid>
        )
    );
};

const mapStateToProps = (state) => ({
    albumState: state.albumState,
    loadingState: loadingSelectors.loadingState(state),
});

const mapDispatchToProps = (dispatch) => ({
    searchAlbum: (mbid) => dispatch(searchAlbum(mbid)),
});

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    withStyles(useStyles)
)(Artistpage);
