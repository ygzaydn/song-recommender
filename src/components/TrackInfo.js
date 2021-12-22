import React, { useState } from "react";
import {
    Grid,
    Paper,
    Typography,
    Collapse,
    GridList,
} from "@material-ui/core/";
import "fontsource-roboto";
import { mapDispatchToProps, mapStateToProps } from "../store";
import { connect } from "react-redux";
import { BigCard } from "./BigCard-Component/BigCard";
import { BigCardwithoutIteration } from "./BigCard-Component/BigCardwithoutIteration";
import { ConnectedSmallCard } from "./SmallCard";
import { StyledTextField } from "./StyledTextField";
import { StyledButton } from "./StyledButtonComponent";
import {
    getTrackFromSearchwithNameandArtist,
    getTagInfoFromName,
} from "../axiosCalls";
import { artistInfoStyle } from "../themes";

const TrackInfo = ({
    trackInfoState,
    onGetTrack,
    onGetSimilarTrack,
    onStateChange,
    onGetTag,
    onGetTopAlbumsTag,
    onGetTopArtistTag,
    onGetTopTracksTag,
}) => {
    const classes = artistInfoStyle();
    const [checked, setChecked] = useState(false);
    const [trackName, setTrackName] = useState("");
    const [trackArtist, setTrackArtist] = useState("");

    const getTrackName = (event) => {
        setTrackName(event.target.value);
    };

    const getTrackArtist = (event) => {
        setTrackArtist(event.target.value);
    };

    const unCollapse = () => {
        setChecked((prev) => !prev);
    };
    return (
        <div className={classes.root}>
            {trackInfoState.getTrack && trackInfoState.getSimilarTrack ? (
                <Paper className={classes.paper}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <Paper className={classes.title}>
                                {trackInfoState.getTrack.name}
                            </Paper>
                        </Grid>
                        <Grid item xs={12} className={classes.collapseStyle}>
                            <Typography
                                variant="subtitle1"
                                className={classes.bioTitle}
                                onClick={unCollapse}
                            >
                                {checked
                                    ? "Click to close!"
                                    : "Click to open Artist Info"}
                            </Typography>
                            <Collapse in={checked} collapsedSize={150}>
                                <Typography
                                    className={classes.bio}
                                    style={{ border: "none" }}
                                >
                                    Artist Name:{" "}
                                    {trackInfoState.getTrack.artist.name}
                                </Typography>
                                <Typography
                                    className={classes.bio}
                                    style={{ border: "none" }}
                                >
                                    {trackInfoState.getTrack.artist.url}
                                </Typography>
                            </Collapse>
                        </Grid>
                        <Grid item xs={6}>
                            <GridList className={classes.gridList} cols={1}>
                                <ConnectedSmallCard
                                    clickInfo={false}
                                    title="Stats"
                                    data1={trackInfoState.getTrack.listeners}
                                    data2={trackInfoState.getTrack.playcount}
                                    par1="Listeners"
                                    par2="Playcount"
                                    stats={true}
                                />
                            </GridList>
                        </Grid>
                        <Grid item xs={6}>
                            <GridList className={classes.gridList} cols={1}>
                                <ConnectedSmallCard
                                    clickInfo={true}
                                    title="Top Tags"
                                    data1={trackInfoState.getTrack.toptags.tag}
                                    clickInfoFunction={(name) =>
                                        getTagInfoFromName(
                                            name,
                                            onGetTag,
                                            onGetTopAlbumsTag,
                                            onGetTopArtistTag,
                                            onGetTopTracksTag,
                                            onStateChange
                                        )
                                    }
                                />
                            </GridList>
                        </Grid>
                        {
                            <Grid item xs={12}>
                                <BigCardwithoutIteration
                                    data={trackInfoState.getTrack.album}
                                    title="Album of the song"
                                    iterable={false}
                                />
                            </Grid>
                        }
                        <Grid item xs={12}>
                            <BigCard
                                data={trackInfoState.getSimilarTrack}
                                icon={true}
                                title="Similar Tracks"
                            />
                        </Grid>
                    </Grid>
                </Paper>
            ) : (
                <div>
                    <form
                        className={classes.form}
                        noValidate
                        autoComplete="off"
                    >
                        <StyledTextField
                            label="Track Name"
                            onChange={getTrackName}
                        />
                        <StyledTextField
                            label="Track Artist"
                            onChange={getTrackArtist}
                        />
                        <StyledButton
                            color="primary"
                            variant="outlined"
                            onClick={() => {
                                getTrackFromSearchwithNameandArtist(
                                    trackName,
                                    trackArtist,
                                    onGetTrack,
                                    onGetSimilarTrack,
                                    onStateChange
                                );
                            }}
                        >
                            Search
                        </StyledButton>
                    </form>
                </div>
            )}
        </div>
    );
};

export const ConnectedTrackInfo = connect(
    mapStateToProps,
    mapDispatchToProps
)(TrackInfo);
