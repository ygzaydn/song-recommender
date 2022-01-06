import React, { useState, useEffect } from "react";

import { Grid, Typography } from "@material-ui/core";

import { withStyles } from "@material-ui/core/styles";

import { connect } from "react-redux";
import { compose } from "recompose";

import { CircleMenu, CircleMenuItem } from "react-circular-menu";

import AlbumIcon from "@mui/icons-material/Album";
import TagIcon from "@mui/icons-material/Tag";
import TrackChangesIcon from "@mui/icons-material/TrackChanges";
import { getChartsThunk } from "../../../redux/actionCreators/chartActionCreators";
import Loading from "../../utils/loading/loading";
import FadeInTitle from "../../utils/fadeInTitle/fadeInTitle";

const useStyles = () => ({
    chartspageContainer: {
        height: "100vh",
        width: "100vw",
    },
    chartspageBackground: {
        background: "lightblue",
        clipPath: "polygon(0% 0%, 50% 0%, 60% 100%, 0% 100%)",
        position: "absolute",
        zIndex: 0,
        height: "100vh",
        width: "100vw",
    },
    circleMenuGrid: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    },
    contentGrid: {
        position: "relative",
        zIndex: 10,
        padding: "2rem",
        borderRadius: 20,
        border: "solid 0.2px black",
        height: "100%",
        width: "100%",
        overflow: "hidden",
    },
});
const Chartspage = ({ classes, chartState, getCharts, isLoading }) => {
    const [pageState, setPageState] = useState("Artist");
    useEffect(() => {
        getCharts();
    }, []);

    return (
        <Grid container className={classes.chartspageContainer}>
            <Grid item xs={12} className={classes.chartspageBackground} />
            {isLoading && <Loading />}
            <Grid item xs={4} className={classes.circleMenuGrid}>
                <Grid item xs={6}>
                    <CircleMenu
                        startAngle={-90}
                        rotationAngle={180}
                        itemSize={3}
                        radius={9}
                        rotationAngleInclusive={true}
                    >
                        <CircleMenuItem
                            onClick={() => setPageState("Artist")}
                            tooltip="Top Artists"
                            tooltipPlacement="right"
                        >
                            <AlbumIcon />
                        </CircleMenuItem>
                        <CircleMenuItem
                            onClick={() => setPageState("Tag")}
                            tooltip="Top Tags"
                        >
                            <TagIcon />
                        </CircleMenuItem>
                        <CircleMenuItem
                            onClick={() => setPageState("Track")}
                            tooltip="Top Tracks"
                        >
                            <TrackChangesIcon />
                        </CircleMenuItem>
                    </CircleMenu>
                </Grid>
            </Grid>
            <Grid
                item
                xs={8}
                style={{
                    padding: "3rem",
                    maxWidth: 1200,
                    margin: "auto",
                    height: "100%",
                }}
            >
                <Grid item xs={12} className={classes.contentGrid}>
                    {pageState === "Artist" &&
                        chartState &&
                        chartState.topArtists && (
                            <Grid container style={{height:"100%"}}>
                                <Grid
                                    item
                                    xs={12}
                                    style={{
                                        borderBottom: "0.2px solid lightgray",
                                        padding: "1rem 0",
                                    }}
                                >
                                    <FadeInTitle text="Best Artists" />
                                </Grid>
                                <Grid
                                    item
                                    xs={12}
                                    style={{
                                        maxHeight: "100%",
                                        overflowY: "scroll",
                                        paddingBot:"2rem"
                                    }}
                                >
                                    {chartState.topArtists.map((el) => (
                                        <Grid
                                            container
                                            key={
                                                el.mbid + el.name + el.listeners
                                            }
                                            style={{
                                                borderBottom:
                                                    "0.2px solid lightgray",
                                                padding: "1rem 0",
                                            }}
                                        >
                                            <Grid item xs={6}>
                                                <Typography color="primary">
                                                    {el.name}
                                                </Typography>
                                            </Grid>
                                            <Grid
                                                item
                                                xs={6}
                                                style={{ display: "flex" }}
                                            >
                                                <Typography color="primary">
                                                    Listeners: <br />
                                                    {el.listeners}
                                                </Typography>
                                                <Typography color="primary">
                                                    Playcount: <br />
                                                    {el.playcount}
                                                </Typography>
                                            </Grid>

                                            <Grid item xs={12}>
                                                <Typography color="primary">
                                                    {el.url}
                                                </Typography>
                                            </Grid>
                                        </Grid>
                                    ))}
                                </Grid>
                            </Grid>
                        )}
                </Grid>
            </Grid>
        </Grid>
    );
};

const mapStateToProps = (state) => ({
    chartState: state.chartState,
    isLoading: state.loadingState.loading,
});

const mapDispatchToProps = (dispatch) => ({
    getCharts: () => dispatch(getChartsThunk()),
});

export default compose(
    withStyles(useStyles),
    connect(mapStateToProps, mapDispatchToProps)
)(Chartspage);
