import React from "react";

import Errorpage from "./errorpage";

import { connect } from "react-redux";

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true };
    }

    render() {
        if (this.state.hasError || this.props.error) {
            return <Errorpage />;
        }

        return this.props.children;
    }
}

const mapStateToProps = (state) => ({
    error: state.loadingState.error,
});

export default connect(mapStateToProps, null)(ErrorBoundary);
