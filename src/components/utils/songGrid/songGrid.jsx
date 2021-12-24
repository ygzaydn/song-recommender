import React from "react";
import { Grid, Typography } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import { compose } from "recompose";

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
        color: "white",
        transform: "translateX(-50rem)",
        animationName: "fromLeft",
        animationDuration: "1.5s",
        animationFillMode: "forwards",
    },
});

const Songgrid = ({ classes, item, ind, maxListen }) => {
    const { name, playcount } = item;
    return (
        <Grid
            item
            xs={12}
            key={name}
            className={classes.songBarGrid}
            style={{
                padding: "1%",
                animationDelay: `${parseInt(ind) * 50}ms`,
            }}
        >
            <Grid item xs={7}>
                <Typography variant="subtitle1">{name} </Typography>
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
                        width: `min(${
                            (100 * parseInt(playcount)) / parseInt(maxListen)
                        }%,100%)`,
                        display: "inline-block",
                        background: "#3f51b5",
                        borderRadius: "5px",
                        height: "100%",
                    }}
                >
                    {playcount}&nbsp;
                    {ind === 0 ? "listeners" : null}
                </Typography>
            </Grid>
        </Grid>
    );
};

export default compose(withStyles(useStyles))(Songgrid);
