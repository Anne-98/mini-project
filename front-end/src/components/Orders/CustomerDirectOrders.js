import axios from "axios";
import React, { Fragment, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {checkImageType, checkContactNum, checkName,checkPassword, checkOrderCompleteDate} from './../Common/Validation.js'

const CustomerDirectOrders = () => {

    var params = useParams()
    var design_id = params.design_id 
    var navigate = useNavigate() 

    var [msg , setMsg] = useState('')
    var [row , setRow] = useState([])
    var [completeDate, setCompleteDate] = useState('')
    var [completeDateValidate, setCompleteDateValidate] = useState('')
    var [cake_makers_id, setCake_makers_id] = useState('')
    var [comment, setComment] = useState('')

    var cus_id = localStorage.getItem('userId')

    useEffect(async()=>{

        var {data} = await axios.post('http://localhost:8000/general/get_one_Design/design_details', {design_id})
        if (data.success) {
            setRow(data.data)
            setCake_makers_id(data.data[0].cake_makers_id)
        }else{
            setMsg(msg)
        }
    },[])
    
    const makeDirectOrder = async() => {

        var body = new FormData()

        body.append('cake_makers_id', cake_makers_id)
        body.append('complete_date', completeDate)
        body.append('cus_id', cus_id)
        body.append('design_id', design_id)
        body.append('comment', comment)

        var isValidDate = checkOrderCompleteDate(completeDate)

        console.log(isValidDate)
        if (isValidDate.result) {
            var {data} = await axios.post(`http://localhost:8000/customer/direct_orders/order`, body )

            if (data.isLog) {
                if (data.success) {
                    navigate(`/customer/orders/history/${cus_id}`)
                }else{
                    setMsg(data.msg)
                }
            }else{
                setMsg(data.msg)
            }
            console.log(data.data)
        }else{
            setCompleteDateValidate(isValidDate.msg)
        }

    }

    return(
        <Fragment>
                <br/>
                <br/>   
            <h1 className="text-center mt-5 pt-5">Direct Orders</h1>
            <p>{msg}</p>
           <Link to={`/profiles/cakemaker/${cake_makers_id}`}>
               <div className="text-center pt-2" > <button className="btn btn-primary btn-lg btn-block">Cake maker Profile</button></div>
           </Link>
            <div className='mt-2 mx-auto' style={{width:"70%"}}>
                <div className="card m-auto" style={{width:"35rem"}}>
                    {
                        row.map((item) => {
                            return (
                                <div>
                                    <img className="card-img-top" src={item.image} alt="Card image cap" />
                                    <div className="card-body">
                                        <h5 className="card-title">Design Details</h5>
                                        <div className="card-text m-3"><b>Category: </b>{item.category}</div>
                                        <div className="card-text m-3"><b>Price: </b>${item.price}</div>
                                        <div className="card-text m-3"><b>Details: </b>{item.description}</div>
                                    </div>
                                </div>
                            )
                        })
                    }      
                </div>       
            <form className="mt-5" onSubmit={makeDirectOrder}>
                    <p className="text-danger">{msg}</p>
                <div className="row mb-5">
                    <label className="col-sm-4 mb-1" for="exampleFormControlTextarea1">Comments: </label>
                    <textarea className="form-control" id="exampleFormControlTextarea1" rows="3" onChange={e => setComment(e.target.value)}></textarea>
                </div>
                <div className="row mb-2">
                    <label className="col-sm-4" for="formGroupExampleInput">The date of order dispatch: </label>
                    <div className="col-sm-8">
                        <small id="passwordHelpInline" className="text-danger">
                    {completeDateValidate}
                    </small>
                        <input type="date" className="form-control" id="formGroupExampleInput" placeholder="Cake Mount" onChange={e => setCompleteDate(e.target.value)} required={true}/>
                        <small id="passwordHelpBlock" className="form-text text-muted">
                        Please order at least two days in advance..
                    </small>
                    </div>
                </div>
                <button type="submit" className="btn btn-primary mt-3">Submit</button>
                </form>
            </div>
        </Fragment>
    )
}

export default CustomerDirectOrders