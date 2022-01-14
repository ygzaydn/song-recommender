import React from "react";
import { Grid, Typography } from "@material-ui/core";
import { withStyles } from "@material-ui/styles";
import { useNavigate } from "react-router-dom";

const useStyles = () => ({
    "@global": {
        "@keyframes fadeIn": {
            "0%": {
                opacity: 0,
            },
            "100%": {
                opacity: 1,
            },
        },
    },

    homepagecardGrid: {
        maxWidth: "350px",
        padding: "2rem 1.5rem",
        border: "2px solid #3f51b5",
        borderRadius: "20px",
        transition: "all .4s",
        position: "relative",
        opacity: 0,
        textAlign: "center",

        animationName: "fadeIn",
        animationDuration: "2s",
        animationDelay: "2.5s",
        "animation-fill-mode": "forwards",

        justifyContent: "space-evenly",
        alignItems: "center",
        backgroundColor: "#3f51b5",

        "&:hover": {
            border: "2px solid white",
            cursor: "pointer",
            backgroundColor: "white",

            "& svg": {
                color: "black",
            },
            "& h6": {
                color: "black",
            },
            "&:active": {
                transform: "translateY(0.1px)",
            },
        },

        "& svg": {
            color: "white",
            height: "100%",
        },
        "& h6": {
            color: "white",
            fontSize: "min(5vw, 1.25rem)",
        },
    },
});

const HomepageCard = ({ classes, icon, text, link }) => {
    const navigate = useNavigate();
    const clickCard = () => {
        navigate(`${link}`);
    };
    return (
        <Grid
            container
            className={classes.homepagecardGrid}
            onClick={() => clickCard()}
        >
            {icon}
            <Typography variant="h6">{text}</Typography>
        </Grid>
    );
};

export default withStyles(useStyles)(HomepageCard);
