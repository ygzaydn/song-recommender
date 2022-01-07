import React, { useEffect } from "react";

import { Grid } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";

import { compose } from "recompose";
import { connect } from "react-redux";

import { useParams } from "react-router-dom";

import * as geoSelectors from "../../../redux/selectors/geoSelectors";
import * as geoActionCreators from "../../../redux/actionCreators/geoActionCreators";
import * as loadingSelectors from "../../../redux/selectors/loadingSelectors";

import ResultBackground from "../../../assets/images/resultbackground.jpg";

import GeopageHeader from "../../utils/geopageheader/geopageheader";
import FadeInTitle from "../../utils/fadeInTitle/fadeInTitle";
import HitGrid from "../../utils/hitGrid/hitGrid";
import Loading from "../../utils/loading/loading";
import Header from "../../utils/header/header";

const useStyles = () => ({
    artistPageContainer: {
        backgroundColor: "white",
        backgroundSize: "cover",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        minHeight: "100vh",
        position: "relative",
    },
    artistPageContentContainer: {
        maxWidth: "1250px",
        padding: "1rem",
        margin: "1rem 0",
        borderRight: "0.1px solid lightgray",
        borderLeft: "0.1px solid lightgray",
    },
    artistPageUpperContainer: {
        backgroundImage: `linear-gradient(to right, #000000b6,#000000b6), url(${ResultBackground})`,
        backgroundPosition: "center",
        padding: "2rem 0.5rem 3rem 0.5rem",
        display: "flex",
        justifyContent: "center",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 90%)",
    },
    songBarGrid: {
        display: "flex",
        transform: "translateX(-50rem)",
        animationName: "fromLeft",
        animationDuration: "1.5s",
        animationFillMode: "forwards",
    },
    songListGrid: {
        height: "35rem",
        overflowY: "scroll",
        overflowX: "hidden",
    },
    albumGrid: {
        display: "grid",
        padding: "0 1.5rem",
    },
    artistPageAlbumGrid: {
        padding: "1.5rem",
        display: "flex",
        flexDirection: "column",
    },
    artistPageSimilarContainer: {
        maxWidth: 1600,
        display: "flex",
        justifyContent: "center",
        padding: "1rem 3rem",
    },
    similarArtistGrid: {
        display: "flex",
    },
});

const Geopage = ({
    classes,
    geoState,
    searchGeo,
    getGeoTopArtists,
    getGeoTopTracks,
    isLoading,
}) => {
    const { countryId } = useParams();
    const { name } = geoState;

    useEffect(() => {
        if (countryId.length > 0 && name !== countryId) {
            searchGeo(countryId);
        }
    }, []);

    return (
        Object.keys(geoState).length > 1 && (
            <Grid container className={classes.artistPageContainer}>
                {isLoading && <Loading />}
                <Grid container className={classes.artistPageUpperContainer}>
                    <Header />
                    <GeopageHeader countryName={name} />
                </Grid>
                <Grid container className={classes.artistPageContentContainer}>
                    <Grid
                        item
                        xs={12}
                        sm={6}
                        className={classes.artistPageLeftGrid}
                        style={{ padding: "2%" }}
                    >
                        <FadeInTitle text="Hit songs" />
                        <Grid item xs={12} className={classes.songListGrid}>
                            {getGeoTopTracks
                                .filter((el, ind) => ind < 25)
                                .map((el, ind) => (
                                    <HitGrid
                                        key={el.name}
                                        item={el}
                                        ind={ind}
                                        maxListen={1}
                                    />
                                ))}
                        </Grid>
                    </Grid>
                    <Grid
                        item
                        xs={12}
                        sm={6}
                        className={classes.artistPageLeftGrid}
                        style={{ padding: "2%" }}
                    >
                        <FadeInTitle text="Hit bands" />
                        <Grid item xs={12} className={classes.songListGrid}>
                            {getGeoTopArtists
                                .filter((el, ind) => ind < 25)
                                .map((el, ind) => (
                                    <HitGrid
                                        key={el.name}
                                        item={el}
                                        ind={ind}
                                        mode="artist"
                                    />
                                ))}
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        )
    );
};

const mapStateToProps = (state) => ({
    geoState: geoSelectors.geoState(state),
    getGeoTopArtists: geoSelectors.geoTopArtists(state),
    getGeoTopTracks: geoSelectors.geoTopTracks(state),
    isLoading: loadingSelectors.loadingState(state),
});

const mapDispatchToProps = (dispatch) => ({
    searchGeo: (geo) => dispatch(geoActionCreators.searchGeo(geo)),
});

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    withStyles(useStyles)
)(Geopage);
