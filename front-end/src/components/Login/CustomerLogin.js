import {Fragment, React, useContext, useRef, useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import axios from 'axios';
import { UserIdContext } from '../Context/UserIdContext';
import { UserTypeContext } from '../Context/UserTypeContext';
import { IsLogContext } from '../Context/IsLogContext';
import './../../css/Home/Login.css';

const CustomerLogin = () => {

    var emailRef = useRef('')
    var passwordRef = useRef('')
    var [msg, setMsg] = useState("")
    var [success, setSuccess] = useState('')
    var navigate = useNavigate()
    let [type, setType] = useContext(UserTypeContext)
    let [userId, setUserId] = useContext(UserIdContext)
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
                localStorage.setItem('type','customer')
                localStorage.setItem('userId',data.data[0].cus_id)
                // setMsg(data.msg)
                setType('customer')
                setUserId(data.data[0].cus_id)
                navigate('/')
            }else{
                setMsg(data.msg)
                setSuccess(data.success)
            }
        }
        


    }

    return(
        <div className='login-wrapper'>
            <h1 className="text-center common-header" style={{zIndex:"3"}}>Customer Log In</h1>
            <div className='login-common-container d-flex justify-content-center container'>
                <Link to={'/login'}><button className='btn login-login-btn'><i class="fas fa-arrow-left"></i></button></Link>
            <div className='mt-5' style={{width:"65%"}}>
            <form className="mt-5" onSubmit={loginCustomer}>
                {
                        msg.length > 0 ? <p className='common-error-msg'>{msg}</p> : <></>
                    }
                <div className="form-group  row mb-5">
                    <label for="exampleInputEmail1" className='col-2 m-auto'><i className="fas fa-envelope-square login-icons"></i></label>
                    <input type="email" className="form-control col"  aria-describedby="emailHelp" placeholder="Enter email" name='customer_email' ref={emailRef} required/>
                </div>
                <div className="form-group row">
                    <label for="exampleInputPassword1" className='col-2 m-auto'><i className="fas fa-key login-icons"></i></label>
                    <input type="password" className="form-control col" id="exampleInputPassword1" placeholder="Password" name='customer_password' ref={passwordRef} required/>
                </div><br/>
                
                <button type="submit"  className="btn login-submit-button">Submit</button>
                </form>
            </div>
            </div>
        </div>
    )
}

export default CustomerLogin