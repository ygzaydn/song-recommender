import React from "react";
import "./App.css";
import "fontsource-roboto";

import { Route, BrowserRouter, Routes } from "react-router-dom";

import Homepage from "./components/pages/homepage/homepage";
import Searchpage from "./components/pages/searchpage/searchpage";
import Artistpage from "./components/pages/artistpage/artistpage";
import Trackpage from "./components/pages/trackpage/trackpage";
import Geopage from "./components/pages/geopage/geopage";
import Tagpage from "./components/pages/tagpage/tagpage";
import Chartspage from "./components/pages/chartspage/chartspage";

const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Homepage />} />
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
                    path="/search/tag/"
                    element={<Searchpage title="Search similar tags" />}
                />
                <Route
                    exact
                    path="/artist/:artistName"
                    element={<Artistpage />}
                />
                <Route exact path="/track/:trackMbid" element={<Trackpage />} />
                <Route exact path="/geo/:countryId" element={<Geopage />} />
                <Route exact path="/tag/:tagId" element={<Tagpage />} />
                <Route exact path="/charts" element={<Chartspage />} />
            </Routes>
        </BrowserRouter>
    );
};

export default App;
