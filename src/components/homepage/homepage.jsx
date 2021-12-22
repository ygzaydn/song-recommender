import React from "react";
import { connect } from "react-redux";

import { mapDispatchToProps, mapStateToProps } from "../../store";
import { Grid, Typography } from "@material-ui/core";

import HomepageVideo from "../../assets/videos/video2.mp4";
import HomepageCard from "../HomepageCard/homepagecard";

import MusicVideoIcon from "@mui/icons-material/MusicVideo";
import QueueMusicIcon from "@mui/icons-material/QueueMusic";
import LibraryMusicIcon from "@mui/icons-material/LibraryMusic";
import ReplayIcon from "@mui/icons-material/Replay";

const Homepage = ({
    onStateChange,
    onResetTrackState,
    onResetArtistState,
    onResetTagState,
    onResetGeoState,
}) => {
    return (
        <Grid container style={{ height: "100vh" }}>
            <video className="main-page-video" autoPlay loop muted>
                <source src={HomepageVideo} type="video/mp4" />
            </video>
            <Grid
                container
                style={{ maxWidth: 1440, margin: "auto", padding: "0 2rem" }}
            >
                <Grid item md={6} sm={12} className="main-page-grid-sm-12-md-6">
                    <Typography
                        variant="h3"
                        color="primary"
                        className="main-page-h3-text"
                    >
                        Find the best&nbsp;
                        <strong style={{ color: "lightgray" }}>music</strong>
                        &nbsp;for your taste
                    </Typography>
                </Grid>
                <Grid
                    item
                    md={6}
                    sm={12}
                    className="main-page-grid-sm-12-md-6 main-page-grid"
                >
                    <HomepageCard
                        icon={<MusicVideoIcon />}
                        text="Artist"
                        pos="top"
                    />
                    <HomepageCard
                        icon={<QueueMusicIcon />}
                        text="Album"
                        pos="top"
                    />
                    <HomepageCard
                        icon={<LibraryMusicIcon />}
                        text="Song"
                        pos="bot"
                    />
                    <HomepageCard
                        icon={<ReplayIcon />}
                        text="Location"
                        pos="bot"
                    />
                </Grid>
            </Grid>
        </Grid>
    );
};

export default connect(mapStateToProps, mapDispatchToProps)(Homepage);
