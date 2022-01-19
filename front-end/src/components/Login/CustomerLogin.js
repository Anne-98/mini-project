import {React, useRef, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import axios from 'axios';

const CustomerLogin = () => {

    var emailRef = useRef('')
    var passwordRef = useRef('')
    var [msg, setMsg] = useState("")
    var [success, setSuccess] = useState('')
    var navigate = useNavigate()
    // var [email, setEmail] = useState('')
    // var [password, setPassword] = useState('')

    const loginCustomer = async(event) => {
        event.preventDefault()

        var body = new FormData()

        // setEmail(emailRef.current.value)
        // setPassword(passwordRef.current.value)

        body.append('customer_email', emailRef.current.value)
        body.append('customer_password', passwordRef.current.value)

        var {data} = await axios.post('http://localhost:8000/customer/login', body)

        if (emailRef.current.value.length == 0 || passwordRef.current.value.length == 0) {
            setMsg("Input is empty")
        }else{
            if (data.success == true) {
                setMsg(data.msg)
                navigate('/')
                setSuccess(data.success)
            }else{
                setMsg(data.msg)
                setSuccess(data.success)
            }
        }
        


    }

    return(
        <div>
            <br/>
            <br/>
            <br/>
            <div className='m-auto' style={{width:"75vw"}}>
            <div className='mt-5 mr-4' style={{width:"45%", float:"left"}}>
                <h1 className='mt-5'>Customer Log In</h1>
            <form className="mt-5" onSubmit={loginCustomer}>
                <p style={success ? {color:"green"} : {color:"red"}}>{msg}</p>
                <div class="form-group">
                    <label for="exampleInputEmail1">Email address</label>
                    <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" name='customer_email' ref={emailRef} required/>
                </div>
                <div class="form-group">
                    <label for="exampleInputPassword1">Password</label>
                    <input type="password" class="form-control" id="exampleInputPassword1" placeholder="Password" name='customer_password' ref={passwordRef} required/>
                </div><br/>
                <button type="submit"  class="btn btn-primary">Submit</button>
                </form>
            </div>
            </div>
        </div>
    )
}

export default CustomerLogin