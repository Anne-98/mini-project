import React, { Fragment, useEffect, useState } from "react";
import axios from 'axios';
import {useNavigate} from 'react-router-dom';
import './../../components/Common/Validation.js';
import { checkImageType } from "./../../components/Common/Validation.js";

const CakeMakerUploadDesigns = () => {
    
    const cake_makers_id = localStorage.getItem('userId')
    const [title, setTitle] = useState('')
    const [price, setPrice] = useState('')
    const [category, setCategory] = useState('')
    const [description, setDescription] = useState('')
    const [file, setFile] = useState()
    const [msg, setMsg] = useState('')
    const [imagePath, setImagePath] = useState('')
    var navigate = useNavigate()
    var [isValidImage, setIsValidImage] = useState('')

    let [row, setRow] = useState([])

    useEffect(async()=>{
        var {data} = await axios.post('http://localhost:8000/general/get_categories/categories')
        
        console.log(data)
        if (data.success) {
            setRow(data.data)
        }

    },[])

    const onSubmit = async(e) => {

        e.preventDefault()
        var body = new FormData

        body.append('title', title)
        body.append('price', price)
        body.append('category', category)
        body.append('description', description)
        body.append('file', file)

        if (file) {
            var validImage = checkImageType(file.name)
            if (validImage.result) {
                var {data} = await axios.post('http://localhost:8000/cakemaker/designs/insert', body)

                console.log(data)
                if (data.isLog) {
                    setMsg(data.msg)
                    navigate(`/profiles/cakemaker/${cake_makers_id}`)
                }else{
                    setMsg(data.msg)
                }
            }else{
                setIsValidImage(validImage.msg)
            }
        }else{
            setIsValidImage('Please upload an Image of your design')
        }
    }
console.log(file)
    return(
        <Fragment>
            <div className="newdesign-container">
            <h1 className="text-center common-header" style={{zIndex:"3"}}>Upload New Designs</h1>

             <div className='createpost-common-container d-flex justify-content-center container' data-aos="zoom-in" data-aos-duration="1000">
            <div className="" style={{width:"75%"}}>
                <form className="mt-5" onSubmit={onSubmit}>
                    {
                        msg.length > 0 ? <p className='common-error-msg'>{msg}</p> : <></>
}                   
                <div className="form-group  row mb-3">
                    <label className="col-sm-4" for="inputName">Title</label>
                    <div className="col-sm-8">
                        <input type="text" className="form-control" placeholder="The Title of the Deisgn" onChange={e => setTitle(e.target.value)} required={true}/>
                    </div>
                </div>
                <div className="form-group  row mb-3">
                    <label className="col-sm-4" for="inputName">Price</label>
                    <div className="col-sm-8">
                        <input type="text" className="form-control"           onChange={(e)=>{setPrice(e.target.value)}} required={true}/>
                    </div>
                </div>
                <div className="form-group row mb-3">
                        <label for="exampleFormControlSelect1">Example select</label>
                        <select className="form-control" id="exampleFormControlSelect1"
                        onChange={(e) =>{setCategory(e.target.value)}}>
                            {
                                row.map((item) => {
                                    return(
                                         <option className="cm-upload-design-option   red" id="decorated" value={item.name} >{item.name}</option>
                                    )
                                })
                            }
                        </select>
                    </div>
                <div className="form-group  row mb-3">
                    <label className="col-sm-4 mb-1" for="exampleFormControlTextarea1">Description</label>
                    <textarea className="form-control" id="exampleFormControlTextarea1" rows="3" onChange={e => setDescription(e.target.value)}></textarea>
                </div>
                {
                    imagePath.length > 0 ? <img style={{width:"250px"}} src={imagePath} className="img-thumbnail img-fluid"/> : <></>
                }
                <div className="form-group  row mb-3">
                     <label  className="btn text-uppercase col-sm-4 mb-1" for="exampleFormControlTextarea1" htmlFor="filePicker">Upload <i class="fas fa-camera"></i></label>
                        <input type="file" className="form-control-file" id="filePicker" style={{visibility:"hidden"}} required={true} 
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
                        {/* {imageValidate} */}
                        </small>
                </div>
                <button type="submit" className="btn newDesign-submit-button"><i className="fas fa-upload"></i></button>
                </form>
            </div>
            </div><br/>
        </div>
        


        </Fragment>
    )
}

export default CakeMakerUploadDesigns;
