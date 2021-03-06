import axios from "axios";
import React, { Fragment, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import './../../css/Home/SignIn.css'
import {checkPassword, checkName} from './../Common/Validation.js'


const AdminSignin = () => {

    var [password,setPassword] = useState('')
    var [name,setName] = useState('')
    // var [contact_num,setContact_num] = useState('')
    var [email, setEmail] = useState('')
    // var [address, setAddress] = useState('')
    // var [question, setQuestion] = useState('')
    var [msg, setMsg] = useState('')
    var [passwordValidate, setPasswordValidate] = useState('')
    var [nameValidate, setNameValidate] = useState('')
    // var [contactNumValidate, setContactNumValidate] = useState('')

    var navigate = useNavigate()

    // var [body, setBody] = useState({password, name, city, brandName, tel, facebook, instagram, twitter, qualifications, file, email})

    const signInAdmin = async(event) => {
        event.preventDefault()

        var body = new FormData()
        body.append('name', name)
        body.append('email', email)
        body.append('password', password)
        // body.append('contact_num', contact_num)
        // body.append('address', address)
        // body.append('question', question)

        console.log("body: ",body)
        
        // function checkPassword(str){
        //         let testPassword = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
        //         if (testPassword.test(str)) {
        //             setPasswordValidate('')
        //         }else{
        //             setPasswordValidate('* Invalid Password')
        //         }
                
        //         return testPassword.test(str);
        //     }
        // function checkName(str){
        //         let testName = /^([a-zA-Z ]){2,30}$/;

        //         if (testName.test(str)) {
        //             setNameValidate('')
        //         }else{
        //             setNameValidate('* Invalid Name')
        //         }
        //         return testName.test(str);
        //     }

            var isValidPassword = checkPassword(password)
        var isValidName = checkName(name)
        // var isValidContact = checkContactNum(contact_num)
            setPasswordValidate(isValidPassword.msg)
            setNameValidate(isValidName.msg)
        if (isValidPassword.result && isValidName.result) {

            var {data} = await axios.post('http://localhost:8000/admin/signin', body)
            console.log("customer_id",data.msg)
            if (data.success) {
                // navigate(`/profiles/customer/${data.data[0].cus_id}`)
                setMsg(data.msg)
            }else{
                setMsg(data.msg)
            }
        }
    }

    return(
        <div className='signin-wrapper'>
            <h1 className="text-center common-header" style={{zIndex:"3"}}>Admin Sign In</h1>
            <div className='signin-common-container d-flex justify-content-center container'>
                    <Link to={'/login/admin/admin_key'}><button className='btn signin-signin-btn'><i class="fas fa-arrow-left"></i></button></Link>
                <div className="mt-5" style={{width:"65%"}}>
                     <form className="mt-5" onSubmit={signInAdmin}>
                          {
                        msg.length > 0 ? <p className='common-error-msg'>{msg}</p> : <></>
                    }
                <div className="form-group  row mb-5">
                    <label for="exampleInputEmail1" className="col-sm-4">Email address</label>
                    <div className="col-sm-8">
                        <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" name='cakemaker_email' value={email} onChange={e => setEmail(e.target.value)} required={true}
                    /></div>
                </div>
                <div className="form-group  row mb-5">
                    <label className="col-sm-4" for="exampleInputPassword1">Password</label>
                    <div className="col-sm-8">
                        <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Password" name='cakemaker_password' 
                    onChange={e => setPassword(e.target.value)} required={true}/>
                    <small id="passwordHelpInline" className="common-error-msg">
                    {passwordValidate}
                    </small><br/>
                    <small id="passwordHelpBlock" className="form-text signin-help-text">
                        Your password must be 8-20 characters long, contain letters and numbers, and symbols.
                    </small>
                    </div>
                </div>
                <div className="form-group  row mb-5">
                    <label className="col-sm-4" for="inputName">Name</label>
                    <div className="col-sm-8">
                        <input type="text" className="form-control" placeholder="First name" onChange={e => setName(e.target.value)} required={true}/>
                        <small id="passwordHelpInline" className="common-error-msg">
                    {nameValidate}
                    </small>
                    </div>
                </div>
                {/* <div className="form-group  row mb-5">
                    <label className="col-sm-4" for="inputAddress">Address</label>
                    <div className="col-sm-8">
                        <input type="text" className="form-control" id="inputAddress" onChange={e => setAddress(e.target.value)} required={true} placeholder="111 Main street, Colombo" />
                    </div>
                </div>
                <div className="form-group  row mb-5">
                    <label className="col-sm-4" for="formGroupExampleInput">Contact Number</label>
                    <div className="col-sm-8">
                        <input type="number" className="form-control" id="formGroupExampleInput" placeholder="0711118898 / 0112255447" onChange={e => setContact_num(e.target.value)} required={true}/>
                        <small id="passwordHelpInline" className="common-error-msg">
                    {contactNumValidate}
                    </small>
                    </div>
                </div>
                <div className="form-group  row mb-5">
                    <label className="col-sm-4 mb-1" for="exampleFormControlTextarea1">What is your favorite cake name</label>
                    <div className="col-sm-8">
                        <input type="text" className="form-control" id="formGroupExampleInput" placeholder="Butter cake" onChange={e => setQuestion(e.target.value)} required={true}/>
                    </div>
                </div> */}
                <button type="submit" className="btn signin-submit-button">Submit</button>
                </form>
                </div>
            </div>
        </div>
        
    )
}

export default AdminSignin