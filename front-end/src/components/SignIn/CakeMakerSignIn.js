import axios from "axios";
import React, { Fragment, useContext, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserIdContext } from "../Context/UserIdContext";
import { UserTypeContext } from "../Context/UserTypeContext";

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
    var [backgroundFile,setBackgroundFile] = useState('')
    var [email, setEmail] = useState('')
    var [msg, setMsg] = useState('')
    var [passwordValidate, setPasswordValidate] = useState('')
    var [nameValidate, setNameValidate] = useState('')
    var [imageValidate, setImageValidate] = useState('')
    var [backgroundImageValidate, setBackgroundImageValidate] = useState('')
    var [contactNumValidate, setContactNumValidate] = useState('')
    var [cake_makers_id, setCake_makers_id] = useState('')
    var navigate = useNavigate()

    let [type, setType] = useContext(UserTypeContext)
    let [userId, setUserId] = useContext(UserIdContext)

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
        body.append('file_1', file)
        body.append('file_2', backgroundFile)
        body.append('email', email)

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
            // for profile picture validation
            function checkImageType(str){
                
                var imageType = str.substring(str.length - 4);
                var imageValidation = imageType == '.jpg' || imageType == '.png' || imageType == 'jpeg';
                if (imageValidation) {
                    setImageValidate('')
                }else{
                    setImageValidate('* Image file should be jpg / png / jpeg format')
                }
                return imageValidation;
            }
            // for best project picture validation
        function checkBackgroundImageType(str){

            var imageType = str.substring(str.length - 4);
            var imageValidation = imageType == '.jpg' || imageType == '.png' || imageType == 'jpeg';
                if (imageValidation) {
                    setBackgroundImageValidate('')
                }else{
                    setBackgroundImageValidate('* Image file should be jpg / png / jpeg format')
                }
                return imageValidation;
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
        var isValidImage = checkImageType(file.name)
        var isValidBackgroundImage = checkBackgroundImageType(backgroundFile.name)
        var isValidContact = checkContactNum(contact_num)

        if (isValidPassword && isValidName && isValidImage && isValidContact && isValidBackgroundImage) {
            var {data} = await axios.post('http://localhost:8000/cakemaker/signin', body)


            if (data.success) {
                setCake_makers_id(data.data[0].cake_makers_id)
                localStorage.setItem('userId', data.data[0].cake_makers_id)
                localStorage.setItem('type', 'cakemaker')
                setType('cakemaker')
                setUserId(data.data[0].cake_makers_id)
                setMsg(data.msg)
                navigate(`/profiles/cakemaker/${data.data[0].cake_makers_id}`)
            }else{
                setMsg(data.msg)
            }
        }
    }
    return(
        <div className='signin-wrapper'>
                <h1 className="text-center common-header" style={{zIndex:"3"}}>Cake Maker Sign In</h1>
            <div className='signin-common-container d-flex justify-content-center container' data-aos="zoom-in" data-aos-duration="1000">
                <Link to={'/signin'}><button className='btn signin-signin-btn'><i class="fas fa-arrow-left"></i></button></Link>
            <div className="signin-inner-container">
                <form className="mt-5" onSubmit={signInCakeMaker}>
                    {
                        msg.length > 0 ? <p className='common-error-msg'>{msg}</p> : <></>
}                 <div className="row">
                        <div className="form-group col-lg-6 row mb-5">
                            <label className="col-sm-4 col-lg-3" for="inputName">Name</label>
                            <div className="col-sm-8">
                                <input type="text" className="form-control" placeholder="First name" onChange={e => setName(e.target.value)} required={true}/>
                                <small id="passwordHelpInline" className="common-error-msg">
                            {nameValidate}
                            </small>
                            </div>
                        </div>
                <div className="form-group col-lg-6 row mb-5">
                    <label for="exampleInputEmail1" className="col-sm-4 col-lg-3">Email address</label>
                    <div className="col-sm-8">
                        <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" name='cakemaker_email' value={email} onChange={e => setEmail(e.target.value)} required={true}
                    /></div>
                </div>
                    </div>
                <div className="row">
                     <div className="form-group col-lg-6 row mb-5">
                    <label className="col-sm-4 col-lg-3" for="inputCity">City</label>
                    <div className="col-sm-8">
                        <input type="text" className="form-control" id="inputCity" onChange={e => setCity(e.target.value)} required={true}/>
                </div>
                    </div>
                <div className="form-group col-lg-6 row mb-5">
                    <label className="col-sm-4 col-lg-3" for="formGroupExampleInput">Contact Number</label>
                    <div className="col-sm-8">
                        <input type="number" className="form-control" id="formGroupExampleInput" placeholder="0711118898 / 0112255447" onChange={e => setContact_num(e.target.value)} required={true}/>
                        <small id="passwordHelpInline" className="common-error-msg">
                    {contactNumValidate}
                    </small>
                    </div>
                </div>
                </div>
                
                
               
                <div className="form-group  row mb-5">
                    <label className="col-sm-4 col-lg-3" for="formGroupExampleInput">Brand Name</label>
                    <div className="col-sm-8">
                        <input type="text" className="form-control" id="formGroupExampleInput" placeholder="Cake Mount" onChange={e => setBrandName(e.target.value)} />
                    </div>
                </div>
                <div className="form-group  row mb-5">
                    <label className="col-sm-4 col-lg-3" for="exampleFormControlTextarea1">Social Media Links</label>
                    <div className="col">
                    <input type="text" className="form-control" placeholder="Facebook" onChange={e => setFacebook(e.target.value)}/>
                    </div>
                    <div className="col">
                    <input type="text" className="form-control" placeholder="Instagram" onChange={e => setInstagram(e.target.value)}/>
                    </div>
                    <div className="col">
                    <input type="text" className="form-control" placeholder="Twitter" onChange={e => setTwitter(e.target.value)}/>
                    </div>
                </div>
                <div className="form-group  row mb-5">
                    <label className="col-sm-4 col-lg-3 mb-1" for="exampleFormControlTextarea1">Qualifications</label>
                    <textarea className="form-control" id="exampleFormControlTextarea1" rows="3" onChange={e => setQual(e.target.value)}></textarea>
                </div>
                <div className="form-group  row mb-5">
                    <label className="col-sm-4 col-lg-3" for="exampleInputPassword1">Password</label>
                    <div className="col-sm-8">
                        <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Password" name='cakemaker_password' 
                    onChange={e => setPassword(e.target.value)} required={true}/>
                    <small id="passwordHelpInline" className="common-error-msg">
                    {passwordValidate}
                    </small><br/>
                    <small className="form-text signin-help-text">
                        Your password must be 8-20 characters long, contain letters and numbers, and symbols.
                    </small>
                    </div>
                </div>
                <div className="form-group  row mb-5">
                     <label className="col-sm-8 mb-1" for="exampleFormControlTextarea1">Profile Picture</label>
                    <input type="file" className="form-control-file col-sm-8" id="exampleFormControlFile1" required={true} onChange={e => setFile(e.target.files[0])} name="file_1"/>
                    <small id="passwordHelpInline" className="common-error-msg">
                    {imageValidate}
                    </small>
                </div>
                <div className="form-group  row mb-5">
                    <label className="col-sm-8 mb-1" for="exampleFormControlTextarea1">Upload your best design image</label>
                    <input type="file" className="form-control-file col-sm-8" id="exampleFormControlFile1" required={true} onChange={e => setBackgroundFile(e.target.files[0])} name="file_2"/>
                    <small id="passwordHelpInline" className="common-error-msg">
                    {backgroundImageValidate}
                    </small>
                </div>
                <button type="submit" className="btn signin-submit-button">Submit</button>
                </form>
            </div>
            </div>
        </div>
        
    )
}

export default CakeMakerSignIn