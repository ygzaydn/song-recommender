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
        borderRadius: "10px",
        
        position: "relative",
        textAlign: "center",
        transition: "all 1.5s",
        backgroundPosition:"100% 100%",
        justifyContent: "space-evenly",
        alignItems: "center",
        backgroundImage: "linear-gradient(105deg, white 0%, white 50%, #3f51b5 50% ,#3f51b5 100%)",
        backgroundSize: "400% 400%",

        "&:hover": {
            cursor: "pointer",
            backgroundPosition:"0% 0%",
            "& svg": {
                color: "black",
            },
            "& h6": {
                color: "black",
            },
           
        },

        "& svg": {
            transition: "all 1.5s",
            color: "white",
            height: "100%",
        },
        "& h6": {
            transition: "all 1.5s",
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
