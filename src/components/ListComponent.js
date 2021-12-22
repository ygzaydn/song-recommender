import React from "react";
import { Grid, Paper, Typography } from "@material-ui/core";
import "fontsource-roboto";
import { listComponentStyle } from "../themes";

export const ListComponent = ({
    mbid,
    name,
    match,
    listeners,
    artist,
    handleClick,
    count,
}) => {
    const classes = listComponentStyle();
    return (
        <Grid key={mbid} item xs={12}>
            <Paper
                key={name}
                elevation={1}
                className={classes.root}
                color="secondary"
                onClick={handleClick}
            >
                <Typography
                    className={classes.name}
                    variant="h6"
                    display="block"
                >
                    {name}
                </Typography>
                {artist ? (
                    <div className={classes.artist}>
                        <Typography
                            style={{ textDecoration: "underline" }}
                            display="block"
                        >
                            Artist
                        </Typography>
                        <Typography display="block">{artist}</Typography>
                    </div>
                ) : null}
                {match ? (
                    <Typography
                        className={classes.match}
                        variant="subtitle2"
                        display="block"
                    >
                        Match: {parseInt(match * 10)}
                    </Typography>
                ) : count ? (
                    <Typography
                        className={classes.match}
                        variant="subtitle2"
                        display="block"
                    >
                        Count: {count}
                    </Typography>
                ) : (
                    <Typography
                        className={classes.match}
                        variant="subtitle2"
                        display="block"
                    >
                        Listeners: {listeners}
                    </Typography>
                )}
            </Paper>
        </Grid>
    );
};
