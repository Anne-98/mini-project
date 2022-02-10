import React, { Fragment } from "react";
import { useNavigate } from "react-router-dom";
import AdminSignIn from "../components/SignIn/AdminSignIn";
import CakeMakerSignIn from "../components/SignIn/CakeMakerSignIn";
import CustomerSignIn from "../components/SignIn/CustomerSignIn";

const SignInPage = () => {

    var navigate = useNavigate()

    return(
        <div className='signinpage-wrapper'>
                    <h1 className="text-center common-header" style={{zIndex:"3"}}>Sign In</h1>
            <div className='row signinpage-common-container mx-auto text-center' style={{ width:"75vw",padding:"50px"}}>
                    <div className='col-lg-6 col-12 signin-home-div'>
                    <button className='btn signin-home-btns' value="customer" onClick={(e) => {navigate('/signin/customer')}}>Customer</button>
                </div>
                <div className='col-lg-6 col-12 signin-home-div'>
                    <button className='btn signin-home-btns' value="cakemaker" onClick={(e) => {navigate('/signin/cakemaker')}}>Cake Maker</button>
                </div>
            </div> 
        </div>
    )
}

export default SignInPage