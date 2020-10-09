import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Typography, GridList, GridListTile } from "@material-ui/core/";
import "fontsource-roboto";
import { CardComponent } from "../CardComponent";
import { color } from "../../colors";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import { CardActions } from "@material-ui/core";

const useStyles = makeStyles(() => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
    overflow: "hidden",
    border: "none",
  },
  title: {
    textAlign: "center",
    background: `${color.BLACKCOLOR}`,
    color: `${color.WHITECOLOR}`,
    fontWeight: "bold",
  },
  gridList: {
    flexWrap: "nowrap",
    maxHeight: 300,
  },

  iconStyle: {
    color: "white",
    "&:active": {
      fontSize: "2rem",
      transition: "0.1s",
    },
  },
  cardActions: {
    background: `${color.BLACKCOLOR}`,
    display: "grid",
    gridTemplateColumns: "20% 60% 20%",
  },
}));

export const BigCardwithoutIteration = ({ data, title, icon }) => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      {Object.keys(data).length ? (
        <Grid item xs={12}>
          <CardActions className={classes.cardActions}>
            <ChevronLeftIcon
              className={classes.iconStyle}
              style={{ color: "black" }}
              fontSize="large"
            />
            <Typography variant="h5" className={classes.title}>
              {title}
            </Typography>
            <ChevronRightIcon
              className={classes.iconStyle}
              style={{ color: "black" }}
              fontSize="large"
            />
          </CardActions>
          <GridList className={classes.gridList} cols={1}>
            <GridListTile
              key={data.name}
              cols={1}
              className={classes.gridListTile}
            >
              <CardComponent
                name={data.title}
                artist={data.artist}
                url={data.url}
                img={data.image[2]["#text"]}
                playcount={false}
              />
            </GridListTile>
          </GridList>
        </Grid>
      ) : null}
    </div>
  );
};
