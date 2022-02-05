import axios from "axios";
import React, { Fragment, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

const CustomerSignIn = () => {

    var [password,setPassword] = useState('')
    var [name,setName] = useState('')
    var [contact_num,setContact_num] = useState('')
    var [email, setEmail] = useState('')
    var [address, setAddress] = useState('')
    var [question, setQuestion] = useState('')
    var [msg, setMsg] = useState('')
    var [passwordValidate, setPasswordValidate] = useState('')
    var [nameValidate, setNameValidate] = useState('')
    var [contactNumValidate, setContactNumValidate] = useState('')

    var navigate = useNavigate()

    // var [body, setBody] = useState({password, name, city, brandName, tel, facebook, instagram, twitter, qualifications, file, email})

    const signInCustomer = async(event) => {
        event.preventDefault()

        var body = new FormData()
        body.append('password', password)
        body.append('name', name)
        body.append('contact_num', contact_num)
        body.append('email', email)
        body.append('address', address)
        body.append('question', question)

        
        function checkPassword(str){
                let testPassword = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
                if (testPassword.test(str)) {
                    setPasswordValidate('')
                }else{
                    setPasswordValidate('* Invalid Password')
                }
                
                return testPassword.test(str);
            }
        function checkName(str){
                let testName = /^([a-zA-Z ]){2,30}$/;

                if (testName.test(str)) {
                    setNameValidate('')
                }else{
                    setNameValidate('* Invalid Name')
                }
                return testName.test(str);
            }
        function checkContactNum(str){

            var res = (str.length == 10 && str.charAt(0) == 0)
            console.log(res)
                if (res) {
                    setContactNumValidate('')
                }else{
                    setContactNumValidate('* Invalid telephone number')
                }
                return res;
            }
        var isValidPassword = checkPassword(password)
        var isValidName = checkName(name)
        var isValidContact = checkContactNum(contact_num)

        if (isValidPassword && isValidName && isValidContact) {
            var {data} = await axios.post('http://localhost:8000/customer/signin', body)
            console.log("customer_id",data)
            if (data.success) {
                navigate(`/profiles/customer/${data.data[0].cus_id}`)
                // setMsg(data.msg)
            }else{
                setMsg(data.msg)
            }
        }
    }

    return(
        <Fragment>
            <h1 className="text-center common-header">Customer Sign In</h1>
            <div className='mt-5 mx-auto' style={{width:"70%"}}>
                <br/>
                <br/>
                <h1 className='mt-5'>Customer SignIn</h1>
            <form className="mt-5" onSubmit={signInCustomer}>
                    <p className="text-danger text-end">{msg}</p>
                <div className="row mb-2">
                    <label for="exampleInputEmail1" className="col-sm-4">Email address</label>
                    <div className="col-sm-8">
                        <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" name='cakemaker_email' value={email} onChange={e => setEmail(e.target.value)} required={true}
                    /></div>
                </div>
                <div className="row mb-2">
                    <label className="col-sm-4" for="exampleInputPassword1">Password</label>
                    <div className="col-sm-8">
                    <small id="passwordHelpInline" class="text-danger">
                    {passwordValidate}
                    </small>
                        <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Password" name='cakemaker_password' 
                    onChange={e => setPassword(e.target.value)} required={true}/>
                    <small id="passwordHelpBlock" class="form-text text-muted">
                        Your password must be 8-20 characters long, contain letters and numbers, and must not contain spaces, special characters, or emoji.
                    </small>
                    </div>
                </div>
                <div class="row mb-2">
                    <label className="col-sm-4" for="inputName">Name</label>
                    <div className="col-sm-8">
                        <small id="passwordHelpInline" class="text-danger">
                    {nameValidate}
                    </small>
                        <input type="text" class="form-control" placeholder="First name" onChange={e => setName(e.target.value)} required={true}/>
                    </div>
                </div>
                <div class="row mb-2">
                    <label className="col-sm-4" for="inputAddress">Address</label>
                    <div className="col-sm-8">
                        <input type="text" class="form-control" id="inputAddress" onChange={e => setAddress(e.target.value)} required={true} placeholder="111 Main street, Colombo" />
                    </div>
                </div>
                <div class="row mb-2">
                    <label className="col-sm-4" for="formGroupExampleInput">Contact Number</label>
                    <div className="col-sm-8">
                        <small id="passwordHelpInline" class="text-danger">
                    {contactNumValidate}
                    </small>
                        <input type="number" class="form-control" id="formGroupExampleInput" placeholder="0711118898 / 0112255447" onChange={e => setContact_num(e.target.value)} required={true}/>
                    </div>
                </div>
                <div class="row mb-5">
                    <label className="col-sm-4 mb-1" for="exampleFormControlTextarea1">What is your favorite cake name</label>
                    <div className="col-sm-8">
                        <input type="text" class="form-control" id="formGroupExampleInput" placeholder="Butter cake" onChange={e => setQuestion(e.target.value)} required={true}/>
                    </div>
                </div>
                <button type="submit" className="btn btn-primary mt-3">Submit</button>
                </form>
            </div>
        </Fragment>
        
    )
}

export default CustomerSignIn