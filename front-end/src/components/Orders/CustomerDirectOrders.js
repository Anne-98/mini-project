import axios from "axios";
import React, { Fragment, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {checkImageType, checkContactNum, checkName,checkPassword, checkOrderCompleteDate} from './../Common/Validation.js';
import './../../css/Orders/CustomerDirectOrders.css';

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
    
    const makeDirectOrder = async(e) => {

        e.preventDefault()
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
        <div>
            <h1 className="text-center common-header" style={{zIndex:"3"}}>Direct Orders</h1>
                <div className=" direct-order-form-div mt-5">
                    <form className="mt-5 direct-order-form " onSubmit={makeDirectOrder}>
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
                        <small style={{color:"whitesmoke", fontFamily: 'Dosis, sans-serif'}} id="passwordHelpBlock" className="form-text">
                        Please order at least two days in advance..
                    </small>
                    </div>
                </div>
                <button type="submit" style={{width:"100px"}} className="btn cm-designs-discover mt-3">Submit</button>
                </form>
                </div>
            <div className='mt-2 mx-auto'>

                <div className="design-details-wrapper" >
                {
                    row.map((item) => {
                        return(
                            <div className="row justify-content-center mt-5">
                                <img className="col-md-5 col-lg-4 col-sm-12 col-xs-12 design-details-img" src={item.image} alt="Card image"/>
                                <div className="col-md-5 col-lg-5 col-sm-12 col-xs-12 design-details-content justify-content-center row">
                                    <div className="design-details-content-inner col-9">
                                        <h1 className="m-3 design-details-title">{item.title}</h1>

                                        <div className="row m-3 mt-5">
                                            <div className="col-4 col-lg-2 "><b>Category</b></div>
                                            <div className="col-7 col-lg-8">{item.category}</div>
                                        </div>
                                        <div className="row m-3">
                                            <div className="col-4 col-lg-2 "><b>Price</b></div>
                                            <div className="col-7 col-lg-8">${item.price}</div>
                                        </div>
                                        <div className="row m-3">
                                            <div className="col-4 col-lg-2 "><b>Details</b></div>
                                            <div className="col-7 col-lg-8">{item.description}</div>
                                        </div>
                                        <div className="m-3 mt-5" style={{color:"#f9c74f"}}>
                                                <i className="fas fa-star"></i>
                                                <i className="fas fa-star"></i>
                                                <i className="fas fa-star"></i>
                                                <i className="fas fa-star-half-alt fa-star"></i>
                                                <i className="far fa-star"></i>    
                                        </div>

                                        <Link to={`/profiles/cakemaker/${cake_makers_id}`}>
               <div className="m-3" > <button className="btn" style={{background:"#b89472", color:"white"}}>Baker Profile</button></div>
           </Link>
                                    </div>
                                </div>
                            </div>
                        )
                    })
                }
            </div>     
            </div>
        </div>
    )
}

export default CustomerDirectOrders