import React from "react";
import { Grid, Typography } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import { compose } from "recompose";

import { getTrackFromSearch, getArtistInfoFromName } from "../../../axiosCalls";
import { connect } from "react-redux";
import { mapDispatchToProps, mapStateToProps } from "../../../store";
import { useNavigate } from "react-router";

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

    songBarGrid: {
        display: "flex",
        transform: "translateX(-50rem)",
        animationName: "fromLeft",
        animationDuration: "1.5s",
        animationFillMode: "forwards",
    },

    songNameTypo: {
        display: "inline-block",
        textDecoration: "underline",
        transition: "all .5s",
        "&:hover": {
            cursor: "pointer",
            textDecoration: "none",
            paddingLeft: "1rem",
        },
    },

    songRankInfo: {
        display: "inline-block",
        color: "gray",
    },
});

const Hitgrid = ({
    classes,
    item,
    ind,
    onGetTrack,
    onGetSimilarTrack,
    onGetArtist,
    onGetTopTracks,
    onGetTopAlbums,
    mode,
}) => {
    const { name, listeners, artist, mbid } = item;
    const navigate = useNavigate();

    const getSong = () => {
        getTrackFromSearch(mbid, onGetTrack, onGetSimilarTrack).then(() => {
            navigate(`/track/${mbid}}`);
        });
    };

    const getArtist = (mbid, artistName) => {
        getArtistInfoFromName(
            artistName,
            onGetArtist,
            onGetTopTracks,
            onGetTopAlbums
        ).then(() => {
            navigate(`/artist/${artistName.replace(/ /g, "%20")}`);
        });
    };

    return (
        <Grid
            item
            xs={12}
            key={mbid}
            className={classes.songBarGrid}
            style={{
                padding: "1%",
                animationDelay: `${parseInt(ind + 1) * 10}ms`,
            }}
        >
            <Grid
                item
                xs={8}
                style={{
                    position: "relative",
                    display: "flex",
                    flexDirection: "column",
                }}
            >
                <Typography
                    variant="h6"
                    onClick={() =>
                        mode === "artist" ? getArtist(mbid, name) : getSong()
                    }
                    className={classes.songNameTypo}
                >
                    {name}{" "}
                </Typography>
                {mode !== "artist" && (
                    <Typography
                        variant="subtitle2"
                        onClick={() => getArtist(artist.mbid, artist.name)}
                        className={classes.songNameTypo}
                        style={{ color: "gray" }}
                    >
                        {artist.name}
                    </Typography>
                )}
            </Grid>
            {mode !== "tagSong" ? (
                <Grid
                    item
                    xs={4}
                    style={{
                        margin: "auto",
                    }}
                >
                    <Typography
                        color="primary"
                        variant="subtitle1"
                        onClick={() => getSong()}
                        className={classes.songRankInfo}
                    >
                        {listeners}
                        <strong> listeners</strong>
                    </Typography>
                </Grid>
            ) : (
                <Grid
                    item
                    xs={4}
                    style={{
                        margin: "auto",
                    }}
                >
                    <Typography
                        color="primary"
                        variant="subtitle1"
                        onClick={() => getSong()}
                        className={classes.songRankInfo}
                    >
                        <strong>Rank: #</strong>
                        {item["@attr"].rank}
                    </Typography>
                </Grid>
            )}
        </Grid>
    );
};

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    withStyles(useStyles)
)(Hitgrid);
