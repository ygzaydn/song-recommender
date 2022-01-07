import React from "react";

import "./errorpage.scss";

import { Grid } from "@material-ui/core";

const Errorpage = () => {
    return (
        <Grid container style={{ height: "100vh", width: "100vw" }}>
            <div className="box">
                <div className="box__ghost">
                    <div className="symbol"></div>
                    <div className="symbol"></div>
                    <div className="symbol"></div>
                    <div className="symbol"></div>
                    <div className="symbol"></div>
                    <div className="symbol"></div>

                    <div className="box__ghost-container">
                        <div className="box__ghost-eyes">
                            <div className="box__eye-left"></div>
                            <div className="box__eye-right"></div>
                        </div>
                        <div className="box__ghost-bottom">
                            <div></div>
                            <div></div>
                            <div></div>
                            <div></div>
                            <div></div>
                        </div>
                    </div>
                    <div className="box__ghost-shadow"></div>
                </div>

                <div className="box__description">
                    <div className="box__description-container">
                        <div className="box__description-title">Whoops!</div>
                        <div className="box__description-text">
                            It seems like we couldn't find the page you were
                            looking for
                        </div>
                    </div>

                    <a className="box__button" href="/">
                        Go home
                    </a>
                </div>
            </div>
        </Grid>
    );
};

export default Errorpage;
