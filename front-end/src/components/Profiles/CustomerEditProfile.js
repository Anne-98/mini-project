import axios from "axios";
import React, { useEffect, Fragment, useState } from "react";
import { useParams } from "react-router-dom";
import {checkContactNum, checkImageType, checkName} from "../Common/Validation";
import { useNavigate } from "react-router-dom";

axios.defaults.withCredentials = true

const CustomerEditProfile = () => {

    var params = useParams()
    var customer_id = params.customer_id
    var [row, setRow] = useState('')
    var [msg, setMsg] = useState('')
    
    
    var [name, setName] = useState('')
    var [contact_num,setContact_num] = useState('')
    var [question,setQuestion] = useState('')
    var [address,setAddress] = useState('')
    
    var [nameValidate, setNameValidate] = useState('')
    var [contactNumValidate, setContactNumValidate] = useState('')
    var navigate = useNavigate()

    useEffect(async()=>{

        var {data} = await axios.post('http://localhost:8000/customer/profile/myprofile', {customer_id})

        setRow(data.data[0])
        setName(data.data[0].name)
        setContact_num(`0${data.data[0].contact_num}`)
        setQuestion(data.data[0].question)
        setAddress(data.data[0].address)
    }, [])

    const updateProfile = async(event) => {
        event.preventDefault()

        var body = new FormData()
        body.append('name', name)
        body.append('contact_num', contact_num)
        body.append('question', question)
        body.append('address', address)
        
        var isValidName = checkName(name)
        var isValidContact = checkContactNum(contact_num)

        setNameValidate(isValidName.msg)
        setContactNumValidate(isValidContact.msg)

        if (isValidName.result && isValidContact.result) {
            var {data} = await axios.post('http://localhost:8000/customer/profile/updateprofile', body)
            
            if (data.isLog) {
                if (data.success) {
                    navigate(`/profiles/customer/${customer_id}`)
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
                <h1 className='mt-5'>Edit Profile</h1>
            <form className="mt-5" onSubmit={updateProfile}>
                    <p>{msg}</p>
                
                <div className="row mb-2">
                    <label className="col-sm-4" for="inputName">Name</label>
                    <div className="col-sm-8">
                        <small id="passwordHelpInline" className="text-danger">
                    {nameValidate}
                    </small>
                        <input type="text" className="form-control" placeholder="First name" onChange={e => setName(e.target.value)} value={name} />
                    </div>
                </div>
                <div className="row mb-2">
                    <label className="col-sm-4" for="inputName">Address</label>
                    <div className="col-sm-8">
                        <input type="text" className="form-control" placeholder="Address" onChange={e => setAddress(e.target.value)} value={address} />
                    </div>
                </div>

                <div className="row mb-2">
                    <label className="col-sm-4" for="formGroupExampleInput">Contact Number</label>
                    <div className="col-sm-8">
                        <small id="passwordHelpInline" className="text-danger">
                    {contactNumValidate}
                    </small>
                        <input value={contact_num} type="number" className="form-control" id="formGroupExampleInput" placeholder="0711118898 / 0112255447" onChange={e => setContact_num(e.target.value)}/>
                    </div>
                </div><br/>
                <div className="row mb-5">
                    <label className="col-sm-8 mb-1" for="exampleFormControlTextarea1">What is your favourite Cake Flavour ? </label>
                    <input type="text" className="form-control" placeholder="Vanilla" value={question} onChange={e => setQuestion(e.target.value)}/>
                </div>
                <button type="submit" className="btn btn-primary mt-3">Submit</button>
                </form>
            </div>
        </Fragment>
    )

}

export default CustomerEditProfile