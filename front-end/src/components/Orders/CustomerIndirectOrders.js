import axios from "axios";
import React, { Fragment, useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { checkImageType, checkOrderCompleteDate } from "../Common/Validation";

axios.defaults.withCredentials = true

const IndirectOrders = () => {

    var paraData = useParams()

    var customer_id = paraData.customer_id
    var [file, setFile] = useState()
    var [completeDate, setCompleteDate] = useState('')
    var [comment, setComment] = useState('')
    var [msg, setMsg] = useState('')
    var [imageValidate, setImageValidate] = useState('')
    var [completeDateValidate, setCompleteDateValidate] = useState('')
    var [allCakeMakersDetails, setAllCakeMakersDetails] = useState([])
    var [cake_makers_id, setCake_makers_id] = useState('')

    var navigate = useNavigate()

    useEffect(async()=>{
        let {data} = await axios.get('http://localhost:8000/general/profiles')
        setAllCakeMakersDetails(data.data)
        
    },[])

    const makeIndirectOrder = async(event) =>{
        event.preventDefault()

        // console.log("cake_makers_id",cake_makers_id)
        var body = new FormData()
        body.append('file', file)
        body.append('complete_date', completeDate)
        body.append('comment', comment)
        body.append('cus_id', customer_id)
        body.append('cake_makers_id', cake_makers_id)

        var isValidImage = checkImageType(file.name)
        var isValidDate = checkOrderCompleteDate(completeDate)

        setImageValidate(isValidImage.msg)
        setCompleteDateValidate(isValidDate.msg)

        if (isValidImage.result && isValidDate.result) {
            let {data} = await axios.post(`http://localhost:8000/customer/indirect_orders/order`, body)

            if (data.isLog) {
                if (data.success) {
                    navigate(`/customer/orders/history/${customer_id}`)
                }else{
                    setMsg(data.msg)
                }
            }else{
                setMsg(data.msg)
            }
        }
    }

    var array = allCakeMakersDetails.filter((item) => {
                                if (item.cake_makers_id == cake_makers_id) {
                                    return(item)
                                }
                            }) 
    console.log(array)

    return(
        <Fragment>
            <div className='mt-5 mx-auto' style={{width:"70%"}}>
                <br/>
                <br/>
                <h1 className='mt-5'>Order your own Design</h1>
            <form className="mt-5" onSubmit={makeIndirectOrder}>
                <div className="form-group">
                    <p className="text-danger">{msg}</p>
                    <label className="col-sm-4 mb-1" for="exampleFormControlTextarea1">Upload your image here</label>
                    <input type="file" className="form-control-file" id="exampleFormControlFile1" required={true} onChange={e => setFile(e.target.files[0])}/>
                    <small id="passwordHelpInline" className="text-danger">
                    {imageValidate}
                    </small>
                </div>

                <div className="row mb-2 mt-4">
                    <label className="col-sm-4" for="formGroupExampleInput">Select a Cake Maker: </label>
                    <div className="col-sm-8">
                        <div class="card">
                            {
                                array.map((item) => {
                                    return(
                                        <div>
                                            <h5 class="card-header">{item.name}</h5>
                                            <div class="card-body">
                                                <h5 class="card-title">{item.brand_name}</h5>
                                                <img className="m-4" src={item.profile_picture} style={{width:"5rem", borderRadius:"50px", float:"right"}}/>
                                                <p class="card-text">{item.qualifications}</p>
                                                <Link to={`/profiles/cakemaker/${item.cake_makers_id}`}><button className="btn btn-primary">Profile</button></Link>
                                            </div>
                                        </div>
                                    )
                                })
                            }
                                </div>
                        <select id="inputState" onChange={e=>setCake_makers_id(e.target.value)} className="form-control" >
                            <option selected>Choose...</option>
                            {
                                allCakeMakersDetails.map((item) => {
                                    return(
                                        <option value = {item.cake_makers_id} required={true} >{item.district} 
                                        </option>
                                    )
                                })
                            }
                        </select>
                    </div>
                </div>
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

export default IndirectOrders