import React, { Fragment } from "react";
import './../../css/navbar.css';
import { Link } from "react-router-dom";

const NavbarFixed = () => {
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
                            <Link className="navItem" to="/logout">Logout</Link>
                        </li>
                    </ul>
                    <form className="d-flex">
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