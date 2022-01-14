import React, { useState, useEffect, useRef } from "react";

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
import FadeInTitle from "../../utils/fadeInTitle/fadeInTitle";

import BackgroundImage from "../../../assets/images/searchboxbackground.jpg";

const useStyles = () => ({
    chartspageContainer: {
        minHeight: "100vh",
        width: "100vw",
        position: "relative",
    },
    chartspageBackground: {
        backgroundImage: `linear-gradient(#fffc69d2, #fffc69d2), url(${BackgroundImage})`,
        clipPath: "polygon(0% 0%, 50% 0%, 60% 100%, 0% 100%)",
        position: "absolute",
        zIndex: -1,
        height: "100%",
        width: "100%",
        backgroundSize: "cover",
        backgroundPosition: "center",
    },
    circleMenuGrid: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        maxHeight: "35vh",
        padding: "2.5rem",
        "@media only screen and (max-width:1000px)": {
            maxHeight: "5vh",
            maxWidth: "100%",
            zIndex: 80,
            transform: "scale(0.75)",
        },
    },
    contentGrid: {
        position: "relative",
        zIndex: 10,
        padding: "1rem",
        borderTopLeftRadius: 80,
        borderBottomRightRadius: 80,
        border: "solid 0.2px black",
        height: "75vh",
        width: "100%",
        overflow: "hidden",
        "@media only screen and (max-width:1000px)": {
            borderTopLeftRadius: 20,
            borderBottomRightRadius: 20,
            height: "60vh",
        },
    },
    leftMainGrid: {
        padding: "0.5rem 1.5rem",
        maxWidth: 1000,
        margin: "auto",
    },
    rightMainGridTitle: {
        padding: "1rem",
        textAlign: "center",
        display: "none",
        "@media only screen and (max-width:1000px)": {
            display: "block",
        },
    },
    leftMainGridTitle: {
        padding: "1rem",
        textAlign: "center",
        "@media only screen and (max-width:1000px)": {
            display: "none",
        },
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
    const ref = useRef("");

    useEffect(() => {
        getCharts();
    }, []);

    const changeState = (state) => {
        setPageState(state);
        console.log(document.getElementById("x").focus());
        window.setTimeout(() => document.getElementById("x").focus(), 1);
    };

    return (
        <Grid container className={classes.chartspageContainer}>
            <Grid item xs={12} className={classes.chartspageBackground} />
            {isLoading && <Loading />}
            <Grid item xs={12} md={5} className={classes.rightMainGrid}>
                <Grid item xs={12} className={classes.circleMenuGrid} ref={ref}>
                    <CircleMenuCustomized
                        state={pageState}
                        changeState={(x) => changeState(x)}
                    />
                </Grid>
                <Grid item xs={12} className={classes.leftMainGridTitle}>
                    <Typography
                        variant="subtitle1"
                        color="primary"
                        className={classes.textStyle}
                        id="x"
                    >
                        TOP <br />{" "}
                        <strong style={{ fontSize: "5rem" }}>
                            {pageState.toUpperCase()}
                        </strong>
                    </Typography>
                </Grid>
            </Grid>
            <Grid item xs={12} md={7} className={classes.leftMainGrid}>
                <Grid item xs={12} className={classes.rightMainGridTitle}>
                    <FadeInTitle
                        text={`Top ${pageState}`.toUpperCase()}
                        size="big"
                    />
                </Grid>
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
