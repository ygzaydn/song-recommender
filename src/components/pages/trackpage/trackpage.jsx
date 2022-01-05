import React, { useEffect } from "react";

import { Grid } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";

import { compose } from "recompose";
import { connect } from "react-redux";

import { useParams } from "react-router-dom";

import * as trackActionCreators from "../../../redux/actionCreators/trackActionCreators";

import * as trackSelectors from "../../../redux/selectors/trackSelectors";
import * as loadingSelectors from "../../../redux/selectors/loadingSelectors";

import ResultBackground from "../../../assets/images/resultbackground.jpg";

import Albumgrid from "../../utils/albumGrid/albumGrid";
import Songgrid from "../../utils/songGrid/songGrid";
import Similarartist from "../../utils/similarArtistItem/similarArtist";
import FadeInTitle from "../../utils/fadeInTitle/fadeInTitle";
import Trackpageheader from "../../utils/trackpageheader/trackpageheader";
import Loading from "../../utils/loading/loading";
import Header from "../../utils/header/header";

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
        height: "25rem",
        overflow: "hidden",
    },
    albumGrid: {
        display: "grid",
        padding: "0 1.5rem",
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

const Trackpage = ({
    classes,
    track,
    similarTracks,
    trackInfoState,
    searchTrackByMbid,
    isLoading,
}) => {
    const { trackMbid } = useParams();

    useEffect(() => {
        if (trackInfoState.length === 0) {
            searchTrackByMbid(trackMbid);
        }
    }, [trackInfoState, trackMbid, searchTrackByMbid]);

    return (
        Object.keys(trackInfoState).length > 1 && (
            <Grid container className={classes.artistPageContainer}>
                {isLoading && <Loading />}
                <Grid
                    container
                    className={classes.artistPageUpperContainer}
                    style={{
                        backgroundImage: track.album
                            ? `linear-gradient(to right, #000000b6,#000000b6), url(${track.album.image[3]["#text"]})`
                            : "lightgray",
                    }}
                >
                    <Header />
                    <Trackpageheader trackState={track} />
                </Grid>
                <Grid container className={classes.artistPageContentContainer}>
                    <Grid
                        item
                        xs={12}
                        sm={6}
                        className={classes.artistPageLeftGrid}
                    >
                        <FadeInTitle text="Similar songs" />
                        <Grid item xs={12} className={classes.songListGrid}>
                            {similarTracks
                                .filter((el, ind) => ind < 8)
                                .map((el, ind) => (
                                    <Songgrid
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
                        className={classes.artistPageRightGrid}
                    >
                        <Grid
                            item
                            xs={12}
                            className={classes.artistPageAlbumGrid}
                        >
                            <FadeInTitle text="Album Info" />
                            <Grid item xs={12} className={classes.albumGrid}>
                                <Albumgrid
                                    item={{
                                        name: track.album.title,
                                        image: track.album.image,
                                        url: track.album.url,
                                    }}
                                    key={track.album.name}
                                />
                            </Grid>
                        </Grid>
                        <Grid
                            item
                            xs={12}
                            className={classes.artistPageAlbumGrid}
                        >
                            <FadeInTitle text="Artist Info" />
                            <Grid
                                container
                                className={classes.similarArtistGrid}
                            >
                                <Similarartist
                                    item={track.artist}
                                    key={track.artist.name}
                                />
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        )
    );
};

const mapStateToProps = (state) => ({
    track: trackSelectors.track(state),
    similarTracks: trackSelectors.similarTracks(state),
    trackInfoState: trackSelectors.trackState(state),
    isLoading: loadingSelectors.loadingState(state),
});

const mapDispatchToProps = (dispatch) => ({
    searchTrackByMbid: (mbid) =>
        dispatch(trackActionCreators.searchTrackByMbid(mbid)),
});

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    withStyles(useStyles)
)(Trackpage);
