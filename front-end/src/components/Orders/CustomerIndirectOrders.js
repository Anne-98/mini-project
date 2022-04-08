import axios from "axios";
import React, { Fragment, useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { checkImageType, checkOrderCompleteDate } from "../Common/Validation";
import './../../css/Post/CreatePost.css';

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
    const [imagePath, setImagePath] = useState('')

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
            <div className="direct-order-wrapper">
                <h1 className="text-center common-header" style={{zIndex:"3"}}>Order Your Own Designs</h1>

            <div className="direct-order-container d-flex justify-content-center container">
                <div className='mt-5 mx-auto' style={{width:"70%"}}>
            <form className="mt-5" onSubmit={makeIndirectOrder}>
                <div className="form-group">
                    <p className="text-danger">{msg}</p>
                    {/* <input type="file" className="form-control-file" id="exampleFormControlFile1" required={true} onChange={e => setFile(e.target.files[0])} /> */}
                </div>
                <div className="row mb-2 mt-4" style={{justifyContent:"center", display:"flex", alignItems:"center"}}>
                    
                        <div className="row col">
                            <label className="col-sm-4 col-4" for="formGroupExampleInput">Select a Cake Maker: </label>
                        <select id="inputState"  onChange={e=>setCake_makers_id(e.target.value)} className="form-control col" >
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
                        <div className="col-lg-4 col-12">
                            {
                                array.map((item) => {
                                    return(
                                    <div className="col-lg-3 col" data-aos="fade-up"
                                    data-aos-easing="linear"
                                    data-aos-duration="500">
                                            <Link to={`/profiles/cakemaker/${item.cake_makers_id}`} className="text-decoration-none">
                                        <div className= 'indirect-order-cm row'>
                                            <div className="search_item_avatar col-5">
                                                <img className="img-fluid search_img" src={item.profile_picture} />
                                            </div>
                                            <div className="search_item_content col-6">
                                                <span className="search_item_message">{item.name}</span>
                                            </div>
                                        </div>
                                    </Link>
                                    </div>
                                    )
                                })
                            }
                    </div>
                </div>
                <div className="row mb-5">
                    <label className="col-sm-4 mb-1" for="exampleFormControlTextarea1">Comments: </label>
                    <textarea className="form-control" id="exampleFormControlTextarea1" rows="3" onChange={e => setComment(e.target.value)}></textarea>
                </div>
                    {
                        imagePath.length > 0 ? <img style={{width:"250px"}} src={imagePath} className="img-thumbnail img-fluid"/> : <></>
                    }
                    <div className="form-group  row mb-3">
                     <label  className="btn text-uppercase col-sm-4 mb-1" for="exampleFormControlTextarea1" htmlFor="filePicker">Upload <i class="fas fa-camera"></i></label>
                        <small id="passwordHelpInline" className="text-danger">
                        {imageValidate}
                        </small>
                        <input type="file" className="form-control-file" id="filePicker" style={{visibility:"hidden"}} required={true} 
                        onChange = { 
                            e => {
                                if (e.target.files && e.target.files[0]) {
                                    let reader = new FileReader();
                                    reader.onload = (e) => {
                                    setImagePath(e.target.result);
                                    };
                                    reader.readAsDataURL(e.target.files[0]);
                                    setFile(e.target.files[0])
                                }
                            }
                        }/>
                </div>
                <div className="row mb-2">
                    <label className="col-sm-4" for="formGroupExampleInput">The date of order dispatch: </label>
                    <div className="col-sm-8">
                        <small id="passwordHelpInline" className="text-danger">
                    {completeDateValidate}
                    </small>
                        <input type="date" className="form-control" id="formGroupExampleInput" placeholder="Cake Mount" onChange={e => setCompleteDate(e.target.value)} required={true}/>
                        <small id="passwordHelpBlock" style={{color:"#e0d9d3"}} className="form-text">
                        Please order at least four days in advance..
                    </small>
                    </div>
                </div>
                <button type="submit" className="btn mt-3 newDesign-submit-button">Submit</button>
                </form>
            </div>
            </div><br/>
            </div>
        </Fragment>
    )
}

export default IndirectOrders