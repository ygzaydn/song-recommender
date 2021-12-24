import React from "react";

import { Typography } from "@material-ui/core";

import { withStyles } from "@material-ui/core/styles";
import { compose } from "recompose";

const useStyles = () => ({
    textStyle: {
        paddingBottom: "1rem",
        opacity: 0,
        animationName: "fadeIn",
        animationDuration: "3s",
        animationFillMode: "forwards",
    },
});

const FadeInTitle = ({ text, classes }) => {
    return (
        <Typography variant="h6" color="primary" className={classes.textStyle}>
            {text}
        </Typography>
    );
};

export default compose(withStyles(useStyles))(FadeInTitle);
