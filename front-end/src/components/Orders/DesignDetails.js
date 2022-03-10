import React, { Fragment, useEffect, useState } from "react";
import axios from 'axios';
import {useParams, Link} from 'react-router-dom';
import './../../css/Orders/DesignDetails.css';

const DesignDetails = () => {

    var params = useParams()
    var design_id = params.design_id
    var [design, setDesign] = useState([])
    var [msg, setMsg] = useState('')
    var [cake_makers_id, setCake_makers_id] = useState('')

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

    return(

        <Fragment>
            <h1 className="text-center common-header" style={{zIndex:"3"}}>Design Details</h1>
            <div className="design-details-wrapper" >
                {
                    design.map((item) => {
                        return(
                            <div className="row justify-content-center mt-5">
                                <img className="col-md-5 col-lg-4 col-sm-12 col-xs-12 design-details-img" src={item.image} alt="Card image"/>
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
                                        <div className="m-3 mt-5" style={{color:"#f9c74f"}}>
                                                <i className="fas fa-star"></i>
                                                <i className="fas fa-star"></i>
                                                <i className="fas fa-star"></i>
                                                <i className="fas fa-star-half-alt fa-star"></i>
                                                <i className="far fa-star"></i>    
                                        </div>
                                        <Link to={`/profiles/cakemaker/${cake_makers_id}`}>
               <div className="m-3" > <button className="btn" style={{background:"#b89472", color:"white"}}>Baker Profile</button></div>
           </Link>
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