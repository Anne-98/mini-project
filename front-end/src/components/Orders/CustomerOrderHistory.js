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
                <h1 className="text-center common-header" style={{zIndex:"3"}}>My Orders</h1>
            <div className="row" style={{width:"75vw", margin:"0 auto"}}>
                <div className="text-center cm-order-history-wrapper col-12 col-md-6 " >
                        <div className="text-center cm-order-history-sub-heading"><span>Direct Orders</span></div>
                        <div className="row">
                            {
                            direct.map((item)=>{

                                return(
                                    <div className="col cm-order-history-card" >
                                <div className="cm-order-history-card-inner ">
                                <img className="cm-order-history-img" src={item.image} />

                            <Link to={`/orders/order/details/${item.direct_order_id}`}>
                            <div className="cm-order-history-date-div row">
                                <div className="order-history-date-item col-9">{item.complete_date.substring(0,10)}</div>
                                <div className="col-3 "><i class="fas fa-angle-double-right"></i></div>
                            </div>
                            </Link>
                            </div>
                            
                        </div>
                        )
                    })
                }
                        </div>
            </div>
    <div className="text-center cm-order-history-wrapper col-12 col-md-6 ">
        <div className="cm-order-history-sub-heading"><span>Indirect Orders</span></div>
        <div className="row">
            {
            indirect.map((item)=>{

                return(
                    <div className="col cm-order-history-card " >
                        <div className="cm-order-history-card-inner">                   
                            <img className="cm-order-history-img" src={item.image}/>

                             
                            <Link to={`/orders/order/details/${item.indirect_order_id}`}>
                            <div className="cm-order-history-date-div row">
                                <div className="order-history-date-item col-9">{item.complete_date.substring(0,10)}</div>
                                <div className="col-3 "><i class="fas fa-angle-double-right"></i></div>
                            </div>
                            </Link>
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