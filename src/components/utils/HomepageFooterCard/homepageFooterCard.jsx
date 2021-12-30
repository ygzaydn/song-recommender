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
        maxWidth: "400px",
        padding: "2rem 1.5rem",
        border: "2px solid white",
        borderRadius: "20px",
        transition: "all 1s",
        position: "relative",
        opacity: 0,
        textAlign: "center",
        animationName: "fadeIn",
        animationDuration: "2s",
        animationDelay: "2.5s",
        "animation-fill-mode": "forwards",
        justifyContent: "space-evenly",
        alignItems: "center",
        "&:hover": {
            cursor: "pointer",
            backgroundColor: "white",
            transition: "all .2s",
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
        navigate(`${link}`, {
            state: {
                backgroundId: Math.floor(Math.random() * 10) % 4,
            },
        });
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
