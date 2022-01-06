import React, { useEffect, useState } from "react";

import { Grid } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";

import { compose } from "recompose";
import { connect } from "react-redux";

import { useParams } from "react-router-dom";

import * as artistSelectors from "../../../redux/selectors/artistSelectors";
import * as artistActionCreators from "../../../redux/actionCreators/artistActionCreators";
import * as loadingSelectors from "../../../redux/selectors/loadingSelectors";

import ResultBackground from "../../../assets/images/resultbackground.jpg";

import Albumgrid from "../../utils/albumGrid/albumGrid";
import Songgrid from "../../utils/songGrid/songGrid";
import Similarartist from "../../utils/similarArtistItem/similarArtist";
import ArtistpageHeader from "../../utils/artistpageHeader/artistpageHeader";
import FadeInTitle from "../../utils/fadeInTitle/fadeInTitle";
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
});

const Artistpage = ({
    classes,
    artistState,
    searchArtist,
    loadingState,
    getArtist,
}) => {
    const [maxListen, setMaxListen] = useState(0);
    const { artistName } = useParams();
    useEffect(() => {
        if ((getArtist && getArtist.name !== artistName) || !getArtist) {
            searchArtist(artistName);
        }
    }, []);

    useEffect(() => {
        if (
            artistState.length > 0 &&
            artistState.getTopTracks &&
            artistState.getTopTracks.track.length > 0
        ) {
            setMaxListen(artistState.getTopTracks.track[0].playcount);
        }
    }, [artistState]);

    return (
        Object.keys(artistState).length >= 3 && (
            <Grid container className={classes.artistPageContainer}>
                {loadingState && <Loading />}
                <Grid container className={classes.artistPageUpperContainer}>
                    <Header />
                    <ArtistpageHeader artistState={artistState} />
                </Grid>
                <Grid container className={classes.artistPageContentContainer}>
                    <Grid
                        item
                        xs={12}
                        sm={6}
                        className={classes.artistPageLeftGrid}
                    >
                        <FadeInTitle text="Best songs" />

                        <Grid item xs={12} className={classes.songListGrid}>
                            {artistState.getTopTracks.track
                                .filter((el, ind) => ind < 8)
                                .map((el, ind) => (
                                    <Songgrid
                                        key={el.name}
                                        item={el}
                                        ind={ind}
                                        maxListen={maxListen}
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
                            <FadeInTitle text="Best albums" />
                            <Grid item xs={12} className={classes.albumGrid}>
                                {artistState.getTopAlbums.album
                                    .filter((el, ind) => ind < 5)
                                    .map((el) => (
                                        <Albumgrid item={el} key={el.name} />
                                    ))}
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>

                <Grid container className={classes.artistPageSimilarContainer}>
                    <Grid
                        item
                        xs={12}
                        className={classes.artistPageSimilarGrid}
                    >
                        <FadeInTitle text="Similar artists" />
                        <Grid container className={classes.similarArtistGrid}>
                            {artistState.getArtist.similar.artist.map((el) => (
                                <Similarartist item={el} key={el.name} />
                            ))}
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        )
    );
};

const mapStateToProps = (state) => ({
    artistState: artistSelectors.artistState(state),
    getTopTracks: artistSelectors.artistTopTracks(state),
    getTopAlbums: artistSelectors.artistTopAlbums(state),
    getArtist: artistSelectors.artistInfo(state),
    loadingState: loadingSelectors.loadingState(state),
});

const mapDispatchToProps = (dispatch) => ({
    searchArtist: (artist) =>
        dispatch(artistActionCreators.searchArtist(artist)),
});

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    withStyles(useStyles)
)(Artistpage);
