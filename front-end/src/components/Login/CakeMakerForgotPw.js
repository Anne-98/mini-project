import axios from 'axios'
import {React, useState, useRef, useContext, Fragment, useEffect} from 'react';
import { Link, useLocation, useNavigate } from "react-router-dom";
import { IsLogContext } from '../Context/IsLogContext';
import { UserIdContext } from '../Context/UserIdContext';
import { UserTypeContext } from '../Context/UserTypeContext';
import './../../css/Home/Login.css';
import {checkPassword} from './../Common/Validation.js';


axios.defaults.withCredentials = true

const CakeMakerForgotPw = () => {

    var [msg, setMsg] = useState('')
    var location = useLocation()
    var navigate = useNavigate()
    let [password1, setPassword1] = useState('')
    let [password2, setPassword2] = useState('')
    let [otp, setOtp] = useState('')
    let email = location.state.email
    let [type, setType] = useContext(UserTypeContext)
    let [userId, setUserId] = useContext(UserIdContext)
    let [checkValidPassword, setCheckValidPassword] = useState('')
    
    let [realOtp, setRealOtp] = useState('')

    useEffect(async()=>{
        setMsg('Please check the OTP number sent to *******932.')
        setRealOtp(location.state.otp)
    }, [])

    const resetPassword = async(event) => {

        event.preventDefault();
        if (password1 == password2) {
            var isValidPassword = checkPassword(password1)

            if (isValidPassword.result) {
                var {data} = await axios.post('http://localhost:8000/general/sms/password_reset_cakemaker', {otp, email, password:password1})
                
                if (data.success) {
                    setType('cakemaker')
                    setUserId(data.data[0].cake_makers_id)
                    localStorage.setItem('type', 'cakemaker')
                    localStorage.setItem('userId', data.data[0].cake_makers_id)
                    navigate(`/user/${data.data[0].cake_makers_id}`)
                }else{
                    setMsg(data.msg)
                }
            }else{
                setMsg(isValidPassword.msg)
            }
        }else{
            setMsg("Passwords are not same")
        }
    }

    const resendOtp = async() =>{
        var {data} = await axios.post('http://localhost:8000/general/sms/send_sms')
        // setResult(data.result)
        if (data.success) {
            setMsg(data.msg)
            setRealOtp(data.RealOtp)
        }
    }

    return(
        <div className='login-wrapper-forgot-pw'>
        <h1 className="text-center common-header" style={{zIndex:"3"}}>Cake Maker Log In</h1>
        <div className='login-common-container d-flex justify-content-center container'>
            <Link to={'/login'}><button className='btn login-login-btn text-end'><i class="fas fa-arrow-left"></i></button></Link>
            <div className='mt-5' style={{width:"65%"}}>

            <form className="mt-5" onSubmit={resetPassword}>
                    {
                        msg.length > 0 ? <p className='common-error-msg'>{msg}</p> : <></>
                    }
                    <h1>{realOtp}</h1>
                <div className="form-group row">
                    <label for="exampleInputPassword1" className='col-2 m-auto'><i className="fas fa-key login-icons"></i></label>

                    <input type="" className="form-control col" id="exampleInputPassword1" placeholder="New Password" name='cakemaker_password' 
                    onChange={(e)=>{setPassword1(e.target.value)}} required/>
                </div><br/>
                 <div className="form-group row">
                    <label for="exampleInputPassword1" className='col-2 m-auto'><i className="fas fa-key login-icons"></i></label>

                    <input type="" className="form-control col" id="exampleInputPassword1" placeholder="Re-enter Password" name='cakemaker_password' 
                    onChange={(e)=>{setPassword2(e.target.value)}} required/>
                </div><br/>
                <div className="form-group row">
                    <label for="exampleInputPassword1" className='col-2 m-auto'><i className="login-icons"></i></label>

                    <input type="text" className="form-control col" id="exampleInputPassword1" placeholder="OTP Number" name='cakemaker_password' 
                    onChange={(e)=>{setOtp(e.target.value)}} required/>
                </div><br/>
                <div className="form-group">
                    <label for="exampleInputPassword1" className='col-2 m-auto'></label>

                    <button type='button' style={{color:"white", background:"#b89472"}} className='btn' onClick={resendOtp}>Re-send OTP</button>
                </div><br/>
               
                <button type="submit"  className="btn login-submit-button-forgot">Submit</button>
                </form>
            </div>
            </div>
        </div>
    )
}
// var {data} = await axios.post('http://localhost:8000/general/sms/send_sms')
        // setResult(data.result)

export default CakeMakerForgotPw