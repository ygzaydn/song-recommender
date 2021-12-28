import React from "react";
import "./App.css";
import "fontsource-roboto";

import { Route, BrowserRouter, Routes } from "react-router-dom";

import Homepage from "./components/pages/homepage/homepage";
import Searchpage from "./components/pages/searchpage/searchpage";
import Artistpage from "./components/pages/artistpage/artistpage";
import Trackpage from "./components/pages/trackpage/trackpage";

const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route exact path="/" element={<Homepage />} />
                <Route
                    exact
                    path="/search/artist/"
                    element={<Searchpage title="Find similar artists" />}
                />
                <Route
                    exact
                    path="/search/track/"
                    element={<Searchpage title="Find similar tracks" />}
                />
                <Route
                    exact
                    path="/search/geo/"
                    element={<Searchpage title="Find country hits" />}
                />
                <Route
                    exact
                    path="/artist/:artistId"
                    element={<Artistpage />}
                />
                <Route
                    exact
                    path="/track/:trackName/:trackArtist"
                    element={<Trackpage />}
                />
            </Routes>
        </BrowserRouter>
    );
};

export default App;
