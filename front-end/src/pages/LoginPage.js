import React from 'react';
import { Fragment } from 'react';
import {Routes, Route} from 'react-router-dom';
import CustomerLogin from '../components/Login/CustomerLogin';
import AdminLogin from '../components/Login/AdminLogin';
import CakeMakerLogin from '../components/Login/CakeMakerLogin';

const LoginPage = () => {

    return(
        <Fragment>
            <CustomerLogin />
            <AdminLogin />
            <CakeMakerLogin />
        </Fragment>
    )

}

export default LoginPage