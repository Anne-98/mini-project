import axios from "axios";
import React, { Fragment, useContext, useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { OrderContext } from "../Context/OrderContext";
import './../../css/Orders/CakeMakerAllOrders.css';

const CakeMakersAllDetails = () => {

    var params = useParams()
    var cake_makers_id = params.cake_makers_id
    var [direct, setDirect] = useState([])
    var [indirect, setIndirect] = useState([])
    var [msg, setMsg] = useState('')
    var [id, setId] = useState('')
    const [orders, setOrders] = useContext(OrderContext)
    
    useEffect(async()=>{
        var {data} = await axios.post('http://localhost:8000/cakemaker/orders/display_orders', {cake_makers_id})

        console.log(data.data)
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
    }, [])

    const orderDirect = async(direct_order_id, confirm, reject)=>{
        
        // to reduce orders in the order context
        var number_of_orders = localStorage.getItem('orders') - 1
        localStorage.setItem('orders', number_of_orders)
        setOrders(number_of_orders)

        let indirect_order_id = 'empty'
        let indirect_reject = 0
        let indirect_confirm = 0
        let direct_reject = reject
        let direct_confirm = confirm

        var body = {indirect_order_id, direct_order_id, indirect_reject, indirect_confirm, direct_reject, direct_confirm}
        var {data} = await axios.post('http://localhost:8000/cakemaker/order/accpect_order', body)

        console.log("accept_order",data)
        if (data.success) {
            setId(direct_order_id)
        }
        console.log(data.msg)
    }
    const orderIndirect = async(indirect_order_id, confirm, reject)=>{

        // to reduce orders in the order context
        var number_of_orders = localStorage.getItem('orders') - 1
        localStorage.setItem('orders', number_of_orders)
        setOrders(number_of_orders)

        let direct_order_id = 'empty'
        let direct_reject = 0
        let direct_confirm = 0
        let indirect_reject = reject
        let indirect_confirm = confirm
        var body = {indirect_order_id, direct_order_id, indirect_reject, indirect_confirm, direct_reject, direct_confirm}
        var {data} = await axios.post('http://localhost:8000/cakemaker/order/accpect_order', body)

        if (data.success) {
            setId(indirect_order_id)
        }

        console.log(data.msg)
    }
    

    return(
        <div>
            <h1 className="text-center common-header" style={{zIndex:"3"}}>Your Orders</h1>
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

                                <div className="cm-order-history-plus-div col-6 text-start">
                                <i onClick={(e)=>{orderDirect(item.direct_order_id, 1, 0) 
                                e.target.parentElement.parentElement.style.display = "none"
                                }} style={{cursor:"pointer"}}  className="fas fa-plus-circle fa-2x" ></i>
                            </div>
                            
                            <div className="col-6 cm-order-history-minus-div text-end">
                                <i  onClick={(e)=>{orderDirect(item.direct_order_id, 0,1)
                                e.target.parentElement.parentElement.style.display = "none"
                                }} style={{cursor:"pointer"}} className="fas fa-minus-circle fa-2x"></i>
                            </div>
                             
                            <Link to={`/orders/order/details/${item.direct_order_id}`}>
                            <div className="cm-order-history-date-div row">
                                <div className="order-history-date-item col-9">{item.complete_date.substring(0,10)}</div>
                                <div className="col-3 "><i class="fas fa-angle-double-right"></i></div>
                                {/* <div className="order-history-date">Complete Date</div> */}
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

                            {/* <div className="row" style={{}}> */}
                                <div className="cm-order-history-plus-div col-6 text-start" >
                                <i onClick={(e)=>{orderIndirect(item.indirect_order_id, 1, 0) 
                                e.target.parentElement.parentElement.style.display = "none"
                                }} style={{cursor:"pointer"}}  className="fas fa-plus-circle fa-2x" ></i>
                            </div>
                            
                            <div className="col-6 cm-order-history-minus-div text-end" >
                                <i  onClick={(e)=>{orderIndirect(item.direct_order_id, 0,1)
                                e.target.parentElement.parentElement.style.display = "none"
                                }} style={{cursor:"pointer"}} className="fas fa-minus-circle fa-2x"></i>
                            </div>
                            {/* </div> */}
                             
                            <Link to={`/orders/order/details/${item.indirect_order_id}`}>
                            <div className="cm-order-history-date-div row">
                                <div className="order-history-date-item col-9">{item.complete_date.substring(0,10)}</div>
                                <div className="col-3 "><i class="fas fa-angle-double-right"></i></div>
                                {/* <div className="order-history-date">Complete Date</div> */}
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
        </div>
    )
}

export default CakeMakersAllDetails