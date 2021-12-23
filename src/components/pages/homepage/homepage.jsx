import React from "react";

import { Grid, Typography } from "@material-ui/core";

import HomepageVideo from "../../../assets/videos/video2.mp4";
import HomepageCard from "../../utils/HomepageCard/homepagecard";

import MusicVideoIcon from "@mui/icons-material/MusicVideo";
import QueueMusicIcon from "@mui/icons-material/QueueMusic";
import LibraryMusicIcon from "@mui/icons-material/LibraryMusic";
import ReplayIcon from "@mui/icons-material/Replay";

const Homepage = () => {
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
                        text="Find similar artists"
                        pos="top"
                        link="/search/artist"
                    />
                    <HomepageCard
                        icon={<QueueMusicIcon />}
                        text="Find similar albums"
                        pos="top"
                    />
                    <HomepageCard
                        icon={<LibraryMusicIcon />}
                        text="Find similar songs"
                        pos="bot"
                    />
                    <HomepageCard
                        icon={<ReplayIcon />}
                        text="Hit songs by location"
                        pos="bot"
                    />
                </Grid>
            </Grid>
        </Grid>
    );
};

export default Homepage;
