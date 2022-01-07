import React, { useState, useEffect } from "react";

import { Grid, Typography } from "@material-ui/core";

import { withStyles } from "@material-ui/core/styles";

import { connect } from "react-redux";
import { compose } from "recompose";

import { getChartsThunk } from "../../../redux/actionCreators/chartActionCreators";
import Loading from "../../utils/loading/loading";

import ChartsBestArtist from "../../utils/charts/chartsBestArtist";
import ChartsBestTag from "../../utils/charts/chartsBestTag";
import ChartsBestTrack from "../../utils/charts/chartsBestTrack";
import CircleMenuCustomized from "../../utils/circleMenu/circlemenu";

const useStyles = () => ({
    chartspageContainer: {
        height: "100vh",
        width: "100vw",
    },
    chartspageBackground: {
        background: "rgb(255, 253, 105)",
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
        maxHeight: "35vh",
    },
    contentGrid: {
        position: "relative",
        zIndex: 10,
        padding: "2rem",
        borderTopLeftRadius: 80,
        borderBottomRightRadius: 80,
        border: "solid 0.2px black",
        height: "100%",
        width: "100%",
        overflow: "hidden",
    },
    leftMainGrid: {
        padding: "3rem",
        maxWidth: 1000,
        margin: "auto",
        height: "100%",
    },
    rightMainGridTitle: {
        padding: "1rem",
        textAlign: "center",
        paddingTop: "5rem",
    },
    rightMainGrid: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-evenly",
        alignItems: "center",
        "& h6": {
            fontSize: "2.5rem !important",
            color: "black",
        },
    },

    "@global": {
        "@keyframes fromLeft": {
            "0%": {
                transform: "translateX(-100%)",
            },
            "75%": {
                transform: "translateX(1%)",
            },
            "100%": {
                transform: "translateX(0%)",
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

    textStyle: {
        paddingBottom: "1rem",
        opacity: 0,
        animationName: "fadeIn",
        animationDuration: "3s",
        animationFillMode: "forwards",
    },
});
const Chartspage = ({ classes, chartState, getCharts, isLoading }) => {
    const [pageState, setPageState] = useState("Artists");

    useEffect(() => {
        getCharts();
    }, []);

    const changeState = (state) => {
        setPageState(state);
    };

    return (
        <Grid container className={classes.chartspageContainer}>
            <Grid item xs={12} className={classes.chartspageBackground} />
            {isLoading && <Loading />}
            <Grid item xs={5} className={classes.rightMainGrid}>
                <Grid item xs={12} className={classes.circleMenuGrid}>
                    <CircleMenuCustomized
                        state={pageState}
                        changeState={(x) => changeState(x)}
                    />
                </Grid>
                <Grid item xs={12} className={classes.rightMainGridTitle}>
                    <Typography
                        variant="subtitle1"
                        color="primary"
                        className={classes.textStyle}
                    >
                        TOP <br />{" "}
                        <strong style={{ fontSize: "5rem" }}>
                            {pageState.toUpperCase()}
                        </strong>
                    </Typography>
                </Grid>
            </Grid>
            <Grid item xs={7} className={classes.leftMainGrid}>
                <Grid item xs={12} className={classes.contentGrid}>
                    {pageState === "Artists" &&
                        chartState &&
                        chartState.topArtists && (
                            <Grid container style={{ height: "100%" }}>
                                <Grid
                                    item
                                    xs={12}
                                    style={{
                                        maxHeight: "100%",
                                        overflowY: "scroll",
                                        paddingBot: "2rem",
                                        overFlowX: "hidden",
                                    }}
                                >
                                    {chartState.topArtists.map((el, ind) => (
                                        <ChartsBestArtist
                                            item={el}
                                            key={
                                                el.name + el.mbid + el.listeners
                                            }
                                            ind={ind}
                                        />
                                    ))}
                                </Grid>
                            </Grid>
                        )}
                    {pageState === "Tags" && chartState && chartState.topTags && (
                        <Grid container style={{ height: "100%" }}>
                            <Grid
                                item
                                xs={12}
                                style={{
                                    maxHeight: "100%",
                                    overflowY: "scroll",
                                    paddingBot: "2rem",
                                    overFlowX: "hidden",
                                }}
                            >
                                {chartState.topTags.map((el, ind) => (
                                    <ChartsBestTag
                                        item={el}
                                        key={el.name + el.reach}
                                        ind={ind}
                                    />
                                ))}
                            </Grid>
                        </Grid>
                    )}
                    {pageState === "Tracks" &&
                        chartState &&
                        chartState.topTracks && (
                            <Grid container style={{ height: "100%" }}>
                                <Grid
                                    item
                                    xs={12}
                                    style={{
                                        maxHeight: "100%",
                                        overflowY: "scroll",
                                        paddingBot: "2rem",
                                        overFlowX: "hidden",
                                    }}
                                >
                                    {chartState.topTracks.map((el, ind) => (
                                        <ChartsBestTrack
                                            item={el}
                                            key={el.name + el.reach}
                                            ind={ind}
                                        />
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
