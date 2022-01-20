import React from "react";

import { Typography } from "@material-ui/core";

import { withStyles } from "@material-ui/core/styles";
import { compose } from "recompose";

const useStyles = () => ({
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

const FadeInTitle = ({ text, classes, size }) => {
    return (
        <Typography
            variant="h6"
            color="primary"
            className={classes.textStyle}
            style={size === "big" ? { fontSize: "10vw" } : {}}
        >
            {text}
        </Typography>
    );
};

export default compose(withStyles(useStyles))(FadeInTitle);
