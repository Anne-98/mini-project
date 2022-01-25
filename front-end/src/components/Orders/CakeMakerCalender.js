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

      var date_1 = new Date()
      var array = [date_1]


const onChange = useCallback(
    (value) => {
      setValue(value);
    //   console.log("calender: ",value)
    },
    [setValue],
  );

    useEffect(async()=>{

        console.log(userId)
        var {data} = await axios.post('http://localhost:8000/cakemaker/confirmed/all_orders', {cake_makers_id: userId})
        
        if (data.isLog) {
            if (data.success) {
                setMsg(data.msg)
                setDirect_row(data.data.direct_row)
                setIndirect_row(data.data.indirect_row)
                // console.log(direct_row)
            }
        }else{
            setMsg(data.msg)
        }


    },[])


    return(
        <div>
            <br/>
            <br/>
            <br/>
            <h1 className="m-5 text-center">Calender</h1>
            <p className="danger">{msg}</p>

           <div className="text-center"> 
            </div>
            <div className="container">
                <div className="row">
                    <div className="col-6 text-center">
                        <h2 className="mb-4">Indirect Orders</h2>
                        <ul className="list-group m-auto" style={{width:"10rem"}}>
                
            {/* <Calendar 
            
            value={array.map((item) =>{return item})}
            
            /> */}

                        {
                            indirect_row.map((item) => {
                                
                                let date = new Date()
                                
                                let duration_hours = Date.parse(item.complete_date) - date.getTime() 
                                let duration_days = duration_hours / (1000*60*60*24)
                                let duration = Math.round(duration_days, 1)
                                
                                // console.log(item.complete_date)
                                return(
                                    <>
                                    {/* <Calendar value={date} onChange={onChange}/> */}
                                    <Link to={`/orders/order/details/${item.indirect_order_id}`}>
                                        <li className="list-group-item d-flex justify-content-between align-items-center">
                                        {item.complete_date.substring(0,10)}
                                        <span style={{color:"black", background: duration < 0 ? "red" : 3 > duration > 0 ? "blue" : "green"}}     className="badge badge-primary badge-pill rounded-circle">{duration}</span>
                                    </li>
                                    </Link>
                                </>)
                            })
                        }
                    </ul>
                    </div>
                    <div className="col-6 text-center">
                        <h2 className="mb-4">Direct Orders</h2>
                    <ul className="list-group m-auto" style={{width:"10rem"}}>
                    {
                        
                        direct_row.map((item) => {
                            
                        let date = new Date()

                        let duration_hours = Date.parse(item.complete_date) - date.getTime() 
                        let duration_days = duration_hours / (1000*60*60*24)
                        let duration = Math.round(duration_days, 1)
                        return(
                        <>
                            <Link to={`/orders/order/details/${item.direct_order_id}`}>
                            <li className="list-group-item d-flex justify-content-between align-items-center">
                                {item.complete_date.substring(0,10)}
                                <span style={{color:"black", background: duration < 0 ? "red" : 3 > duration > 0 ? "blue" : "green"}}     className="badge badge-primary badge-pill rounded-circle">{duration}</span>
                            </li></Link>
                        </>)
                    })
                }
                

            </ul>
                </div>
                </div>
            <div className="row">

            </div>
            </div>
        </div>
    )
}

export default CakeMakerCalender;
