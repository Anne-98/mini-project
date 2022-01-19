import axios from "axios";
import React, { Fragment, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { checkImageType, checkOrderCompleteDate } from "../Common/Validation";

axios.defaults.withCredentials = true

const IndirectOrders = () => {

    var paraData = useParams()

    var customer_id = paraData.customer_id
    var cake_makers_id = 'f4a2aa62-b4c4-4d68-8a0c-231a4a7bfb53'
    var [file, setFile] = useState()
    var [completeDate, setCompleteDate] = useState('')
    var [comment, setComment] = useState('')
    var [msg, setMsg] = useState('')
    var [imageValidate, setImageValidate] = useState('')
    var [completeDateValidate, setCompleteDateValidate] = useState('')

    var navigate = useNavigate()

    const makeIndirectOrder = async(event) =>{
        event.preventDefault()

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
            var {data} = await axios.post(`http://localhost:8000/customer/indirect_orders/order`, body)

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

    return(
        <Fragment>
            <div className='mt-5 mx-auto' style={{width:"70%"}}>
                <br/>
                <br/>
                <h1 className='mt-5'>Order your own Design</h1>
            <form className="mt-5" onSubmit={makeIndirectOrder}>
                <div class="form-group">
                    <p className="text-danger">{msg}</p>
                    <label className="col-sm-4 mb-1" for="exampleFormControlTextarea1">Upload your image here</label>
                    <input type="file" class="form-control-file" id="exampleFormControlFile1" required={true} onChange={e => setFile(e.target.files[0])}/>
                    <small id="passwordHelpInline" class="text-danger">
                    {imageValidate}
                    </small>
                </div>
                <div class="row mb-5">
                    <label className="col-sm-4 mb-1" for="exampleFormControlTextarea1">Comments: </label>
                    <textarea class="form-control" id="exampleFormControlTextarea1" rows="3" onChange={e => setComment(e.target.value)}></textarea>
                </div>
                <div class="row mb-2">
                    <label className="col-sm-4" for="formGroupExampleInput">The date of order dispatch: </label>
                    <div className="col-sm-8">
                        <small id="passwordHelpInline" class="text-danger">
                    {completeDateValidate}
                    </small>
                        <input type="date" class="form-control" id="formGroupExampleInput" placeholder="Cake Mount" onChange={e => setCompleteDate(e.target.value)} required={true}/>
                        <small id="passwordHelpBlock" class="form-text text-muted">
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