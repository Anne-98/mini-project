import axios from 'axios'
import {React, useState, useRef, useContext, Fragment} from 'react';
import { Link, useNavigate } from "react-router-dom";
import { IsLogContext } from '../Context/IsLogContext';
import { UserIdContext } from '../Context/UserIdContext';
import { UserTypeContext } from '../Context/UserTypeContext';
import './../../css/Home/Login.css';
import './../../css/Admin/Admin.css'


axios.defaults.withCredentials = true

const AdminLogin = () => {

    var [msg, setMsg] = useState('')
    var emailRef = useRef()
    var passwordRef = useRef()
    var navigate = useNavigate()
    var [success, setSuccess] = useState('')
    let [type, setType] = useContext(UserTypeContext)
    let [userId, setUserId] = useContext(UserIdContext)

    const LoginAdmin = async(event) => {

        event.preventDefault();

        var body = new FormData()
        body.append('email', emailRef.current.value)
        body.append('password', passwordRef.current.value)

        var {data} = await axios.post('http://localhost:8000/admin/login', body)

        if (emailRef.current.value.length == 0 || passwordRef.current.value.length == 0) {
            setMsg("Input is empty")
        }else{
            if (data.success == true) {
                // console.log("Login Id: ",data.data[0].cake_makers_id)
                localStorage.setItem('type', 'admin')
                localStorage.setItem('userId', data.data[0].admin_id)
                setType('admin')
                setUserId(data.data[0].admin_id)
                navigate(`/admin/workplace/dashboard/${data.data[0].admin_id}`)
                window.location.reload(true)
                // setSuccess(data.success)
            }else{
                setMsg(data.msg)
                setSuccess(data.success)
            }
        }
    }

    return(
        <div className='admin-wrapper'>
        <h1 className="text-center common-header" style={{zIndex:"3"}}>Admin Log In</h1>
        <div className='login-common-container d-flex justify-content-center container'>
            <Link to={'/signin/admin/admin_key'}><button className='btn login-login-btn text-end'><i class="fas fa-sign-in-alt"></i></button></Link>
            <div className='mt-5' style={{width:"65%"}}>
            <form className="mt-5" onSubmit={LoginAdmin}>
                    {
                        msg.length > 0 ? <p className='common-error-msg'>{msg}</p> : <></>
                    }
                <div className="form-group row mb-5">
                    <label for="exampleInputEmail1" className='col-2 m-auto'><i className="fas fa-envelope-square login-icons"></i></label>
                    <input type="email" className="form-control col" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" name='cakemaker_email' ref={emailRef} required
                    />

                    {/* value={email} onChange={e => setEmail(e.target.value)} */}
                </div>
                <div className="form-group row">
                    <label for="exampleInputPassword1" className='col-2 m-auto'><i className="fas fa-key login-icons"></i></label>
                    <input type="password" className="form-control col" id="exampleInputPassword1" placeholder="Password" name='cakemaker_password' 
                    ref={passwordRef} required/>
                </div><br/>
                <button type="submit"  className="btn login-submit-button">Submit</button>
                </form>
            </div>
            </div>
        </div>
    )
}

export default AdminLogin