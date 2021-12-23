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
import { ConnectedSmallCard } from "./SmallCard";
import { getArtistInfoFromName } from "../axiosCalls";
import { StyledButton } from "./StyledButtonComponent";
import { StyledTextField } from "./StyledTextField";
import { artistInfoStyle } from "../themes";

const ArtistInfo = ({
    artistState,
    onGetArtist,
    onStateChange,
    onGetTopAlbums,
    onGetTopTracks,
    onRecommendArtist,
}) => {
    const classes = artistInfoStyle();
    const [checked, setChecked] = useState(false);
    const [searchText, setSearchText] = useState("");

    const setTextField = (event) => {
        setSearchText(event.target.value);
    };

    const unCollapse = () => {
        setChecked((prev) => !prev);
    };
    const getArtistInfoFromNamewithInput = (name) =>
        getArtistInfoFromName(
            name,
            onGetArtist,
            onGetTopTracks,
            onGetTopAlbums,
            onStateChange
        );
    return (
        <div className={classes.root}>
            {artistState.getArtist &&
            artistState.getTopAlbums &&
            artistState.getTopTracks ? (
                <Paper className={classes.paper}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <Paper className={classes.title}>
                                {artistState.getArtist.name}
                            </Paper>
                        </Grid>
                        <Grid item xs={12} className={classes.collapseStyle}>
                            <Typography
                                variant="subtitle1"
                                className={classes.bioTitle}
                                onClick={unCollapse}
                            >
                                {checked
                                    ? "Click to close bio!"
                                    : "Click here for bio!"}
                            </Typography>
                            <Collapse in={checked} collapsedSize={150}>
                                <Typography className={classes.bio}>
                                    {
                                        artistState.getArtist.bio.content.split(
                                            "<a hr"
                                        )[0]
                                    }
                                </Typography>
                            </Collapse>
                        </Grid>
                        <Grid item xs={6}>
                            <GridList className={classes.gridList} cols={1}>
                                <ConnectedSmallCard
                                    clickInfo={false}
                                    title="Stats"
                                    data1={
                                        artistState.getArtist.stats.listeners
                                    }
                                    data2={
                                        artistState.getArtist.stats.playcount
                                    }
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
                                    title="Similar Artists"
                                    data1={artistState.getArtist.similar.artist}
                                    clickInfoFunction={
                                        getArtistInfoFromNamewithInput
                                    }
                                />
                            </GridList>
                        </Grid>
                        <Grid item xs={12}>
                            <BigCard
                                data={artistState.getTopTracks.track}
                                icon={true}
                                title="Best Songs"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <BigCard
                                data={artistState.getTopAlbums.album}
                                title="Best Albums"
                            />
                        </Grid>
                    </Grid>
                </Paper>
            ) : (
                <form className={classes.form} noValidate autoComplete="off">
                    <StyledTextField
                        label="Artist Name"
                        onChange={setTextField}
                    />
                    <StyledButton
                        color="primary"
                        variant="outlined"
                        onClick={() =>
                            getArtistInfoFromName(
                                searchText,
                                onGetArtist,
                                onGetTopTracks,
                                onGetTopAlbums,
                                onStateChange
                            )
                        }
                    >
                        Search
                    </StyledButton>
                </form>
            )}
        </div>
    );
};

export const ConnectedArtistInfo = connect(
    mapStateToProps,
    mapDispatchToProps
)(ArtistInfo);
