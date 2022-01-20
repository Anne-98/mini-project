import React, { Fragment, useContext } from "react";
import './../../css/navbar.css';
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { UserIdContext } from "../Context/UserIdContext";
import { UserTypeContext } from "../Context/UserTypeContext";

const NavbarFixed = () => {

    var navigate = useNavigate()

    var [type, setType] = useContext(UserTypeContext)
    var [userId, setUserId] = useContext(UserIdContext)

    const setLogOut = async() => {

        var {data} = await axios.get('http://localhost:8000/general/logout')

        console.log(data)
        if (data.isLog == false) {
            setUserId('')
            setType('')
            localStorage.setItem('userId','')
            localStorage.setItem('type','')
            navigate('/')
        }
    }

    return(
        <Fragment>
            <nav className="navbar fixed-top navbar-expand-lg" id="navbarWrapper">
                <div className="container-fluid" >
                    <a className="navbar-brand" href="#">Black Mount</a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation" >
                    <span className="navbar-toggler-icon" id="toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav mx-auto">
                        <li className="nav-item  text-center">
                            <Link className="navItem" to="/">Home</Link>
                        </li>
                        <li className="nav-item  text-center">
                            <Link className="navItem" to="/login">Log In</Link>
                        </li>
                        <li className="nav-item  text-center">
                            <Link className="navItem" to="/signin">Sign In</Link>
                        </li>
                        <li className="nav-item  text-center">
                            {
                                type == 'customer' ? <Link className="navItem" to={`/profiles/customer/${userId}`}>Profile</Link> : type == 'cakemaker' ? <Link className="navItem" to={`/profiles/cakemaker/${userId}`}>Profile</Link> : type == 'admin' ? <Link className="navItem" to={`/profiles/admin/${userId}`}>Profile</Link> : <span></span>
                                
                            }
                        </li>
                    </ul>
                    <form className="d-flex">
                            <button className="navItem btn" onClick={setLogOut}>Logout</button>

                        <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                        <button className="btn btn-outline-success" type="submit">Search</button>
                    </form>
                    </div>
                </div>
            </nav>
        </Fragment>
    )
}

export default NavbarFixed