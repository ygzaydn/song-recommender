import React, { useState } from "react";
import { Grid, Paper, Button, TextField, Typography } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import Background1 from "../../assets/images/search-1.jpg";
import Background2 from "../../assets/images/search-2.jpg";
import Background3 from "../../assets/images/search-3.jpg";
import Background4 from "../../assets/images/search-4.jpg";
import SearchRight from "../../assets/images/search-right.jpg";

import { useLocation } from "react-router-dom";

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
    searchpageContainer: {
        height: "100vh",
        width: "100vw",
    },
    searchpageImageGrid: {
        transform: "translateX(-100%)",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "right",
        clipPath: "polygon(0% 0%, 80% 0%, 100% 100%,0% 100%)",
        animationName: "fromLeft",
        animationDuration: "1.2s",
        animationDelay: ".5s",
        "animation-fill-mode": "forwards",
    },
    searchpageFromGrid: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        opacity: 0,
        animationName: "fadeIn",
        animationDuration: "1.2s",
        animationDelay: "1.5s",
        "animation-fill-mode": "forwards",
    },
    searchpageFormPaperContainer: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        boxShadow: "none",
        height: "25rem",
        width: "25rem",
        border: "0.1px solid #FAFF7F",
        borderRadius: 75,
        background: "#FAFF7F",
    },
    searchpageFormPaperGrid: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "60%",
        height: "4rem",
        flexDirection: "column",
    },
});

const Searchpage = ({ classes }) => {
    const [text, setText] = useState("");
    const { state } = useLocation();

    const handleChange = (event) => {
        setText(event.target.value);
    };

    console.log(state);
    return (
        <Grid container className={classes.searchpageContainer}>
            <Grid
                item
                xs={12}
                md={8}
                className={classes.searchpageImageGrid}
                style={{
                    background:
                        state === 0
                            ? `url(${Background1})`
                            : state === 1
                            ? `url(${Background2})`
                            : state === 2
                            ? `url(${Background3})`
                            : `url(${Background4})`,
                }}
            />
            <Grid item xs={12} md={4} className={classes.searchpageFromGrid}>
                <Paper className={classes.searchpageFormPaperContainer}>
                    <Grid
                        item
                        xs={12}
                        className={classes.searchpageFormPaperGrid}
                    >
                        <Typography color="primary" variant="h6">
                            Title
                        </Typography>
                        <TextField
                            label="standart"
                            variant="standard"
                            value={text}
                            onChange={handleChange}
                        />
                    </Grid>

                    <Grid
                        item
                        xs={12}
                        className={classes.searchpageFormPaperGrid}
                    >
                        <Button variant="contained" color="primary">
                            Button
                        </Button>
                    </Grid>
                </Paper>
            </Grid>
        </Grid>
    );
};

export default withStyles(useStyles)(Searchpage);
