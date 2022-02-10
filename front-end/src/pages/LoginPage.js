import React, { useState } from 'react';
import { Fragment } from 'react';
import {Routes, Route, useParams, useNavigate} from 'react-router-dom';
import './../css/Home/Login.css';

const LoginPage = () => {
    
    var navigate = useNavigate()

    return(
        <div className='login-wrapper'>
                    <h1 className="text-center common-header" style={{zIndex:"3"}}>Log In</h1>
            <div className='row loginpage-common-container mx-auto text-center' style={{ width:"75vw",padding:"50px"}}>
                    <div className='col-lg-6 col-12 login-home-div'>
                    <button className='btn login-home-btns' value="customer" onClick={(e) => {navigate('/login/customer')}}>Customer</button>
                </div>
                <div className='col-lg-6 col-12 login-home-div'>
                    <button className='btn login-home-btns' value="cakemaker" onClick={(e) => {navigate('/login/cakemaker')}}>Cake Maker</button>
                </div>
            </div> 
        </div>
    )

}

export default LoginPage