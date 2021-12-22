import React, { useState } from "react";
import { StyledButton } from "./StyledButtonComponent";
import { StyledTextField } from "./StyledTextField";
import { connect } from "react-redux";
import { mapDispatchToProps, mapStateToProps } from "../store";
import { Grid } from "@material-ui/core/";
import { ListComponent } from "./ListComponent";
import {
    getGeoTopArtists,
    getArtistInfoFromSearch,
    getArtistInfoFromName,
} from "../axiosCalls";
import { geoTopArtistStyle } from "../themes";

const GeoTopArtist = ({
    geoState,
    onGetGeoTopArtists,
    onStateChange,
    onGetArtist,
    onGetTopTracks,
    onGetTopAlbums,
}) => {
    const classes = geoTopArtistStyle(window.innerWidth);
    const [searchText, setSearchText] = useState("");

    const setTextField = (event) => {
        setSearchText(event.target.value);
    };

    return (
        <div>
            <form className={classes.form} noValidate autoComplete="off">
                <StyledTextField label="County name" onChange={setTextField} />
                <StyledButton
                    color="primary"
                    variant="outlined"
                    onClick={() =>
                        getGeoTopArtists(
                            searchText,
                            onGetGeoTopArtists,
                            onStateChange
                        )
                    }
                >
                    Search
                </StyledButton>
            </form>
            <Grid className={classes.container} container spacing={3}>
                {geoState.getGeoTopArtists
                    ? geoState.getGeoTopArtists.map((el) => {
                          const handleClickFunction = () =>
                              el.mbid
                                  ? getArtistInfoFromSearch(
                                        el.mbid,
                                        onGetArtist,
                                        onGetTopTracks,
                                        onGetTopAlbums,
                                        onStateChange
                                    )
                                  : getArtistInfoFromName(
                                        el.name,
                                        onGetArtist,
                                        onGetTopTracks,
                                        onGetTopAlbums,
                                        onStateChange
                                    );
                          return (
                              <ListComponent
                                  name={el.name}
                                  listeners={el.listeners}
                                  handleClick={handleClickFunction}
                              />
                          );
                      })
                    : null}
            </Grid>
        </div>
    );
};

export const ConnectedGeoTopArtist = connect(
    mapStateToProps,
    mapDispatchToProps
)(GeoTopArtist);
