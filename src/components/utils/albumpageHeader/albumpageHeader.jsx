import React from "react";

import { Grid, Typography, Chip } from "@material-ui/core";

import { withStyles } from "@material-ui/core/styles";
import { compose } from "recompose";
import { searchTag } from "../../../redux/actionCreators/tagActionCreators";
import { connect } from "react-redux";
import { useNavigate } from "react-router";

const useStyles = () => ({
    artistPageUpperGridTitle: {
        marginBottom: "0.5rem",
        fontSize: "3.5rem",
        textAlign: "center",
        fontSizeAdjust: "0.5",
    },
    artistPageUpperContentGrid: {
        maxWidth: "900px",
        padding: "0 2%",
        alignItems: "center",
    },
    artistPageUpperGridBio: {
        color: "lightGray",
        cursor: "pointer",
        textAlign: "center",
        transition: "all .5s",
        
    },
    artistPageUpperGridStats: {
        display: "inline-block",
        color: "gray",
        paddingRight: "5rem",
        paddingTop: "1.5rem",
        fontWeight: 600,
        paddingLeft: "2rem",
    },

    artistPageUpperGridTags: {
        margin: "0.5rem 0.2rem",
        transition: "all 0.5s",
        borderRadius: 0,
        fontSize: "1rem",
        maxWidth: "100%",
        color: "gray",
        "&:hover": {
            backgroundColor: "#3f51b5 !important",
            color: "white !important",
        },
    },
    tags: {
        textAlign: "end",
        padding: "2rem 0.7rem",
    },
});

const AlbumpageHeader = ({ albumState, classes, searchATag }) => {
    const {
        name,
        artist,
        listeners,
        playcount,
        tags: { tag },
    } = albumState;
    const navigate = useNavigate();

    return (
        <Grid item xs={12} className={classes.artistPageUpperContentGrid}>
            <Grid item xs={12}>
                <Grid item xs={12}>
                    <Typography
                        color="primary"
                        variant="h3"
                        className={classes.artistPageUpperGridTitle}
                    >
                        {name.toUpperCase()}
                    </Typography>
                </Grid>
                <Grid item xs={12}>
                    <Typography
                        variant="subtitle2"
                        className={classes.artistPageUpperGridBio}
                    >
                        {artist}
                    </Typography>
                </Grid>
                <Grid container>
                    <Grid item xs={12} md={8} style={{ display: "flex" }}>
                        <Typography
                            variant="subtitle2"
                            className={classes.artistPageUpperGridStats}
                        >
                            Listeners:
                            <br />
                            <strong style={{ color: "white" }}>
                                {listeners}
                            </strong>
                            <br />
                        </Typography>

                        <Typography
                            variant="subtitle2"
                            className={classes.artistPageUpperGridStats}
                        >
                            Play count:
                            <br />
                            <strong style={{ color: "white" }}>
                                {playcount}
                            </strong>
                            <br />
                        </Typography>
                    </Grid>
                    <Grid item xs={12} md={4} className={classes.tags}>
                        {tag.map((el) => (
                            <Chip
                                color="primary"
                                label={el.name}
                                key={el.name}
                                size="small"
                                variant="outlined"
                                onClick={() =>
                                    searchATag(el.name, (x) => navigate(x))
                                }
                                className={classes.artistPageUpperGridTags}
                            />
                        ))}
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
};

const mapDispatchToProps = (dispatch) => ({
    searchATag: (tag, func) => dispatch(searchTag(tag, func)),
});

export default compose(
    withStyles(useStyles),
    connect(null, mapDispatchToProps)
)(AlbumpageHeader);
