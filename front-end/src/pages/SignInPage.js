import React, { Fragment } from "react";
import AdminSignIn from "../components/SignIn/AdminSignIn";
import CakeMakerSignIn from "../components/SignIn/CakeMakerSignIn";
import CustomerSignIn from "../components/SignIn/CustomerSignIn";

const SignInPage = () => {
    return(
        <Fragment>
            <AdminSignIn/>
            <CustomerSignIn />
            <CakeMakerSignIn />
        </Fragment>
        
    )
}

export default SignInPage