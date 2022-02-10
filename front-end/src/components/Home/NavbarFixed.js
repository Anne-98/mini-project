import React, { Fragment, useContext, useState } from "react";
import './../../css/navbar.css';
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { UserIdContext } from "../Context/UserIdContext";
import { UserTypeContext } from "../Context/UserTypeContext";
import { OrderContext } from "../Context/OrderContext";

const NavbarFixed = () => {

    var navigate = useNavigate()

    let [type, setType] = useContext(UserTypeContext)
    let [userId, setUserId] = useContext(UserIdContext)
    let [orders, setOrders] = useContext(OrderContext)
    var [searched_item, setSearchedItem] = useState('')
    var navigate = useNavigate()
    console.log(userId)

    setOrders(localStorage.getItem('orders'))

    const refreshPage = () => {
        window.location.reload(true)
    }

    const LogOut = async() => {
        
        var {data} = await axios.get('http://localhost:8000/general/logout')
        console.log("isLog",data.isLog)

        if (!data.isLog) {
            console.log(type, userId)
            navigate('/')
            localStorage.setItem('type',"")
            localStorage.setItem('userId',"")
            localStorage.setItem('orders',"")
            setUserId("")
            setOrders("")
            setType("")
        }

        refreshPage()
    }
    
    const searchPage = () => {
        refreshPage()
        navigate(`/search/${searched_item}`)
    }

    return(
        <Fragment>
            <nav className="navbar fixed-top navbar-expand-lg" id="navbarWrapper">
                <div className="container-fluid" >
                    <a className="navbar-brand" href="#">Cake Mount</a>
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
                            <Link className="navItem" to="/profiles/allcakemakers">Bakers</Link>
                        </li>
                        <li className="nav-item  text-center">
                            <Link className="navItem" to={`/workplace`}>Workplace</Link>
                        </li>
                        {
                            type == 'customer' ? <li className="nav-item  text-center">
                            <Link className="navItem" to={`/customer/orders/history/${userId}`}>Order history</Link>
                        </li> : <></>
                        }
                        <li className="nav-item  text-center">
                            {
                                type == 'customer' ? <Link className="navItem" to={`/profiles/customer/${userId}`}>Profile</Link> : type == 'cakemaker' ? <Link className="navItem" to={`/profiles/cakemaker/${userId}`}>Profile</Link> : type == 'admin' ? <Link className="navItem" to={`/profiles/admin/${userId}`}>Profile</Link> : <span></span>
                                
                            }
                        </li>
                    </ul>
                        {
                            type == 'cakemaker' ? <Link to={`/cakemaker/calender/${userId}`}> <button  className="btn" ><i style={{fontSize:"25px", color:"#b89472"}} className="far fa-calendar"></i></button></Link> : <></>
                        }
                        {
                            type == 'customer' ? <Link to={`/customer/notifications/${userId}`}> <button  className="btn navbar-notification" ><i style={{fontSize:"25px", color:"#b89472"}} className="fas fa-bell"><span className="text-monospace p-1" style={{background:"#e63946", color:"white", borderRadius:"50px", position:"absolute", margin:"-8px", fontSize:"10px", fontFamily:"sans-serif"}}>{orders}</span></i></button></Link> : <></>
                        }
                        {
                            type == 'cakemaker' ? <Link to={`cakemaker/orders/all/${userId}`}> <button  className="btn" ><i style={{fontSize:"25px", color:"#b89472"}} className="fas fa-birthday-cake"><span className="text-monospace p-1" style={{background:"#e63946", color:"white", borderRadius:"50px", position:"absolute", margin:"-8px", fontSize:"10px", fontFamily:"sans-serif"}}>{orders}</span></i></button></Link> : <></>
                        }
                    <form className="d-flex">


                        <input className="form-control me-2" style={{background:"transparent", borderBottom:"2px solid #b89472"}} type="search" placeholder="Search" aria-label="Search" value={searched_item} onChange={(e) => {setSearchedItem(e.target.value)}} id="navbar-search-input"/>

                        <button className="btn me-1" style={{border:"2px solid #b89472"}} onClick={searchPage}><i style={{color:"#b89472"}} aria-label="Search" className="fas fa-search"></i></button>
                        <button style={{background:"#b89472", color:"#ffe8d6e0"}} className="btn" onClick={LogOut}>Logout</button>
                    </form>
                    </div>
                </div>
            </nav>
        </Fragment>
    )
}

export default NavbarFixed