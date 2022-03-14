import axios from "axios";
import React, { Fragment, useEffect, useState } from "react";
import { useParams , Link} from "react-router-dom";

const OrderDetails = () => {

    var params = useParams()
    var order_id = params.order_id
    var [msg, setMsg] = useState('')
    var [direct, setDirect] = useState([])
    var [indirect, setIndirect] = useState([])
    var [cusDetails, setCusDetails] = useState([])
    var [cakeMakersDetails, setCakeMakersDetails] = useState([])
    var [cake_makers_id, setCakeMakersId] = useState('')
    

    useEffect(async()=>{

        var {data} = await axios.post("http://localhost:8000/cakemaker/one_order/details", {order_id})
        
        if (data.isLog) {
            if (data.success) {
                setDirect(data.direct_row)
                setIndirect(data.indirect_row)
                setCusDetails(data.cus_details[0])
                // console.log("dataSet", dataSet.data)
                // setCakeMakersDetails(dataSet.data.data[0])
            }else{
                setMsg(data.msg)
            }
        }else{
            setMsg(data.msg)
        }
        
    },[])
    
    console.log("direct",direct)
    // console.log("indirect",indirect)
    // console.log("cusDetails",cusDetails)
    // console.log("cakeMakersDetails",cakeMakersDetails)
    return(
        <Fragment>
             <h1 className="text-center common-header" style={{zIndex:"3"}}>Order Details</h1>
            <div className="design-details-wrapper" >
                {
                    indirect.map((item) => {
                        return(
                            <div className="row justify-content-center mt-5">
                                <img className="col-md-5 col-lg-4 col-sm-12 col-xs-12 design-details-img" src={item.image} alt="Card image cap" />
                                <div className="col-md-5 col-lg-5 col-sm-12 col-xs-12 design-details-content justify-content-center row">


                                 {/* customer details.............. */}
                                    <div className="design-details-content-inner col-12 col-lg-9">
                                        <h4 className="m-3 design-details-title ">Customer Details</h4>

                                    <div className="row m-3">
                                        <div className="col-5 col-lg-3 "><b>Name</b></div>
                                        <div className="col-7 col-lg-7">{cusDetails.name}</div>
                                    </div>
                                    <div className="row m-3">
                                        <div className="col-5 col-lg-3 "><b>Number</b></div>
                                        <div className="col-7 col-lg-7">0{cusDetails.contact_num}</div>
                                    </div>
                                    <div className="row m-3">
                                        <div className="col-5 col-lg-3 "><b>Address</b></div>
                                        <div className="col-7 col-lg-7">{cusDetails.address}</div>
                                    </div>
                                    <div className="row m-3">
                                            <div className="col-5 col-lg-3 "><b>Comments</b></div>
                                            <div className="col-7 col-lg-7">{item.comment}</div>
                                    </div>
                                    <div className="row m-3">
                                        <div className="col-5 col-lg-3 "><b>Ordered Date</b></div>
                                        <div className="col-7 col-lg-7"> {item.order_date.substring(0,10)}</div>
                                    </div>
                                    <div className="row m-3">
                                        <div className="col-5 col-lg-3" ><b>Complete Date</b></div>
                                        <div className="col-7 col-lg-7" >{item.complete_date.substring(0,10)}</div>
                                    </div>
                                    </div>

                                {/* cakemaker details............. */}

                                <div className="row order-details-profile-div col-12 col-lg-9 p-3">
                                <Link to={`/profiles/cakemaker/${item.cake_makers_id}`}>
                                   <div className="row order-details-profile-div-inner ">
                                        <div className='cm-profile-img-div col-2'>
                                        <img src={item.profile_picture} className="order-details-profile-img" alt="..."/>
                                    </div>
                                    <div className='col-8 col-lg-9 order-details-profile-body my-auto mx-auto'>
                                        <h5 className="">{item.name}</h5>
                                        <div className='order-details-body row'>
                                            <span className='details-heading col-3 col-lg-2'><i className="fas fa-home"></i></span>
                                            <span className="col-8">{item.district}</span>
                                        </div>
                                        <div className='order-details-body row'>
                                            <span className='details-heading col-3 col-lg-2'><i className="fas fa-phone"></i></span>
                                            <span className="col-8">0{item.contact_num}</span>
                                        </div>
                                    </div>
                                   </div>
                                </Link>
                                </div>

                                </div>
                            </div>
                        )
                    })
                }
            </div>
            <div className="design-details-wrapper" >
                {
                    direct.map((item) => {
                        return(
                            <div className="row justify-content-center mt-5">
                                <img className="col-md-5 col-lg-4 col-sm-12 col-xs-12 design-details-img" src={item.image} alt="Card image cap" />
                                <div className="col-md-5 col-lg-5 col-sm-12 col-xs-12 design-details-content justify-content-center row">


                                 {/* customer details.............. */}
                                    <div className="design-details-content-inner col-12 col-lg-9">
                                        <h4 className="m-3 design-details-title ">Customer Details</h4>

                                    <div className="row m-3">
                                        <div className="col-5 col-lg-3 "><b>Name</b></div>
                                        <div className="col-7 col-lg-7">{cusDetails.name}</div>
                                    </div>
                                    <div className="row m-3">
                                        <div className="col-5 col-lg-3 "><b>Number</b></div>
                                        <div className="col-7 col-lg-7">0{cusDetails.contact_num}</div>
                                    </div>
                                    <div className="row m-3">
                                        <div className="col-5 col-lg-3 "><b>Address</b></div>
                                        <div className="col-7 col-lg-7">{cusDetails.address}</div>
                                    </div>
                                    <div className="row m-3">
                                            <div className="col-5 col-lg-3 "><b>Comments</b></div>
                                            <div className="col-7 col-lg-7">{item.comment}</div>
                                    </div>
                                    <div className="row m-3">
                                        <div className="col-5 col-lg-3 "><b>Ordered Date</b></div>
                                        <div className="col-7 col-lg-7"> {item.order_date.substring(0,10)}</div>
                                    </div>
                                    <div className="row m-3">
                                        <div className="col-5 col-lg-3" ><b>Complete Date</b></div>
                                        <div className="col-7 col-lg-7" >{item.complete_date.substring(0,10)}</div>
                                    </div>
                                    </div>

                                {/* cakemaker details............. */}

                                    <div className="row order-details-profile-div col-12 col-lg-9 p-3">
                                <Link to={`/profiles/cakemaker/${item.cake_makers_id}`}>
                                   <div className="row order-details-profile-div-inner ">
                                        <div className='cm-profile-img-div col-2'>
                                        <img src={item.profile_picture} className="order-details-profile-img" alt="..."/>
                                    </div>
                                    <div className='col-8 col-lg-9 order-details-profile-body my-auto mx-auto'>
                                        <h5 className="">{item.name}</h5>
                                        <div className='order-details-body row'>
                                            <span className='details-heading col-3 col-lg-2'><i className="fas fa-home"></i></span>
                                            <span className="col-8">{item.district}</span>
                                        </div>
                                        <div className='order-details-body row'>
                                            <span className='details-heading col-3 col-lg-2'><i className="fas fa-phone"></i></span>
                                            <span className="col-8">0{item.contact_num}</span>
                                        </div>
                                    </div>
                                   </div>
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

export default OrderDetails