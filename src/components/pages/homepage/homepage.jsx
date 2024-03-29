import React from "react";

import { Grid, Typography } from "@material-ui/core";

import HomepageVideo from "../../../assets/videos/video2.mp4";
import HomepageCard from "../../utils/HomepageCard/homepagecard";
import HomepageFooterCard from "../../utils/HomepageFooterCard/homepageFooterCard";
import "../../../App.css";

import MusicVideoIcon from "@mui/icons-material/MusicVideo";
import QueueMusicIcon from "@mui/icons-material/QueueMusic";
import LibraryMusicIcon from "@mui/icons-material/LibraryMusic";
import ReplayIcon from "@mui/icons-material/Replay";

const Homepage = () => {
    return (
        <Grid container style={{ height: "100vh" }}>
            <video
                className="main-page-video"
                autoPlay
                loop
                muted
                preload={"auto"}
            >
                <source src={HomepageVideo} type="video/mp4" />
            </video>
            <Grid container style={{ padding: "0 2rem" }}>
                <Grid
                    container
                    style={{ alignSelf: "flex-end", minHeight: "100%" }}
                >
                    <Grid
                        item
                        md={6}
                        sm={12}
                        className="main-page-grid-sm-12-md-6"
                    >
                        <Typography
                            variant="h3"
                            color="primary"
                            className="main-page-h3-text"
                            style={{
                                fontSize: "min(15vw, 3rem)",
                                padding: "2rem 0",
                                textAlign: "center",
                                maxWidth: "600px",
                            }}
                        >
                            You bring the passion, we bring the music.
                        </Typography>
                        <Typography
                            variant="subtitle1"
                            className="main-page-h3-text"
                            style={{
                                color: "white",
                                textAlign: "start",
                                maxWidth: "600px",
                            }}
                        >
                            Song recommender app helps you to give different
                            songs based on your search. <br /> Use the menu to
                            find music for you.
                        </Typography>
                        <Grid
                            container
                            className="container-bottom"
                            style={{
                                height: "max(200px, 5rem)",
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                alignSelf: "flex-end",
                            }}
                        >
                            <HomepageFooterCard
                                icon={<ReplayIcon />}
                                text="Check out weekly charts"
                                link="/charts"
                            />
                        </Grid>
                    </Grid>
                    <Grid item md={6} sm={12} className="main-page-grid">
                        <HomepageCard
                            icon={<MusicVideoIcon />}
                            text="Find similar artists"
                            pos="top-left"
                            link="/search/artist"
                        />
                        <HomepageCard
                            icon={<QueueMusicIcon />}
                            text="Find similar tracks"
                            pos="top-right"
                            link="/search/track"
                        />
                        <HomepageCard
                            icon={<LibraryMusicIcon />}
                            text="Find country hits"
                            pos="bot-left"
                            link="/search/geo"
                        />
                        <HomepageCard
                            icon={<ReplayIcon />}
                            text="Search similar tags"
                            pos="bot-right"
                            link="/search/tag"
                        />
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
};

export default Homepage;
