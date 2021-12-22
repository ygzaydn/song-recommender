import React from "react";
import "./App.css";
import "fontsource-roboto";

import { Route, BrowserRouter, Routes } from "react-router-dom";

import Homepage from "./components/homepage/homepage";
import Searchpage from "./components/searchpage/searchpage";

const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route exact path="/" element={<Homepage />} />
                <Route exact path="/search" element={<Searchpage />} />
            </Routes>
        </BrowserRouter>
    );
};

export default App;
