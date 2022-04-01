import React, { Fragment, useEffect, useState } from "react";
import axios from 'axios';
import {useNavigate, useParams} from 'react-router-dom';
import './../../components/Common/Validation.js';
import { checkImageType } from "./../../components/Common/Validation.js";

const EditDesigns = () =>{

    const params = useParams()
    const design_id = params.design_id
    const cake_makers_id = localStorage.getItem('userId')
    const [title, setTitle] = useState('')
    const [price, setPrice] = useState('')
    const [category, setCategory] = useState('')
    const [description, setDescription] = useState('')
    const [file, setFile] = useState({})
    const [msg, setMsg] = useState('')
    const [imagePath, setImagePath] = useState('')
    var navigate = useNavigate()
    var [isValidImage, setIsValidImage] = useState('')
    var [categories, setCategories] = useState()

    useEffect(async()=>{
        
        var {data} = await axios.post('http://localhost:8000/general/get_one_design/design_details', {design_id})
        
        if (data.success) {

            setTitle(data.data[0].title)
            setPrice(data.data[0].price)
            setCategory(data.data[0].category)
            setDescription(data.data[0].description)
            setImagePath(data.data[0].image)
            
        }else{
            setMsg(data.msg)
        }
    }, [])

    const onSubmit = async(e) => {

        e.preventDefault()
        var body = new FormData

        body.append('title', title)
        body.append('price', price)
        body.append('category', category)
        body.append('description', description)
        body.append('file', file)
        body.append('design_id', design_id)

        if (file.name != undefined) {
            var validImage = checkImageType(file.name)
        }else{
            var validImage = checkImageType('test.jpg')
        }

        if (validImage.result) {
                console.log("6")
            var {data} = await axios.post('http://localhost:8000/cakemaker/update_designs/design', body)
                console.log(data)
            if (data.success) {
                console.log("2")
                setMsg(data.msg)
                navigate(`/profiles/cakemaker/${cake_makers_id}`)
            }else{
                console.log("3")
                setMsg(data.msg)
            }
        }
    }

    return(
        <Fragment>
           <div className="newdesign-container">
               <h1 className="text-center common-header" style={{zIndex:"3"}}>Edit Designs</h1>
            <div className="createpost-common-container d-flex justify-content-center container">
        <form className="mt-5" onSubmit={onSubmit} >
            {
                        msg.length > 0 ? <p className='common-error-msg'>{msg}</p> : <></>
            }              
                    <div className="form-group  row mb-3">
                    <label className="col-sm-4" for="inputName">Title</label>
                    <div className="col-sm-8">
                        <input type="text" className="form-control" placeholder="The Title of the Deisgn" onChange={e => setTitle(e.target.value)}  value={title}/>
                    </div>
                </div>
                   <div className="form-group  row mb-3">
                    <label className="col-sm-4" for="inputName">Price</label>
                    <div className="col-sm-8">
                        <input type="text" className="form-control"           onChange={(e)=>{setPrice(e.target.value)}}  value={price}/>
                    </div>
                </div>

                    <div className="form-group  row mb-3">
                        <label className="col-sm-4 mb-1" for="exampleFormControlTextarea1">Description</label>
                        <textarea className="form-control" id="exampleFormControlTextarea1" rows="3" value={description} onChange={e => setDescription(e.target.value)}></textarea>
                    </div>
    
                        <img style={{width:"250px"}} src={imagePath} className="img-thumbnail img-fluid"/>

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
                        {/* {imageValidate} */}
                        </small>
                </div>
                    <button type="submit" className="btn newDesign-submit-button"><i className="fas fa-upload"></i></button>
                </form>
            </div><br/>
           </div>
        </Fragment>
    )
}

export default EditDesigns;
