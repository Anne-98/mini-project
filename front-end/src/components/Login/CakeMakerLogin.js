import axios from 'axios'
import {React, useState, useRef} from 'react';
import { useNavigate } from "react-router-dom";

axios.defaults.withCredentials = true

const CakeMakerLogin = () => {

    var [msg, setMsg] = useState('')
    var emailRef = useRef()
    var passwordRef = useRef()
    var navigate = useNavigate()
    var [success, setSuccess] = useState('')


    const loginCakeMaker = async(event) => {

        event.preventDefault();

        var body = new FormData()
        body.append('cakemaker_email', emailRef.current.value)
        body.append('cakemaker_password', passwordRef.current.value)

        var {data} = await axios.post('http://localhost:8000/cakemaker/login', body)

        if (emailRef.current.value.length == 0 || passwordRef.current.value.length == 0) {
            setMsg("Input is empty")
        }else{
            if (data.success == true) {
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
            <div className='mt-5' style={{width:"45%", float:"right"}}>
                <h1 className='mt-5'>Cake Maker Log In</h1>
            <form className="mt-5" onSubmit={loginCakeMaker}>
                <div className="form-group">
                    <p style={success ? {color:"green"} : {color:"red"}}>{msg}</p>
                    <label for="exampleInputEmail1">Email address</label>
                    <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" name='cakemaker_email' ref={emailRef} required
                    />

                    {/* value={email} onChange={e => setEmail(e.target.value)} */}
                </div>
                <div className="form-group">
                    <label for="exampleInputPassword1">Password</label>
                    <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Password" name='cakemaker_password' 
                    ref={passwordRef} required/>
                </div><br/>
                <button type="submit"  className="btn btn-primary">Submit</button>
                </form>
            </div>
        </div>
    )
}

export default CakeMakerLogin