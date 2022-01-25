import React, { Fragment, useContext } from "react";
import './../../css/navbar.css';
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { UserIdContext } from "../Context/UserIdContext";
import { UserTypeContext } from "../Context/UserTypeContext";

const NavbarFixed = () => {

    var navigate = useNavigate()

    let [type, setType] = useContext(UserTypeContext)
    let [userId, setUserId] = useContext(UserIdContext)

    const LogOut = async() => {
        
        var {data} = await axios.get('http://localhost:8000/general/logout')
        console.log("isLog",data.isLog)

        if (!data.isLog) {
            console.log(type, userId)
            localStorage.setItem('type',"")
            localStorage.setItem('userId',"")
            setUserId("")
            setType("")
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
                        {
                            type == 'cakemaker' ? <Link to={`/cakemaker/calender/${userId}`}> <button  className="btn" ><i style={{fontSize:"25px", color:"#b89472"}} className="far fa-calendar"></i></button></Link> : <></>
                        }

                        {
                            type == 'customer' ? <Link to={`/profiles/customer/${userId}`}> <button  className="btn" ><i style={{fontSize:"25px", color:"#b89472"}} className="fas fa-bell"></i></button></Link> : <></>
                        }
                        
                        <button className="btn me-1" style={{border:"2px solid #b89472"}} type="submit"><i style={{color:"#b89472"}} className="fas fa-search"></i></button>
                        <input className="form-control me-2" style={{background:"transparent", borderBottom:"2px solid #b89472"}} type="search" placeholder="Search" aria-label="Search" />
                        <button style={{background:"#b89472", color:"#ffe8d6e0"}} className="btn" onClick={LogOut}>Logout</button>
                    </form>
                    </div>
                </div>
            </nav>
        </Fragment>
    )
}

export default NavbarFixed