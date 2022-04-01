import React, { Fragment, useContext, useEffect, useState } from "react";
import axios from 'axios';
import {useParams, Link, useNavigate} from 'react-router-dom';
import './../../css/Orders/DesignDetails.css';
import { UserIdContext } from "../Context/UserIdContext";

const DesignDetails = () => {

    var params = useParams()
    var design_id = params.design_id
    var [design, setDesign] = useState([])
    var [msg, setMsg] = useState('')
    var [cake_makers_id, setCake_makers_id] = useState('')
    let [userId, setUserId] = useContext(UserIdContext)
    var navigate = useNavigate()
    console.log("userId: ",userId)
    useEffect(async()=>{

        var {data} = await axios.post('http://localhost:8000/general/get_one_design/design_details', {design_id})

        if (data.success) {
            setMsg(data.msg)
            setDesign(data.data)
            setCake_makers_id(data.data[0].cake_makers_id)
        }else{
            setMsg(data.msg)
        }

    }, [])

    const userOnClick = () => {
        alert("You should have an account to make order")
        navigate('/login')
    }
    return(

        <Fragment>
            <h1 className="text-center common-header" style={{zIndex:"3"}}>Design Details</h1>
            <div className="design-details-wrapper" >
                {
                    design.map((item) => {
                        return(
                            <div className="row justify-content-center mt-5">
                                <img className="col-md-5 col-lg-4 col-sm-12 col-xs-12 design-details-img" src={item.image} alt="Card image" style={{position:"relative"}}/>
                                
                                <div className="col-md-5 col-lg-5 col-sm-12 col-xs-12 design-details-content justify-content-center row">
                                    <div className="design-details-content-inner col-12 col-lg-9">
                                        <h1 className="m-3 design-details-title">{item.title}</h1>

                                        <div className="row m-3 mt-5">
                                            <div className="col-4 col-lg-2 "><b>Category</b></div>
                                            <div className="col-7 col-lg-8">{item.category}</div>
                                        </div>
                                        <div className="row m-3">
                                            <div className="col-4 col-lg-2 "><b>Price</b></div>
                                            <div className="col-7 col-lg-8">${item.price}</div>
                                        </div>
                                        <div className="row m-3">
                                            <div className="col-4 col-lg-2 "><b>Details</b></div>
                                            <div className="col-7 col-lg-8">{item.description}</div>
                                        </div>
                                        {/* <div className="m-3 mt-5" style={{color:"#f9c74f"}}>
                                                <i className="fas fa-star"></i>
                                                <i className="fas fa-star"></i>
                                                <i className="fas fa-star"></i>
                                                <i className="fas fa-star-half-alt fa-star"></i>
                                                <i className="far fa-star"></i>    
                                        </div> */}
            <div className="row">
                
                    <div className="m-3 col-md-4 col-4" > <Link to={`/profiles/cakemaker/${cake_makers_id}`}><button className="btn" style={{background:"#b89472", color:"white"}}>Baker Profile</button></Link></div>
           {
                userId.length > 0 ? <div className="m-3 col-md-2 col-2 design-details-order-btn text-center"><Link to={`/orders/direct/${item.design_id}`} >
                <button className="btn " >Order</button></Link>
                </div> : <div className="m-3 col-md-2 col-2 design-details-order-btn text-center"onClick={userOnClick}>
                <button className="btn" >Order</button>
                </div>
            }
            </div>
            
                                    </div>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
            </Fragment>
    )
}

export default DesignDetails