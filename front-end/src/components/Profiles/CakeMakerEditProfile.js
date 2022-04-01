import axios from "axios";
import React, { useEffect, Fragment, useState } from "react";
import { useParams } from "react-router-dom";
import {checkContactNum, checkImageType, checkName} from "../Common/Validation";
import { useNavigate } from "react-router-dom";
import './../../css/Profiles/CakeMakerEditProfile.css';

axios.defaults.withCredentials = true

const CakeMakerEditProfile = () => {

    var params = useParams()
    var cake_makers_id = params.cake_makers_id
    var [row, setRow] = useState('')
    var [name, setName] = useState('')
    var [city,setCity] = useState('')
    var [brandName,setBrandName] = useState('')
    var [contact_num,setContact_num] = useState('')
    var [facebook,setFacebook] = useState('')
    var [instagram,setInstagram] = useState('')
    var [twitter,setTwitter] = useState('')
    var [qualifications,setQual] = useState('')
    var [file,setFile] = useState({})
    var [msg, setMsg] = useState('')
    var [nameValidate, setNameValidate] = useState('')
    var [imageValidate, setImageValidate] = useState('')
    const [imagePath, setImagePath] = useState('')
    var [contactNumValidate, setContactNumValidate] = useState('')
    var navigate = useNavigate()

    useEffect(async()=>{

        var {data} = await axios.post('http://localhost:8000/cakemaker/profile/myprofile', {cake_makers_id})

        setRow(data.data[0])
        setName(data.data[0].name)
        setCity(data.data[0].district)
        setBrandName(data.data[0].brand_name)
        setContact_num(`0${data.data[0].contact_num}`)
        setFacebook(data.data[0].facebook)
        setInstagram(data.data[0].instagram)
        setTwitter(data.data[0].twitter)
        setQual(data.data[0].qualifications)
        setFile(data.data[0].profile_picture)
        setImagePath(data.data[0].profile_picture)
    }, [])

    const updateProfile = async(event) => {

        event.preventDefault()

        var body = new FormData()
        body.append('name', name)
        body.append('district', city)
        body.append('brandName', brandName)
        body.append('contact_num', contact_num)
        body.append('facebook', facebook)
        body.append('instagram', instagram)
        body.append('twitter', twitter)
        body.append('qualifications', qualifications)
        body.append('file', file)
        
        var isValidName = checkName(name)
        var isValidContact = checkContactNum(contact_num)

        // console.log('file.name.length:',file.name)

        if (file.name != undefined) {
            var isValidImage = checkImageType(file.name)
        }else{
            var isValidImage = checkImageType('test.jpg')
            
        }

        setNameValidate(isValidName.msg)
        setImageValidate(isValidImage.msg)
        setContactNumValidate(isValidContact.msg)

        if (isValidName.result && isValidImage.result && isValidContact.result) {
            var {data} = await axios.post('http://localhost:8000/cakemaker/profile/updateprofile', body)
            
            if (data.isLog) {
                if (data.success) {
                    navigate(`/profiles/cakemaker/${cake_makers_id}`)
                }else{
                    setMsg(data.msg)
                }
            }else{
                setMsg(data.msg)
            }
        }
    }

    return(
        <div className="cm-editprofile-wrapper">
                <h1 className="text-center common-header" style={{zIndex:"3"}}>Edit Profile</h1>
            <div className='cm-edit-profile-container d-flex justify-content-center container'>
            <div className="signin-inner-container">
                <form className="mt-5" onSubmit={updateProfile}>

                    <p>{msg}</p>

                <div className="row">
                    <div className="row mb-4 col-md-6 cm-editprofile-row">
                        <label className="col-sm-4 cm-editprofile-label col-md-3" for="inputName">Name</label>
                        <div className="col-sm-8 col-md-9">
                            <small id="passwordHelpInline" className="text-danger">
                        {nameValidate}
                        </small>
                            <input type="text" className="form-control" placeholder="First name" onChange={e => setName(e.target.value)} value={name}  />
                        </div>
                    </div>
                    <div className="row mb-4 col-md-6 cm-editprofile-row">
                        <label className="col-sm-4 cm-editprofile-label col-md-3" for="inputCity">District</label>
                        <div className="col-sm-8 col-md-9">
                            <input value={city} type="text" className="form-control" id="inputCity" onChange={e =>setCity(e.target.value)} />
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="row mb-4 col-md-6 cm-editprofile-row">
                        <label className="col-sm-4 cm-editprofile-label" for="formGroupExampleInput">Brand Name</label>
                        <div className="col-sm-8">
                            <input value={brandName} type="text" className="form-control" id="formGroupExampleInput" placeholder="Cake Mount" onChange={e => setBrandName(e.target.value)} />
                        </div>
                    </div>
                    <div className="row mb-4 col-md-6 cm-editprofile-row">
                        <label className="col-sm-4 cm-editprofile-label" for="formGroupExampleInput">Contact Number</label>
                        <div className="col-sm-8">
                            <small id="passwordHelpInline" className="text-danger">
                        {contactNumValidate}
                        </small>
                            <input value={contact_num} type="number" className="form-control" id="formGroupExampleInput" placeholder="0711118898 / 0112255447" onChange={e => setContact_num(e.target.value)} />
                        </div>
                    </div>
                </div>
                <div className="row">
                    <label className="col-sm-4 cm-editprofile-label mb-1" for="exampleFormControlTextarea1">Social Media Links</label>
                    <div className="col">
                    <input value={facebook} type="text" className="form-control" placeholder="Facebook" onChange={e => setFacebook(e.target.value)}/>
                    </div>
                    <div className="col">
                    <input value={instagram} type="text" className="form-control" placeholder="Instagram" onChange={e => setInstagram(e.target.value)}/>
                    </div>
                    <div className="col">
                    <input value={twitter} type="text" className="form-control" placeholder="Twitter" onChange={e => setTwitter(e.target.value)}/>
                    </div>
                </div>
                <div className="row mb-5 mt-3">
                    <label className="col-sm-4 cm-editprofile-label mb-1" for="exampleFormControlTextarea1">Qualifications</label>
                    <textarea className="form-control" id="exampleFormControlTextarea1" value={qualifications} rows="3" onChange={e => setQual(e.target.value)}></textarea>
                </div>
                {
                    imagePath.length > 0 ? <img style={{width:"250px"}} src={imagePath} className="img-thumbnail img-fluid"/> : <></>
                }
                <div className="form-group  row mb-3">
                     <label  className="btn text-uppercase col-sm-4 mb-1" for="exampleFormControlTextarea1" htmlFor="filePicker">Upload <i class="fas fa-camera"></i></label>
                        <input type="file" className="form-control-file" id="filePicker" style={{visibility:"hidden"}}  
                        onChange = { 
                            e => {
                                if (e.target.files && e.target.files[0]) {
                                    let reader = new FileReader();
                                    reader.onload = (e) => {
                                    setImagePath(e.target.result);
                                    };
                                    reader.readAsDataURL(e.target.files[0]);
                                    setFile(e.target.files[0])
                                }
                            }
                        }/>
                        <small id="passwordHelpInline" className="text-danger">
                        {imageValidate}
                        </small>
                </div>
                <button type="submit" className="btn signin-submit-button mt-0">Submit</button>
                </form>
            </div>
            </div>
        </div>
    )

}

export default CakeMakerEditProfile