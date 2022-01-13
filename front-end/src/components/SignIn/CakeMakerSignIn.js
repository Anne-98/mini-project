import axios from "axios";
import React, { Fragment, useRef, useState } from "react";

const CakeMakerSignIn = () => {

    var [password,setPassword] = useState('')
    var [name,setName] = useState('')
    var [city,setCity] = useState('')
    var [brandName,setBrandName] = useState('')
    var [contact_num,setContact_num] = useState('')
    var [facebook,setFacebook] = useState('')
    var [instagram,setInstagram] = useState('')
    var [twitter,setTwitter] = useState('')
    var [qualifications,setQual] = useState('')
    var [file,setFile] = useState('')
    var [email, setEmail] = useState('')
    var [msg, setMsg] = useState('')

    // var [body, setBody] = useState({password, name, city, brandName, tel, facebook, instagram, twitter, qualifications, file, email})

    const signInCakeMaker = async(event) => {
        event.preventDefault()

        var body = new FormData()
        body.append('password', password)
        body.append('name', name)
        body.append('district', city)
        body.append('brandName', brandName)
        body.append('contact_num', contact_num)
        body.append('facebook', facebook)
        body.append('instagram', instagram)
        body.append('twitter', twitter)
        body.append('qualifications', qualifications)
        body.append('file', file)
        body.append('email', email)

        var {data} = await axios.post('http://localhost:8000/cakemaker/signin', body)

        if (!data.exist) {
            setMsg(data.msg)
        }else{
            setMsg(data.msg)
        }
    }

    return(
        <Fragment>
            <div className='mt-5 mx-auto' style={{width:"70%"}}>
                <br/>
                <br/>
                <h1 className='mt-5'>Cake Maker SignIn</h1>
            <form className="mt-5" onSubmit={signInCakeMaker}>
                    <p>{msg}</p>
                <div className="row mb-2">
                    <label for="exampleInputEmail1" className="col-sm-4">Email address</label>
                    <div className="col-sm-8">
                        <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" name='cakemaker_email' value={email} onChange={e => setEmail(e.target.value)} required={true}
                    /></div>
                </div>
                <div className="row mb-2">
                    <label className="col-sm-4" for="exampleInputPassword1">Password</label>
                    <div className="col-sm-8">
                        <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Password" name='cakemaker_password' 
                    onChange={e => setPassword(e.target.value)}/>
                    <small id="passwordHelpBlock" class="form-text text-muted">
                        Your password must be 8-20 characters long, contain letters and numbers, and must not contain spaces, special characters, or emoji.
                    </small>
                    </div>
                </div>
                <div class="row mb-2">
                    <label className="col-sm-4" for="inputName">Name</label>
                    <div className="col-sm-8">
                        <input type="text" class="form-control" placeholder="First name" onChange={e => setName(e.target.value)}/>
                    </div>
                </div>
                <div class="row mb-2">
                    <label className="col-sm-4" for="inputCity">City</label>
                    <div className="col-sm-8">
                        <input type="text" class="form-control" id="inputCity" onChange={e => setCity(e.target.value)}/>
                </div>
                    </div>
                <div class="row mb-2">
                    <label className="col-sm-4" for="formGroupExampleInput">Brand Name</label>
                    <div className="col-sm-8">
                        <input type="text" class="form-control" id="formGroupExampleInput" placeholder="Cake Mount" onChange={e => setBrandName(e.target.value)} />
                    </div>
                </div>
                <div class="row mb-2">
                    <label className="col-sm-4" for="formGroupExampleInput">Contact Number</label>
                    <div className="col-sm-8">
                        <input type="text" class="form-control" id="formGroupExampleInput" placeholder="0711118898 / 0112255447" onChange={e => setContact_num(e.target.value)}/>
                    </div>
                </div>
                <div class="row">
                    <label className="col-sm-4 mb-1" for="exampleFormControlTextarea1">Social Media Links</label>
                    <div class="col">
                    <input type="text" class="form-control" placeholder="Facebook" onChange={e => setFacebook(e.target.value)}/>
                    </div>
                    <div class="col">
                    <input type="text" class="form-control" placeholder="Instagram" onChange={e => setInstagram(e.target.value)}/>
                    </div>
                    <div class="col">
                    <input type="text" class="form-control" placeholder="Twitter" onChange={e => setTwitter(e.target.value)}/>
                    </div>
                </div>
                <div class="row mb-5">
                    <label className="col-sm-4 mb-1" for="exampleFormControlTextarea1">Qualifications</label>
                    <textarea class="form-control" id="exampleFormControlTextarea1" rows="3" onChange={e => setQual(e.target.value)}></textarea>
                </div>
                <div class="form-group">
                    <input type="file" class="form-control-file" id="exampleFormControlFile1" required={true} onChange={e => setFile(e.target.files[0])}/>
                </div>
                <button type="submit" className="btn btn-primary mt-3">Submit</button>
                </form>
            </div>
        </Fragment>
        
    )
}

export default CakeMakerSignIn