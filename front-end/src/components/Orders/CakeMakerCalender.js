import axios from "axios";
import React, { useCallback, useContext, useEffect, useState } from "react";
import { UserIdContext } from "../Context/UserIdContext";
import { UserTypeContext } from "../Context/UserTypeContext";
import {Calendar} from '@natscale/react-calendar';
import '@natscale/react-calendar/dist/main.css';
import { Link } from "react-router-dom";

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
            <h1 className="text-center common-header">Calendar</h1>
            <h5 className="text-danger text-center mb-3">{msg}</h5>
            <div className="container">
                <div className="row">

                    <div className="col-6 text-center">
                        <h2 className="mb-4">Direct Orders</h2>
                        <ul className="list-group m-auto">
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
                                    <>
                                    {
                                        round_num > 0 ? <div className="row">
                                    <div className="col">
                                        <Link to={`/orders/order/details/${item.direct_order_id}`}>
                                        <li className="list-group-item d-flex justify-content-between align-items-center">
                                        {item.complete_date}
                                        <span style={{color:"black", background: round_num < 0 ? 
                                        
                                        "red" : 3 > round_num > 0 ? "blue" : "green"}}     className="badge badge-primary badge-pill rounded-circle">{round_num}</span>
                                    </li>
                                    </Link>
                                    </div>

                                    <div className="col">
                                    {
                                        round_num > 0 ?  <button onClick={(e)=>{
                                        clickDispatch(item.direct_order_id);
                                        }} className="btn btn-success">Dispatch</button> : <></>

                                        }

                                    </div>
                                </div> : 

                                <div className="row" >
                                    <div className="col" >
                                        <Link to={`/orders/order/details/${item.direct_order_id}`}>
                                        <li className="list-group-item d-flex justify-content-between align-items-center" style={{background:"red"}}>
                                        {item.complete_date}
                                    </li>
                                    </Link>
                                    </div>

                                    <div className="col">
                                    {
                                        round_num > 0 ?  <button onClick={(e)=>{
                                        clickDispatch(item.direct_order_id);
                                        }} className="btn btn-success">Dispatch</button> : <></>

                                        }

                                    </div>
                                </div>
                                    }
                                    </>
                                    )
                            })
                        }
                    </ul>
                    </div>

                    <div className="col-6 text-center">
                        <h2 className="mb-4">Indirect Orders</h2>
                        <ul className="list-group m-auto">

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
                                    <>
                                    {
                                        round_num > 0 ? 
                                        <div className="row">
                                    {/* <Calendar value={date} onChange={onChange}/> */}
                                    <div className="col">
                                        <Link to={`/orders/order/details/${item.indirect_order_id}`}>
                                        <li className="list-group-item d-flex justify-content-between align-items-center">
                                        {item.complete_date}
                                        <span style={{color:"black", background: round_num < 0 ? 
                                        "red" : 3 > round_num > 0 ? "blue" : "green"}}     className="badge badge-primary badge-pill rounded-circle">{round_num}</span>
                                    </li>
                                    </Link>
                                    </div>

                                    <div className="col">
                                        {
                                            round_num > 0 ?  <button onClick={(e)=>{
                                        clickDispatch(item.indirect_order_id);
                                        }} className="btn btn-success">Dispatch</button> : <></>

                                        }
                                    </div>
                                </div> :
                                <div className="row">
                                    {/* <Calendar value={date} onChange={onChange}/> */}
                                    <div className="col">
                                        <Link to={`/orders/order/details/${item.indirect_order_id}`}>
                                        <li className="list-group-item d-flex justify-content-between align-items-center" style={{background:"red"}}>
                                        {item.complete_date}
                                    </li>
                                    </Link>
                                    </div>

                                    <div className="col">

                                    </div>
                                </div>
                                    }
                                    </>
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
