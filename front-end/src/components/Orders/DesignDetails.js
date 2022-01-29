import React, { Fragment, useEffect, useState } from "react";
import axios from 'axios';
import {useParams} from 'react-router-dom';

const DesignDetails = () => {

    var params = useParams()
    var design_id = params.design_id
    var [design, setDesign] = useState([])
    var [msg, setMsg] = useState('')

    useEffect(async()=>{

        var {data} = await axios.post('http://localhost:8000/general/get_one_design/design_details', {design_id})

        if (data.success) {
            setMsg(data.msg)
            setDesign(data.data)
        }else{
            setMsg(data.msg)
        }

    }, [])

    return(

        <Fragment>
            <br/>
            <br/>
            <br/>
            <h1 className="mt-5 text-center">Design Details</h1>
            <p>{msg}</p>
            <div className="card m-auto" style={{width:"35rem"}}>
                {
                    design.map((item) => {
                        return(
                            <>
                                <img className="card-img-top" src={item.image} alt="Card image cap" />
                                <div className="card-body">
                                    <h5 className="card-title">Design Details</h5>
                                    <div className="card-text m-3"><b>Category: </b>{item.category}</div>
                                    <div className="card-text m-3"><b>Price: </b>${item.price}</div>
                                    <div className="card-text m-3"><b>Details: </b>{item.description}</div>
                                </div>
                                <ul className="list-group list-group-flush">
                                    <li className="list-group-item">
                                        <div><b>Title:</b> {item.title}</div>
                                        <div></div>
                                    </li>
                                    <li className="list-group-item">
                                        <div><b>Rates:</b> {item.rates}</div>
                                        <div></div>
                                    </li>
                                </ul>
                                    <div className="card-header">{item.rates}</div>
                            </>
                        )
                    })
                }
            </div>
            </Fragment>
    )
}

export default DesignDetails