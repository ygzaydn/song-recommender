import React, { useEffect } from "react";

import { Grid } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";

import { compose } from "recompose";
import { connect } from "react-redux";

import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import { mapDispatchToProps, mapStateToProps } from "../../../store";

import ArrowBackOutlinedIcon from "@mui/icons-material/ArrowBackOutlined";
import HomeIcon from '@mui/icons-material/Home';
import ResultBackground from "../../../assets/images/resultbackground.jpg";
import { getTagInfoFromName } from "../../../axiosCalls";

import Albumgrid from "../../utils/albumGrid/albumGrid";
import Similarartist from "../../utils/similarArtistItem/similarArtist";
import FadeInTitle from "../../utils/fadeInTitle/fadeInTitle";
import Tagpageheader from "../../utils/tagpageheader/tagpageheader";
import HitGrid from "../../utils/hitGrid/hitGrid";
import Loading from '../../utils/loading/loading'

const useStyles = () => ({
    artistPageContainer: {
        backgroundColor: "white",
        backgroundSize: "cover",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        minHeight: "100vh",
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
        height: "25rem",
        overflowX: "hidden",
    },
    albumGrid: {
        padding: "0 1.5rem",
        display: "flex",
        flexWrap: "wrap",
        overflowY: "scroll",
        height: "25rem",
    },
    artistPageAlbumGrid: {
        padding: "1.5rem .5rem",
        display: "flex",
        flexDirection: "column",
        maxHeight: "30rem",
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
    searchpageImageGrid: {
        padding: "0 0.5rem",
        "& svg": {
            fill: "white",
            stroke: "white",
            cursor: "pointer",
            "@media only screen and (min-width: 1000px)": {
                width: 50,
                height: 50,
            },
            top: "5%",
            left: "5%",
            transition: "all .4s",
            "&:hover": {
                transform: "scale(1.25)",
            },
        },
    },
});

const Tagpage = ({
    classes,
    tagState,
    onGetTag,
    onGetTopAlbumsTag,
    onGetTopArtistTag,
    onGetTopTracksTag,
}) => {
    const { tagId } = useParams();
    const navigate = useNavigate();

    const { getTag, getTopAlbumTags, getTopArtistTags, getTopTrackTags } =
        tagState;

    useEffect(() => {
        if (tagState.length === 0) {
            getTagInfoFromName(
                tagId,
                onGetTag,
                onGetTopAlbumsTag,
                onGetTopArtistTag,
                onGetTopTracksTag
            );
        }
    }, [
        tagState,
        tagId,
        onGetTag,
        onGetTopAlbumsTag,
        onGetTopArtistTag,
        onGetTopTracksTag,
    ]);

    return Object.keys(tagState).length > 3 ? (
        <Grid container className={classes.artistPageContainer}>
            <Grid container className={classes.artistPageUpperContainer}>
                <Grid item xs={12} className={classes.searchpageImageGrid}>
                    <ArrowBackOutlinedIcon onClick={() => navigate(-1)} style={{padding: "0 2rem"}}/>
                    <HomeIcon onClick={()=>navigate("/")}/>
                </Grid>
                <Tagpageheader tagState={getTag} />
            </Grid>

            <Grid container className={classes.artistPageContentContainer}>
                <Grid
                    item
                    xs={12}
                    sm={6}
                    className={classes.artistPageLeftGrid}
                >
                    <FadeInTitle text="Top songs" />
                    <Grid item xs={12} className={classes.songListGrid}>
                        {getTopTrackTags.map((el, ind) => (
                            <HitGrid
                                key={el.name}
                                item={el}
                                ind={ind}
                                mode={"tagSong"}
                            />
                        ))}
                    </Grid>
                </Grid>
                <Grid
                    item
                    xs={12}
                    sm={6}
                    className={classes.artistPageRightGrid}
                >
                    <Grid item xs={12} className={classes.artistPageAlbumGrid}>
                        <FadeInTitle text="Top Albums" />
                        <Grid item xs={12} className={classes.albumGrid}>
                            {getTopAlbumTags.map((el, ind) => (
                                <Albumgrid
                                    key={el.mbid + ind}
                                    item={el}
                                    mode="tag"
                                />
                            ))}
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
            <Grid
                container
                style={{ display: "flex", justifyContent: "center" }}
            >
                <Grid
                    item
                    xs={12}
                    sm={10}
                    className={classes.artistPageAlbumGrid}
                >
                    <FadeInTitle text="Top Artists" />
                    <Grid container className={classes.similarArtistGrid}>
                        {getTopArtistTags.map((el) => (
                            <Similarartist item={el} key={el.mbid} />
                        ))}
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    ) : <Loading />;
};

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    withStyles(useStyles)
)(Tagpage);
