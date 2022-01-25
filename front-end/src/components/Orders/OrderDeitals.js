import axios from "axios";
import React, { Fragment, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const OrderDetails = () => {

    var params = useParams()
    var order_id = params.order_id
    var [msg, setMsg] = useState('')
    var [direct, setDirect] = useState([])
    var [indirect, setIndirect] = useState([])
    var [cusDetails, setCusDetails] = useState([])

    useEffect(async()=>{

        var {data} = await axios.post("http://localhost:8000/cakemaker/one_order/details", {order_id})

        if (data.isLog) {
            if (data.success) {
                setDirect(data.direct_row)
                setIndirect(data.indirect_row)
                setCusDetails(data.cus_details[0])
            }else{
                setMsg(data.msg)
            }
        }else{
            setMsg(data.msg)
        }

    },[])

    console.log("direct",direct)
    console.log("indirect",indirect)
    console.log("cusDetails",cusDetails)
    return(
        <Fragment>
            <br/>
            <br/>
            <br/>
            <h1 className="mt-5 text-center">Order Details</h1>
            <div className="card m-auto" style={{width:"35rem"}}>
                {
                    indirect.map((item) => {
                        return(
                            <>
                                <img className="card-img-top" src={item.image} alt="Card image cap" />
                                <div className="card-body">
                                    <h5 className="card-title">Customer Details</h5>
                                    <div className="card-text m-3"><b>Name: </b>{cusDetails.name}</div>
                                    <div className="card-text m-3"><b>Contact Number: </b>0{cusDetails.contact_num}</div>
                                    <div className="card-text m-3"><b>Address: </b>{cusDetails.address}</div>
                                </div>
                                <ul className="list-group list-group-flush">
                                    <li className="list-group-item">
                                        <div><b>Complete Date:</b> {item.complete_date.substring(0,10)}</div>
                                        <div></div>
                                    </li>
                                    <li className="list-group-item">
                                        <div><b>Ordered Date:</b> {item.order_date.substring(0,10)}</div>
                                        <div></div>
                                    </li>
                                </ul>
                                    <div className="card-header">{item.comment}</div>
                            </>
                        )
                    })
                }
            </div>
            <div className="card m-auto" style={{width:"35rem"}}>
                {
                    direct.map((item) => {
                        return(
                            <>
                                <img className="card-img-top" src={item.image} alt="Card image cap" />
                                <div className="card-body">
                                    <h5 className="card-title">Customer Details</h5>
                                    <div className="card-text m-3"><b>Name: </b>{cusDetails.name}</div>
                                    <div className="card-text m-3"><b>Contact Number: </b>0{cusDetails.contact_num}</div>
                                    <div className="card-text m-3"><b>Address: </b>{cusDetails.address}</div>
                                </div>
                                <ul className="list-group list-group-flush">
                                    <li className="list-group-item">
                                        <div><b>Complete Date:</b> {item.complete_date.substring(0,10)}</div>
                                        <div></div>
                                    </li>
                                    <li className="list-group-item">
                                        <div><b>Ordered Date:</b> {item.order_date.substring(0,10)}</div>
                                        <div></div>
                                    </li>
                                </ul>
                                    <div className="card-header">{item.comment}</div>
                            </>
                        )
                    })
                }
            </div>
        </Fragment>
    )
}

export default OrderDetails