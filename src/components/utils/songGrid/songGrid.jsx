import React, { useState } from "react";
import { Grid, Typography } from "@material-ui/core";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";
import { withStyles } from "@material-ui/core/styles";
import { compose } from "recompose";

import { connect } from "react-redux";

import * as trackActionCreators from "../../../redux/actionCreators/trackActionCreators";
import CircularProgress from "@mui/material/CircularProgress";

import { useNavigate } from "react-router";

import { track } from "../../../redux/selectors/trackSelectors";
import axios from "axios";

const useStyles = () => ({
  "@global": {
    "@keyframes fromLeft": {
      "0%": {
        transform: "translateX(-50rem)",
      },
      "90%": {
        transform: "translateX(2rem)",
      },
      "100%": {
        transform: "translateX(0rem)",
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

  songBarGrid: {
    display: "flex",
    transform: "translateX(-50rem)",
    animationName: "fromLeft",
    animationDuration: "1.5s",
    animationFillMode: "forwards",
  },

  songNameTypo: {
    display: "inline-block",
    textDecoration: "underline",
    transition: "all .5s",
    "&:hover": {
      cursor: "pointer",
      textDecoration: "none",
      paddingLeft: "1rem",
    },
  },
  accordionItem: {
    height: 300,
    width: "100",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  iconGrid: {
    position: "relative",
    display: "flex",
    "& svg": { margin: "0 .5rem 0 0", fill: "black" },
  },
});

const Songgrid = ({
  classes,
  item,
  ind,
  maxListen,
  searchTrackByMbid,
  getTrack,
}) => {
  const pageProperty = window.location.href.includes("track/")
    ? "Track"
    : "Artist";

  const [link, setLink] = useState(null);

  const [expand, setExpand] = React.useState(false);
  const toggleAcordion = () => {
    setExpand((prev) => !prev);
    if(!link){
        queryYoutubeLink();
    }
    else {
        setLink(null)
    }
  };

  const { name, playcount, match, mbid } = item;
  const navigate = useNavigate();

  const getSong = () => {
    searchTrackByMbid(mbid, (x) => navigate(x));
  };

  const queryYoutubeLink = async () => {
    await axios
      .get(
        `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${name} - ${item.artist.name}&key=AIzaSyDw42F5UkRgcoXrvweBhzxDZoNICAdT7YQ`
      )
      .then((res) => {
        console.log(res);
        setLink(res.data.items[0].id.videoId);
      })
      .catch((err) => console.log(err));
  };

  const width =
    pageProperty === "Artist"
      ? (100 * parseInt(playcount)) / parseInt(maxListen)
      : parseFloat(match) * 100;

  return (
    <Accordion expanded={expand === true}>
      <AccordionSummary>
        <Grid
          item
          xs={12}
          key={name}
          className={classes.songBarGrid}
          style={{
            animationDelay: `${parseInt(ind) * 50}ms`,
          }}
        >
          <Grid item xs={7} className={classes.iconGrid}>
            <PlayCircleIcon onClick={() => toggleAcordion()} />
            <div className={classes.animationDiv} />
            <Typography
              variant="subtitle1"
              onClick={() => getSong()}
              className={classes.songNameTypo}
            >
              {name}{" "}
            </Typography>
          </Grid>
          <Grid
            item
            xs={5}
            style={{
              background: "gray",
              border: "0.1px solid gray",
              borderRadius: "5px",
            }}
          >
            <Typography
              variant="subtitle1"
              style={{
                width: `min(${width}%,100%)`,
                display: "inline-block",
                background: "#3f51b5",
                borderRadius: "5px",
                height: "100%",
                color: "white",
              }}
            >
              {pageProperty === "Artist"
                ? playcount
                : parseInt(match * 100) + "%"}{" "}
              {ind === 0
                ? pageProperty === "Artist"
                  ? "listeners"
                  : "match"
                : null}
            </Typography>
          </Grid>
        </Grid>
      </AccordionSummary>
      <AccordionDetails>
        <Grid container className={classes.accordionItem}>
          {!link ? (
            <CircularProgress />
          ) : (
            <iframe
              height="300"
              width="100%"
              title={`${name}`}
              src={`https://www.youtube.com/embed/${link}?autoplay=1`}
              frameBorder="0"
              allow='autoplay'
            ></iframe>
          )}
        </Grid>
      </AccordionDetails>
    </Accordion>
  );
};

const mapStateToProps = (state) => ({
  getTrack: track(state),
});

const mapDispatchToProps = (dispatch) => ({
  searchTrackByMbid: (mbid, func) =>
    dispatch(trackActionCreators.searchTrackByMbid(mbid, func)),
});

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withStyles(useStyles)
)(Songgrid);
