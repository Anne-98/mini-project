import React, { Fragment, useEffect, useState } from 'react'
import axios from 'axios';
import { Link, useNavigate, useParams } from 'react-router-dom';

axios.defaults.withCredentials = true

const CustomerProfile = () => {

    var params = useParams()
    var customer_id = params.customer_id
    var [row, setRow] = useState({})
    var navigate = useNavigate()

    useEffect(async()=>{

        var {data} = await axios.post('http://localhost:8000/customer/profile/myprofile', {customer_id})

        console.log("data:", data.data[0].address)
        setRow(data.data[0])
    },[])

    const editProfile = () => {
        navigate(`/profiles/customer/edit/${customer_id}`)
    }

    return(
        <Fragment>
            <h1 className="text-center common-header">Customer Profile</h1>
            <div className="card text-center">
                <div className="card-header">
                </div>
                <div className="card-body ">
                    <h5 className="card-title">{row.name}</h5>
                    Address: <span className="card-text ">{row.address}</span><br/><br/>
                    What is your favorite cake flavour: <span className="card-text">{row.question}</span><br/><br/>
                    Contact Number: <span className="card-text">0{row.contact_num}</span><br/><br/>
                    
                    <button href="#" onClick={editProfile} className="btn btn-primary" style={{marginRight:"15px"}}>Edit</button>
                    <Link to={`/orders/indirect/${customer_id}`}><button href="#" className="btn btn-primary">Make Order</button></Link>
                </div>
                <div className="card-footer text-muted">
                    2 days ago
                </div>
            </div>
        </Fragment>
    )
}

export default CustomerProfile