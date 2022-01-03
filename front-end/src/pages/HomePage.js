import React, { Fragment } from "react";
import Home from "../components/Home/Home";
import Navbar from "../components/Home/Navbar";

const HomePage = () => {
    return(
        <Fragment>
            <Navbar />
            <Home />
        </Fragment>
    )
}

export default HomePage