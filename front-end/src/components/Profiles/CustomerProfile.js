import React, { Fragment, useEffect, useState } from 'react'
import axios from 'axios';
import { Link, useNavigate, useParams } from 'react-router-dom';
import profile from './../../images/profiles/6.jpg';

axios.defaults.withCredentials = true

const CustomerProfile = () => {

    var params = useParams()
    var customer_id = params.customer_id
    var [row, setRow] = useState({})
    var [direct, setDirect] = useState({})
    var [indirect, setIndirect] = useState({})
    var [msg, setMsg] = useState({})
    var navigate = useNavigate()
    let userId = localStorage.getItem('userId')
    useEffect(async()=>{

        var {data} = await axios.post('http://localhost:8000/customer/profile/myprofile', {customer_id})

        
        let dataSet = await axios.post('http://localhost:8000/customer/orders/history', {customer_id})
        
        console.log("data:", data.data[0].address)
        console.log("dataSet:", dataSet)

        if (dataSet.data.isLog) {
            if (dataSet.data.success) {
                setRow(data.data[0])
                setDirect(dataSet.data.data.direct_row)
                setIndirect(dataSet.data.data.indirect_row)
                setMsg(dataSet.data.msg)
            }else{
                setMsg(dataSet.data.msg)
            }
        }else{
            setMsg(data.msg)
        }
    },[])

    const editProfile = () => {
        navigate(`/profiles/customer/edit/${customer_id}`)
    }

    return(
        <Fragment>
            <h1 className="text-center common-header">Customer Profile</h1>
            <div className="container cm-profile-wrapper">
                <div className='mt-5' >
                    <div className="row justify-content-center">
                    <div className='cm-profile-img-div col-4 mx-auto'>
                        <img src={profile} className="cm-profile-img" alt="..."/>
                    </div>
                    
                    <div className='col-8 cm-profile-details-body '>
                        <h1 className="">{row.name} {
                       customer_id ==  userId ? <button onClick={editProfile} className="btn cm-profile-edit-btn" ><i className="fas fa-pen "></i></button>: <></>
                    }   </h1>
                        
                        <div className='cm-details-body row'>
                            <span className='details-heading col-4 '>Address</span> 
                            <span className="col-8 ">{row.address}</span>
                        </div>
                        <div className='cm-details-body row'>
                            <span className='details-heading col-4 '>Contact Number </span>
                            <span className="col-8 ">0{row.contact_num}</span>
                        </div>
                        <div className='cm-details-body row'>
                            <span className='details-heading col-4 '>Direct Orders </span>
                            <span className="col-8 " style={{color:"#b89472", fontWeight:"bold"}}>{direct.length}</span>
                        </div>
                        <div className='cm-details-body row'>
                            <span className='details-heading col-4 '>Indirect Orders </span>
                            <span className="col-8 " style={{color:"#b89472", fontWeight:"bold"}}>{indirect.length}</span>
                        </div>
                    </div>
                </div>
                
                </div>
            </div>
        </Fragment>
    )
}

export default CustomerProfile