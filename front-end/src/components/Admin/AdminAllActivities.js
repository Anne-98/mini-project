import axios from "axios";
import React, { useEffect, useState, PureComponent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar } from 'recharts';

const AdminAllActivities = () =>{

    var navigate = useNavigate
    var [totalCakemakers, setTotalCakemakers] = useState('')
    var [totalCustomers, setTotalCustomers] = useState('')
    var [msg, setMsg] = useState('')
    var [cakemakerDetails, setCakemakerDetails] = useState([])
    var [direct, setDirect] = useState([])
    var [indirect, setIdirect] = useState([])
    var [monthlyOrders, setMonthlyOrders] = useState([])
    
    const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

    useEffect(async()=>{
        
        var dataSet = await axios.get('http://localhost:8000/general/profiles')
        var {data} = await axios.post('http://localhost:8000/admin/customer_details')
        var monthly_orders = await axios.post('http://localhost:8000/admin/monthly_orders')
        var overdueData = await axios.post('http://localhost:8000/admin/all_orders/direct_indirect')
        // console.log("data",overdueData.data.data)

        if (data.isLog) {
                setTotalCakemakers(dataSet.data.data.length)
                setTotalCustomers(data.data.length)
                setCakemakerDetails(dataSet.data.data)
                setMonthlyOrders(monthly_orders.data.data)
                setDirect(overdueData.data.data.direct_row)
                setIdirect(overdueData.data.data.indirect_row)
        }else{
            setMsg(data.msg)
        }
        },[])

    return(
        <div className="d-flex justify-content-center text-center row">
                <div className="card  mb-3" style={{maxWidth:"18rem", background:"#"}}>
                    <div className="card-body">
                        <h5 className="card-title">Cakemakers</h5>
                        <h1 className="card-text">{totalCakemakers}</h1>
                    </div>
                </div>
                <div className="card  mb-3" style={{maxWidth:"18rem", background:"#"}}>
                    <div className="card-body">
                        <h5 className="card-title">Customers</h5>
                        <h1 className="card-text">{totalCustomers}</h1>
                    </div>
                </div>
                <div className="card  mb-3" style={{maxWidth:"18rem", background:"#"}}>
                    <div className="card-body">
                        <h5 className="card-title">All Orders</h5>
                        <h4>{direct.length + indirect.length}</h4>
                        <hr/>
                        <div className="row">
                            <div className="col" style={{borderRight:"2px solid #ced4da"}}>
                                <h6>Direct</h6>
                                <h1 className="card-text">{direct.length}</h1>
                            </div>
                            <div className="col">
                                <h6>Indirect</h6>
                                <h1 className="card-text">{indirect.length}</h1>
                            </div>
                        </div>
                    </div>
                </div>

                {/* charts */}

                
                <div className="row">
                    <div className="col">
                        <h3>Overdue Orders</h3>
                    <BarChart
                    width={500}
                    height={300}
                    data={cakemakerDetails}
                    margin={{
                        top: 5,
                        right: 30,
                        left: 20,
                        bottom: 5,
                    }}
                    >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="overdue_orders" fill="#8884d8" />
                    <Bar dataKey="uv" fill="#82ca9d" />
                    </BarChart>

                </div>
                <div className="col">
                    <h3>Monthly Orders</h3>
                    <LineChart
                        width={500}
                        height={300}
                        data={monthlyOrders}
                        margin={{
                            top: 5,
                            right: 30,
                            left: 20,
                            bottom: 5,
                        }}
                        >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Line type="monotone" dataKey="count" stroke="#8884d8" activeDot={{ r: 8 }} />
                    </LineChart>
                </div>

                </div>
        </div>
    )
}
// /admin/workplace/cakemaker
export default AdminAllActivities