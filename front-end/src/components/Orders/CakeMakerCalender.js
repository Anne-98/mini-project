import axios from "axios";
import React, { useCallback, useContext, useEffect, useState } from "react";
import { UserIdContext } from "../Context/UserIdContext";
import { UserTypeContext } from "../Context/UserTypeContext";
import {Calendar} from '@natscale/react-calendar';
import '@natscale/react-calendar/dist/main.css';
import { Link } from "react-router-dom";
import './../../css/Orders/CakemakerCalendar.css';

const CakeMakerCalender = () =>{

    var [userId, setUserId] = useContext(UserIdContext)
    var [type, setType] = useContext(UserTypeContext)
    var [direct_row, setDirect_row] = useState([])
    var [indirect_row, setIndirect_row] = useState([])
    var [msg, setMsg] = useState('')
    const [value, setValue] = useState();
    const [overdue_orders, setOverdue_orders] = useState([]);
    var i = 0;
    var j = 0;

    useEffect(async()=>{

        var {data} = await axios.post('http://localhost:8000/cakemaker/confirmed/all_orders', {cake_makers_id: userId})
        
        console.log(data.data)
        if (data.isLog) {
            if (data.success) {
                setMsg(data.msg)
                setDirect_row(data.data.direct_row)
                setIndirect_row(data.data.indirect_row)
            }
        }else{
            setMsg(data.msg)
        }
    },[])

    const clickDispatch = async(order_id) => {

        let {data} = await axios.post('http://localhost:8000/cakemaker/dispatch_order/dispatch', {order_id})

        if (data.isLog) {
            if (!data.success) {
                setMsg(data.msg)
            }
        }else{
            setMsg(data.msg)
        }
        window.location.reload(true)
    }

    const overdueOrders = async(cake_makers_id, overdue_orders) =>{
        console.log(i+j)
        let {data} = await axios.post('http://localhost:8000/cakemaker/set_overdue/overdue', {cake_makers_id, overdue_orders})
    }
    
    return(
        <div className="calendar-wrapper">
            <h1 className="text-center common-header" style={{zIndex:"3"}}>Calendar</h1>
            <h5 className="text-danger text-center mb-3">{msg}</h5>
            <div className="container">
                <div className="row calendar-order-wrapper">

                    <div className="col-md-12 col-lg-6 col-12 text-center ">
                        <div className="text-center cm-order-history-sub-heading"><span>Direct Orders</span></div>
                        <ul className="list-group align-items-center mt-4">
                        {
                            direct_row.map((item, index) => {
                                
                                var date2 = new Date(item.complete_date);
                                var date1 = new Date();
                                
                                var Difference_In_Time = date2.getTime() - date1.getTime();
                                
                                // To calculate the no. of days between two dates
                                var Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);
                                
                                let round_num = Math.ceil(Difference_In_Days, 1)

                                if (round_num < 0) {
                                    i = i+1 
                                }

                                // }
                                return(
                                    <div className="notifications__item" id="calendar-orderlist-div" data-aos="fade-up" data-aos-duration="1000">
                                    {
                                        round_num > 0 ? 
                                        
                                <div className="row calendar-orderlist">
                                    <div className="col-md-9 col-8">
                                        <Link to={`/orders/order/details/${item.direct_order_id}`}>
                                        
                                        <li  className="calendar-list-item  d-flex justify-content-between align-items-center">
                                        {item.complete_date}
                                            <span style={{color:"black", background: round_num < 0 ? 
                                            
                                            "#c93d4d" : 8 > round_num > 0 ? "#3379a1" : "#36a374"}}     className="badge">{round_num}</span>
                                        </li>
                                    </Link>
                                    </div>

                                    
                                    {
                                        round_num > 0 ?  <div className="col-md-3 col-4"><button onClick={(e)=>{
                                        clickDispatch(item.direct_order_id);
                                        }} className=" calendar-dispatch-btn btn">Dispatch</button></div> : <></>

                                    }

                                    
                                </div> : 
                                // OVERDUE ORDER LIST
                                <div className="row calendar-orderlist" >
                                    <div className="col"  id="calendar-overdue-div">
                                        <Link to={`/orders/order/details/${item.direct_order_id}`}>
                                        <li  className="calendar-list-item d-flex justify-content-between align-items-center" style={{color:"#ad2831"}}>
                                        {item.complete_date}
                                    </li>
                                    </Link>
                                    </div>
                                    <div className="col-4 col-md-3">
                                        <button  className="calendar-overdue-btn disabled btn ">Overdue</button></div>
                                </div>
                                    }
                                    </div>
                                    )
                            })
                        }
                    </ul>
                    </div>

                    <div className="col-md-12 col-lg-6 col-12 calendar-order-container text-center">
                        <div className="text-center cm-order-history-sub-heading"><span>Indirect Orders</span></div>
                        <ul className="list-group align-items-center mt-4">

                        {
                            indirect_row.map((item, index) => {
                                
                                var date2 = new Date(item.complete_date);
                                var date1 = new Date();
                                
                                var Difference_In_Time = date2.getTime() - date1.getTime();
                                
                                // To calculate the no. of days between two dates
                                var Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);
                                
                                let round_num = Math.ceil(Difference_In_Days, 1)

                                if (round_num < 0) {
                                    j = j +1 
                                }
                                if (indirect_row.length == index +1) {
                                    // console.log("indirect_row.length: ",indirect_row.length, index)
                                    overdueOrders(localStorage.getItem('userId', userId), i+j)
                                }
                                return(
                                    <div className="notifications__item" id="calendar-orderlist-div" data-aos="fade-up" data-aos-duration="1000">
                                    {
                                        round_num > 0 ? 
                                        <div className="row calendar-orderlist">
                                    {/* <Calendar value={date} onChange={onChange}/> */}
                                    <div className="col-md-9 col-8">
                                        <Link to={`/orders/order/details/${item.indirect_order_id}`}>
                                        <li  className="calendar-list-item  d-flex justify-content-between align-items-center">
                                        {item.complete_date}
                                        <span style={{color:"black", background: round_num < 0 ? 
                                        "#c93d4d" : 8 > round_num > 0 ? "#3379a1" : "#36a374"}}     className="badge">{round_num}</span>
                                    </li>
                                    </Link>
                                    </div>

                                    
                                        {
                                            round_num > 0 ?  <div className="col-4 col-md-3"><button onClick={(e)=>{
                                        clickDispatch(item.indirect_order_id);
                                        }} className="calendar-dispatch-btn btn ">Dispatch</button></div> : <></>

                                        }
                                    
                                    
                                </div> :
                                <div className="row calendar-orderlist" >
                                    {/* <Calendar value={date} onChange={onChange}/> */}
                                    <div className="col" id="calendar-overdue-div">
                                        <Link to={`/orders/order/details/${item.indirect_order_id}`}>
                                        <li  className="calendar-list-item d-flex justify-content-between align-items-center" style={{color:"#ad2831"}}>
                                        {item.complete_date}
                                    </li>
                                    </Link>
                                    </div>
                                    <div className="col-4 col-md-3">
                                        <button  className="calendar-overdue-btn disabled btn ">Overdue</button></div>
                                    </div>
                                    }
                                </div>
                                )
                            })
                        }
                    </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CakeMakerCalender;
