import axios from "axios";
import React, { Fragment, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

axios.defaults.withCredentials = true

const CustomerOrderHistory = () => {

    var params = useParams()
    var customer_id = params.customer_id
    var [direct, setDirect] = useState([])
    var [indirect, setIndirect] = useState([])
    var [msg, setMsg] = useState('')
    
    useEffect(async() =>{
        var {data} = await axios.post('http://localhost:8000/customer/orders/history', {customer_id})

        console.log(data)
        if (data.isLog) {
            if (data.success) {
                setDirect(data.data.direct_row)
                setIndirect(data.data.indirect_row)
                setMsg(data.msg)
            }else{
                setMsg(data.msg)
            }
        }else{
            setMsg(data.msg)
        }
    },[])

    return(
        <Fragment>
            <br/>
            <br/>
            <br/>
            <div className="mt-5 text-center">
                <h1>My Orders</h1>
                <h5 id="passwordHelpInline" className="text-danger">{msg}</h5>
                <div className="text-center mx-auto mt-5">
                    <div className="" style={{width:"45%", float:"left"}}>
                        <h1>Direct Orders</h1>
                        {
                            direct.map((item)=>{
                                return(
                                    <div className="card" style={{width:"15rem", float:"left"}}>
                                        <img className="card-img-top" src={item.image} alt="Card image cap" style={{width:"15rem", height:"15rem", objectFit:"cover"}}/>
                                        <div className="card-body">
                                            <p className="card-text">{item.comment}</p>
                                            <p><i>{item.order_date.substring(0,10)}</i></p>
                                            <Link to={`/orders/order/details/${item.direct_order_id}`}><a href="#" className="btn btn-primary">Go somewhere</a></Link>
                                        </div>
                                </div>
                                )
                            })
                        }
                    </div>
                    <div>
                        <h1>Indirect Orders</h1>
                        {
                            indirect.map((item)=>{
                                return(
                                    <div className="card" style={{width:"15rem", float:"left"}}>
                                        <img className="card-img-top" src={item.image} alt="Card image cap" style={{width:"15rem", height:"15rem", objectFit:"cover"}}/>
                                        <div className="card-body">
                                            <p className="card-text">{item.comment}</p>
                                            <p><i>{item.order_date.substring(0,10)}</i></p>
                                            <Link to={`/orders/order/details/${item.indirect_order_id}`}><a href="#" className="btn btn-primary">Details</a></Link>
                                        </div>
                                </div>
                                )
                            })
                        }
                    </div>
                </div>
            </div>
        </Fragment>
    )
}

export default CustomerOrderHistory