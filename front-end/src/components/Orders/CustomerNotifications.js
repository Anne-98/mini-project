import axios from "axios";
import React, { Fragment, useCallback, useContext, useEffect, useState } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { OrderContext } from "../Context/OrderContext";
import './../../css/Orders/CustomerNotifications.css';

const CustomerNotifications = () => {

    var params = useParams()
    var cus_id = params.customer_id
    var [direct, setDirect] = useState([])
    var [indirect, setIndirect]   = useState([])   
    var [msg, setMsg]   = useState([])  
    var [orders, setOrders] = useContext(OrderContext) 

    var location = useLocation()
    var navigate = useNavigate()

    useEffect(async()=>{
        var {data} = await axios.post('http://localhost:8000/customer/notifications/display', {cus_id})

        console.log("data", data)

        if (data.isLog) {
            if (data.success) {
                setDirect(data.data.direct_row)
                setIndirect(data.data.indirect_row)
                setMsg(data.msg)
            }
        }else{
            setMsg(data.msg)
        }
    }, [])
    
    
    const appendClass = async(e, order_id) => {
        
        // reduce order context
        let order = localStorage.getItem('orders') - 1
        localStorage.setItem('orders', order)
        setOrders(order)

        console.log(e.target.parentElement.parentElement)
        e.target.parentElement.parentElement.classList.toggle('delete')
        var {data} = await axios.post('http://localhost:8000/customer/notifications/checked', {order_id})
        // if (data.isLog) {
            // refreshPage()
            if (data.success) {
                setMsg(data.msg)
            }
        setMsg('')

    }

    const orderDetails = (order_id, cake_makers_id) =>{
        navigate(`/orders/order/details/${order_id}`)
    }

    const setFeedback = (order_id, cake_makers_id) =>{
        navigate(`/customer/ratings/${cake_makers_id}`, {state: {order_id}})
    }
console.log(indirect)
    return(
        <Fragment>
            <h1 className="text-center common-header" style={{zIndex:"3"}}>Notifications</h1>
            {/* {msg} */}
            <div className="notifications__wrapper" >

            {   direct.length ?
                <div className="notifications_container">
                        <h2 className="text-center pb-4 common_sub_header" >Direct Orders</h2>
                        {
                        direct.map((item) => {

                            var order_date = item.order_date
                            var splitted_date = order_date.substr(0,10)

                            return(
                                    <div className= 'notifications__item row'>

                            <div className="notifications__item__avatar col-3 col-md-3">
                                <img src={item.image}/>
                                <button onClick={() => {orderDetails(item.direct_order_id, item.cake_makers_id)}} className="btn notifications__details"><i className="far fa-arrow-alt-circle-right" style={{color:"#ffe8d6e0"}}></i></button>
                            </div>
                            {
                                item.dispatched == '0' ?

                                <div className="notifications__item__content col-6">
                                    <span className="notifications__item__date">{splitted_date}</span>
                                    {
                                        item.confirm == true && item.dispatched == '0'? <span className="notifications__item__message">Your Order Confirmed</span> : 
                                        <span className="notifications__item__message">Place Your Order to a different Cakemaker</span>
                                        
                                    }
                                </div> :
                            <div className="notifications__item__content col-6">
                                <span className="notifications__item__date">{splitted_date}</span>
                                <p className="notifications__item__message">Your order dispacthed.</p> 
                                {
                                    item.rated == '0' ?
                                    <button onClick={() => {setFeedback(item.direct_order_id, item.cake_makers_id)}} className="btn notification-feedback-btn">Feedback</button> :
                                    <></>
                                }
                            </div>
                            }

                            <div id="hello" className="col-1">
                                <i className=" notifications__item__option delete fas fa-trash" onClick={
                                    (e) => {
                                        appendClass(e, item.direct_order_id)
                                    }} >
                                </i><br/>
                                {
                                    item.rejected ? <i className="fas fa-exclamation-circle" style={{color:"#c93d4d"}}></i> : <i className="fas fa-check-circle" style={{color:"#3dc98c"}}></i>
                                }

                            </div>
                        </div>
                            )
                        })
                    }
                    </div> : <></>
            }
            {   indirect.length ?
                <div className="notifications_container ">
                        <h2 className="text-center pb-4  pt-4 common_sub_header">Indirect Orders</h2>
                        {
                        indirect.map((item) => {

                            var order_date = item.order_date
                            var splitted_date = order_date.substr(0,10)

                            return(
                            <div className= 'notifications__item row'>
                            <div className="notifications__item__avatar col-4 col-md-3">
                                <img src={item.image} />
                                <button onClick={() => {orderDetails(item.indirect_order_id, item.cake_makers_id)}} className="btn notifications__details"><i className="far fa-arrow-alt-circle-right" style={{color:"#ffe8d6e0"}}></i></button>
                            </div>
                           {
                                item.dispatched == '0' ?
                                <div className="notifications__item__content col-6">
                                <span className="notifications__item__date">{splitted_date}</span>
                                {
                                    item.confirm == true && item.dispatched == '0'? <span className="notifications__item__message">Your Order Confirmed</span> : 
                                    <span className="notifications__item__message">Place Your Order to a different Cakemaker</span>
                                    
                                }
                            </div> :
                            <div className="notifications__item__content col-6">
                                <span className="notifications__item__date">{splitted_date}</span>
                                <span className="notifications__item__message">Your order dispacthed.</span> 
                                {
                                    item.rated == '0' ?
                                    <button onClick={() => {setFeedback(item.indirect_order_id, item.cake_makers_id)}} className="btn notification-feedback-btn">Feedback</button> :
                                    <></>
                                }
                            </div>
                            }

                            <div id="hello" className="col-1">
                                <i className=" notifications__item__option delete fas fa-trash " onClick={
                                    (e) => {
                                        appendClass(e, item.indirect_order_id)
                                    }} >
                                </i><br/>
                                {
                                    item.rejected ? <i className="fas fa-exclamation-circle" style={{color:"#c93d4d"}}></i> : <i className="fas fa-check-circle" style={{color:"#3dc98c"}}></i>
                                }

                            </div>
                        </div>
                            )
                        })
                    }
                    </div> : <></>
            }
                    
                </div>
        </Fragment>
    )
}

export default CustomerNotifications