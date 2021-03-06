import React, { Fragment, useContext, useEffect, useState } from "react";
import './../../css/navbar.css';
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { UserIdContext } from "../Context/UserIdContext";
import { UserTypeContext } from "../Context/UserTypeContext";
import { OrderContext } from "../Context/OrderContext";
import {Nav} from 'react-bootstrap';

const NavbarFixed = () => {

    var navigate = useNavigate()

    let [type, setType] = useContext(UserTypeContext)
    let [userId, setUserId] = useContext(UserIdContext)
    let [orders, setOrders] = useContext(OrderContext)
    var [searched_item, setSearchedItem] = useState('')
    var [cakemakerDetails, setCakemakerDetails] = useState([])
    var navigate = useNavigate()
    console.log(userId)

    setOrders(localStorage.getItem('orders'))

    
    const refreshPage = () => {
        window.location.reload(true)
    }
    
    const loadTop = () => {
        window.scrollTo(0, 0)
        
    }
    
    const refreshLoadTop = (e) => {
        e.preventDefault();
        window.location.reload(true)
    
    }

    useEffect(async()=>{
        var {data} = await axios.post('http://localhost:8000/cakemaker/profile/myprofile', {cake_makers_id: userId})
        console.log("dataCkaemra",data)
        // if (data.isLog) {
            setCakemakerDetails(data.data[0])
        // }
    }, [])

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
                    <Nav.Item onClick={refreshLoadTop}>
                        <Link to={`/`}><a className="navbar-brand"  href="#">Cake Mount</a></Link>
                    </Nav.Item>

                    <button className="navbar-toggler custom-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation" >
                    <span className="navbar-toggler-icon" id="toggler-icon" style={{color:"black"}}></span>
                    </button>

                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav mx-auto">
                        <li onClick={refreshLoadTop} className="nav-item  text-center">
                            <Link className="navItem"  to="/">Home</Link>
                        </li>
                        
                        {
                            type == '' ? 
                            <Fragment>
                                <li onClick={refreshLoadTop} className="nav-item  text-center">
                                    <Link className="navItem" to="/login">Log In</Link>
                                </li>
                                <li onClick={refreshLoadTop} className="nav-item  text-center">
                                    <Link className="navItem" to="/signin">Sign In</Link>
                                </li>
                            </Fragment> : <></>
                            
                        }
                        
                        <li onClick={refreshLoadTop} className="nav-item  text-center">
                            <Link className="navItem" to="/profiles/allcakemakers">Bakers</Link>
                        </li>
                        <li onClick={refreshLoadTop} className="nav-item  text-center navbar-workplace">
                            <div style={{overflowX:"hidden", width:"75px"}}>
                                <Link className="navItem " to={`/workplace`}>Workplace</Link><div className=" navbar-workplace-icon"></div>
                            </div>
                        </li>
                        {
                            type == 'customer' ? <li onClick={refreshLoadTop} className="nav-item  text-center orderHistory-navItem">
                            <Link className="navItem" to={`/customer/orders/history/${userId}`}>Order history</Link>
                        </li> : <></>
                        }
                        {
                            type == 'admin' ? <li className="nav-item  text-center orderHistory-navItem" 
                            onClick={()=>{
                                localStorage.setItem('orders', '0')
                                refreshLoadTop()
                                }} >
                            <Link className="navItem" to={`/admin/workplace/dashboard/${userId}`} style={{color:"#6b705c"}}>Dashboard</Link>
                        </li> : <></>
                        }
                        {
                            type == 'customer' ?
                            <li onClick={refreshLoadTop} className="nav-item  text-center">
                                <Link className="navItem" to={`/chat/${userId}`}>Chat</Link>
                            </li> : type == 'cakemaker' ?
                            <li onClick={refreshLoadTop} className="nav-item  text-center  orderHistory-navItem">
                                <Link className="navItem" to={`/chat/${userId}`}>Chat</Link>
                            </li> :
                            <></>
                        }                        
                        
                            {
                                type == 'customer' ? <li onClick={refreshLoadTop} className="nav-item text-center orderHistory-navItem" ><Link className="navItem " to={`/profiles/customer/${userId}`}>Profile</Link></li> : type == 'cakemaker' ? <li onClick={refreshLoadTop} className="nav-item text-center " ><Link className="navItem orderHistory-navItem"  to={`/profiles/cakemaker/${userId}`}>Profile</Link> </li> : <span></span>
                                
                            }
                    </ul>
                        {
                            type == 'cakemaker' ? 
                            
                            <button className="btn" onClick={refreshLoadTop}>
                                <Link to={`/cakemaker/overdues/${cakemakerDetails.warning}`}> 
                                <i style={{fontSize:"25px", color:"#b89472", position:"relative"}}  className={`fas fa-exclamation-circle ${cakemakerDetails.warning > 0 ? 'warning-icon' : ''}`}>
                                    {
                                        cakemakerDetails.warning > 0 ? <span className="text-monospace p-1" style={{background:"#e63946", color:"white", borderRadius:"50px", position:"absolute", margin:"-8px", fontSize:"10px", fontFamily:"sans-serif"}}>{cakemakerDetails.warning}</span> : <></>
                                    }
                                    </i>
                                </Link>
                            </button>
                            
                            : <></>
                        }
                        {
                            type == 'cakemaker' ? 
                                                        
                            <button  className="btn" onClick={refreshLoadTop}><Link to={`/cakemaker/calender/${userId}`}><i style={{fontSize:"25px", color:"#b89472"}} className="far fa-calendar"></i></Link> </button>
                            
                            : <></>
                        }
                        {
                            type == 'customer' ? 
                            
                            <button  className="btn navbar-notification" onClick={refreshLoadTop}><Link to={`/customer/notifications/${userId}`}> <i style={{fontSize:"25px", color:"#b89472"}} className="fas fa-bell"><span className="text-monospace p-1" style={{background:"#e63946", color:"white", borderRadius:"50px", position:"absolute", margin:"-8px", fontSize:"10px", fontFamily:"sans-serif"}}>{orders}</span></i></Link></button> : <></>
                        }
                        {
                            type == 'cakemaker' ? <button onClick={refreshLoadTop} className="btn" ><Link to={`cakemaker/orders/all/${userId}`}> <i style={{fontSize:"25px", color:"#b89472"}} className="fas fa-birthday-cake"><span className="text-monospace p-1" style={{background:"#e63946", color:"white", borderRadius:"50px", position:"absolute", margin:"-8px", fontSize:"10px", fontFamily:"sans-serif"}}>{orders}</span></i></Link></button> : <></>
                        }
                    <form className="d-flex">

                        <input className="form-control me-2" style={{background:"transparent", borderBottom:"2px solid #b89472"}} type="search" placeholder="Search" aria-label="Search" value={searched_item} onChange={(e) => {setSearchedItem(e.target.value)}} id="navbar-search-input"/>

                        <button className="btn me-1" style={{border:"2px solid #b89472"}} onClick={searchPage}><i style={{color:"#b89472"}} aria-label="Search" className="fas fa-search"></i></button>
                        {
                            type != '' ? 
                            <button style={{background:"#b89472", color:"#ffe8d6e0"}} className="btn" onClick={LogOut}>Logout</button> :
                            <></> 
                        }
                    </form>
                    </div>
                </div>
            </nav>
        </Fragment>
    )
}

export default NavbarFixed