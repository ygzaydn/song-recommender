import React, { useEffect, useState } from "react";

import { Grid } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";

import { compose } from "recompose";
import { connect } from "react-redux";

import { useParams } from "react-router-dom";

import { mapDispatchToProps, mapStateToProps } from "../../../store";

import BackgroundImage from "../../../assets/images/resultpage.jpg";
import ResultBackground from "../../../assets/images/resultbackground.jpg";
import { getArtistInfoFromName } from "../../../axiosCalls";

import Albumgrid from "../../utils/albumGrid/albumGrid";
import Songgrid from "../../utils/songGrid/songGrid";
import Similarartist from "../../utils/similarArtistItem/similarArtist";
import ArtistpageHeader from "../../utils/artistpageHeader/artistpageHeader";
import FadeInTitle from "../../utils/fadeInTitle/fadeInTitle";

const useStyles = () => ({
    artistPageContainer: {
        backgroundColor: "white",
        backgroundSize: "cover",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
    },
    artistPageContentContainer: {
        maxWidth: "1250px",
        padding: "2rem 2rem 4rem 2rem",
        borderRight: "0.1px solid lightgray",
        borderLeft: "0.1px solid lightgray",
    },
    artistPageUpperContainer: {
        backgroundImage: `linear-gradient(to right, #000000b6,#000000b6), url(${ResultBackground})`,
        backgroundPosition: "center",
        padding: "3rem 0.5rem",
        margin: "3rem 0",
        display: "flex",
        justifyContent: "center",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
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
    artistPageSimilarGrid: {},
});

const Artistpage = ({
    classes,
    artistState,
    onGetArtist,
    onGetTopTracks,
    onGetTopAlbums,
}) => {
    const { artistId } = useParams();
    const [myArtist, setMyArtist] = useState("");
    const [maxListen, setMaxListen] = useState(0);
    useEffect(() => {
        if (artistState.length === 0 || myArtist !== artistId.split("=")[1]) {
            setMyArtist(artistId.split("=")[1]);
            getArtistInfoFromName(
                artistId.split("=")[1],
                onGetArtist,
                onGetTopTracks,
                onGetTopAlbums
            );
        }
        if (
            artistState.getTopTracks &&
            artistState.getTopTracks.track.length > 0
        ) {
            setMaxListen(artistState.getTopTracks.track[0].playcount);
        }
    }, [
        artistId,
        artistState.length,
        onGetArtist,
        onGetTopTracks,
        onGetTopAlbums,
        artistState.getTopTracks,
        myArtist,
    ]);

    return Object.keys(artistState).length > 0 &&
        artistState.getTopTracks &&
        artistState.getTopAlbums ? (
        <Grid container className={classes.artistPageContainer}>
            <Grid container className={classes.artistPageUpperContainer}>
                <ArtistpageHeader artistState={artistState} />
            </Grid>
            <Grid container className={classes.artistPageContentContainer}>
                <Grid item xs={6} className={classes.artistPageLeftGrid}>
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
                <Grid item xs={6} className={classes.artistPageRightGrid}>
                    <Grid item xs={12} className={classes.artistPageAlbumGrid}>
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
                <Grid item xs={12} className={classes.artistPageSimilarGrid}>
                    <FadeInTitle text="Similar artists" />
                    <Grid item xs={12} className={classes.similarArtistGrid}>
                        {artistState.getArtist.similar.artist.map((el) => (
                            <Similarartist item={el} key={el.name} />
                        ))}
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    ) : null;
};

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    withStyles(useStyles)
)(Artistpage);
