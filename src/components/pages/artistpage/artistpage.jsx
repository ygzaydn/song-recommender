import React, { useEffect, useState } from "react";

import { Grid, Typography, Chip } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";

import { compose } from "recompose";
import { connect } from "react-redux";

import { useParams } from "react-router-dom";

import { mapDispatchToProps, mapStateToProps } from "../../../store";

import BackgroundImage from "../../../assets/images/resultpage.jpg";
import { getArtistInfoFromName } from "../../../axiosCalls";

const useStyles = () => ({
    "@global": {
        "@keyframes fromLeft": {
            "0%": {
                transform: "translateX(-50rem)",
            },
            "90%": {
                transform: "translateX(2rem)",
            },
            "100%": {
                transform: "translateX(0rem)",
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

    artistPageContainer: {
        backgroundImage: `url(${BackgroundImage})`,
        height: "100vh",
        backgroundSize: "cover",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    },
    artistPageContentContainer: {
        maxWidth: "1400px",
        padding: "2rem 2rem 4rem 2rem",
    },
    artistPageUpperContainer: {
        background: "black",
        padding: "3rem 0.5rem",
        display: "flex",
        justifyContent: "center",
    },
    artistPageUpperContentGrid: {
        maxWidth: "900px",
        padding: "0 2%",
        display: "flex",
        alignItems: "center",
    },
    artistPageUpperGridTitle: {
        marginBottom: "0.5rem",
    },
    artistPageUpperGridBio: {
        color: "lightGray",
        textDecoration: "underline",
        cursor: "pointer",
        paddingLeft: "2rem",
    },
    artistPageUpperGridStats: {
        display: "inline-block",
        color: "gray",
        paddingRight: "5rem",
        paddingTop: "1.5rem",
        fontWeight: 600,
        paddingLeft: "2rem",
    },
    artistPageUpperGridTags: {
        margin: "0.5rem",
        transition: "all 0.5s",
        borderRadius: 0,
        fontSize: "1rem",
        "&:hover": {
            backgroundColor: "#3f51b5 !important",
            color: "white !important",
        },
    },
    bestSongText: {
        color: "white",
        paddingBottom: "1rem",
        opacity: 0,
        animationName: "fadeIn",
        animationDuration: "3s",
        animationFillMode: "forwards",
    },
    songBarGrid: {
        display: "flex",
        color: "white",
        transform: "translateX(-50rem)",
        animationName: "fromLeft",
        animationDuration: "1.5s",
        animationFillMode: "forwards",
    },
    songListGrid: {
        height: "25rem",
        overflow: "hidden",
    },
    albumGridItem:{
        display:'flex',
    }
});

const Artistpage = ({
    classes,
    artistState,
    onGetArtist,
    onGetTopTracks,
    onGetTopAlbums,
}) => {
    const { artistId } = useParams();
    const [maxListen, setMaxListen] = useState(0);
    useEffect(() => {
        if (artistState.length === 0) {
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
    ]);
    console.log(artistState);

    console.log(maxListen);

    const routeToBio = () => {
        window.open(artistState.getArtist.bio.links.link.href);
    };

    return Object.keys(artistState).length > 0 && artistState.getTopTracks && artistState.getTopAlbums ? (
        <Grid container className={classes.artistPageContainer}>
            <Grid container className={classes.artistPageUpperContainer}>
                <Grid
                    item
                    xs={12}
                    className={classes.artistPageUpperContentGrid}
                >
                    <Grid item xs={8}>
                        <Typography
                            color="primary"
                            variant="h2"
                            className={classes.artistPageUpperGridTitle}
                        >
                            {artistState.getArtist.name.toUpperCase()}
                        </Typography>
                        <Typography
                            variant="subtitle2"
                            className={classes.artistPageUpperGridBio}
                            onClick={() => {
                                routeToBio();
                            }}
                        >
                            Click for bio
                        </Typography>
                        <Typography
                            variant="subtitle2"
                            className={classes.artistPageUpperGridStats}
                        >
                            Listeners:
                            <br />
                            <strong style={{ color: "white" }}>
                                {artistState.getArtist.stats.listeners}
                            </strong>
                            <br />
                        </Typography>
                        <Typography
                            variant="subtitle2"
                            className={classes.artistPageUpperGridStats}
                        >
                            Play count:
                            <br />
                            <strong style={{ color: "white" }}>
                                {artistState.getArtist.stats.playcount}
                            </strong>
                            <br />
                        </Typography>
                    </Grid>
                    <Grid item xs={4}>
                        {artistState.getArtist.tags.tag.map((el) => (
                            <Chip
                                color="primary"
                                label={el.name}
                                key={el.name}
                                variant="outlined"
                                onClick={() => window.open(el.url)}
                                className={classes.artistPageUpperGridTags}
                            />
                        ))}
                    </Grid>
                </Grid>
            </Grid>
            <Grid container className={classes.artistPageContentContainer}>
                <Grid item xs={6} className={classes.artistPageLeftGrid}>
                    <Grid item xs={12}>
                        <Typography
                            variant="h6"
                            className={classes.bestSongText}
                        >
                            Best songs
                        </Typography>
                    </Grid>
                    <Grid item xs={12} className={classes.songListGrid}>
                        {artistState.getTopTracks.track
                            .filter((el, ind) => ind < 8)
                            .map((el, ind) => (
                                <Grid
                                    item
                                    xs={12}
                                    key={el.name}
                                    className={classes.songBarGrid}
                                    style={{
                                        padding: "1%",
                                        animationDelay: `${
                                            parseInt(ind) * 50
                                        }ms`,
                                    }}
                                >
                                    <Grid item xs={7}>
                                        <Typography variant="subtitle1">
                                            {el.name}{" "}
                                        </Typography>
                                    </Grid>
                                    <Grid
                                        item
                                        xs={5}
                                        style={{
                                            background: "gray",
                                            border: "0.1px solid gray",
                                            borderRadius: "5px",
                                        }}
                                    >
                                        <Typography
                                            variant="subtitle1"
                                            style={{
                                                width: `${
                                                    (100 *
                                                        parseInt(
                                                            el.playcount
                                                        )) /
                                                    parseInt(maxListen)
                                                }%`,
                                                display: "inline-block",
                                                background: "#3f51b5",
                                                border: "0.1px solid #3f51b5",
                                                borderRadius: "5px",
                                                height: "100%",
                                            }}
                                        >
                                            {el.playcount}&nbsp;
                                            {ind === 0 ? "listeners" : null}
                                        </Typography>
                                    </Grid>
                                </Grid>
                            ))}
                    </Grid>
                </Grid>
                <Grid item xs={6} className={classes.artistPageRightGrid}>
                    
                </Grid>
            </Grid>

        <Grid container>
        <Grid item xs={12} className={classes.artistPageAlbumGrid}>
                            <Typography
                                variant="h6"
                                className={classes.bestSongText}
                            >
                                Best albums
                            </Typography>
                        <Grid item xs={12} className={classes.albumGrid}>
                            {artistState.getTopAlbums.album.filter((el,ind) => ind <5 ).map(el => <Grid key={el.name} item xs={12} className={classes.albumGridItem}> 
                                    <img src={el.image[1].["#text"]} alt={el.image[1].["#text"]}/>
                                    <Typography
                                variant="h6"
                                className={classes.bestSongText}
                                onClick={() => window.open(el.url)}
                            >
                               {el.name}
                            </Typography>
                                </Grid>)}
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
