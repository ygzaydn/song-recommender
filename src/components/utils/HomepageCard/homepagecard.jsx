import React from "react";
import { Grid, Typography } from "@material-ui/core";
import { withStyles } from "@material-ui/styles";
import { useNavigate } from "react-router-dom";

const useStyles = () => ({
    "@global": {
        "@keyframes topLeftCard": {
            "0%": {
                transform: "translateY(-50%) translateX(-50%)",
                opacity: 0,
            },
            "100%": {
                transform: "translateY(0%) translateX(0%)",
                opacity: 1,
            },
        },
        "@keyframes topRightCard": {
            "0%": {
                transform: "translateY(-50%) translateX(50%)",
                opacity: 0,
            },
            "100%": {
                transform: "translateY(0%) translateX(0%)",
                opacity: 1,
            },
        },

        "@keyframes bottomLeftCard": {
            "0%": {
                transform: "translateY(50%) translateX(-50%)",
                opacity: 0,
            },
            "100%": {
                transform: "translateY(0%)",
                opacity: 1,
            },
        },

        "@keyframes bottomRightCard": {
            "0%": {
                transform: "translateY(50%) translateX(50%)",
                opacity: 0,
            },
            "100%": {
                transform: "translateY(0%)",
                opacity: 1,
            },
        },
    },

    homepagecardGrid: {
        maxWidth: "200px",
        padding: "2rem 1.5rem",
        border: "2px solid white",
        borderTopLeftRadius: (props) =>
            props.pos === "top-left" ? "20%" : null,
        borderTopRightRadius: (props) =>
            props.pos === "top-right" ? "20%" : null,
        borderBottomLeftRadius: (props) =>
            props.pos === "bot-left" ? "20%" : null,
        borderBottomRightRadius: (props) =>
            props.pos === "bot-right" ? "20%" : null,
        transition: "all .5s",
        position: "relative",
        opacity: 0,
        textAlign: "center",
        animationName: (props) =>
            props.pos === "top-left"
                ? "topLeftCard"
                : props.pos === "top-right"
                ? "topRightCard"
                : props.pos === "bot-left"
                ? "bottomLeftCard"
                : "bottomRightCard",
        animationDuration: "2s",
        animationDelay: ".5s",
        "animation-fill-mode": "forwards",
        right: 0,
        bottom: 0,
        "&:hover": {
            cursor: "pointer",
            right: (props) => (props.pos.includes("left") ? "4%" : "-4%"),
            bottom: (props) => (props.pos.includes("top") ? "4%" : "-4%"),
            backgroundColor: "white",
            transition: "all .2s",
            "& svg": {
                color: "black",
            },
            "& div": {
                "& h6": {
                    color: "black",
                },
            },
            "&:active": {
                transform: "translateY(0.1px)",
            },
        },
    },
    iconGrid: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        marginBottom: "1.5rem",
        "& svg": {
            color: "white",
            height: "min(60,5rem)",
        },
    },
    textGrid: {
        display: "flex",
        justifyContent: "center",
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
            <Grid item xs={12} className={classes.iconGrid}>
                {icon}
            </Grid>
            <Grid item xs={12} className={classes.textGrid}>
                <Typography variant="h6">{text}</Typography>
            </Grid>
        </Grid>
    );
};

export default withStyles(useStyles)(HomepageCard);
