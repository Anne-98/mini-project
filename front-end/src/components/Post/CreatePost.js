import axios from "axios";
import React, { useContext, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { UserIdContext } from "../Context/UserIdContext";
import {checkImageType} from './../Common/Validation.js';
import './../../css/Post/CreatePost.css';

const CreatePost = () => {

    const params = useParams()
    const name = params.cakemakers_name
    var [msg, setMsg] = useState('')
    var [file, setFile] = useState()
    var [description, setDescription] = useState('')
    var [title, setTitle] = useState('')
    var [userId, setUserId] = useContext(UserIdContext)
    var navigate = useNavigate()
    const [imagePath, setImagePath] = useState('')
    var cake_makers_id = userId
    var imageValidate

    const createPost = async(e) => {

        e.preventDefault()
        var body = new FormData()
        body.append('title', title)
        body.append('description', description)
        body.append('file', file)
        body.append('name', name)
        body.append('cake_makers_id', cake_makers_id)

        
        var isValidImage = checkImageType(file.name)
        
        console.log(isValidImage)
        if (isValidImage.result) {
            var {data} = await axios.post('http://localhost:8000/cakemaker/createpost/create_post', body)
            if (data.isLog) {
                if (data.success) {
                    navigate('/')
                }else{
                    setMsg(data.msg)
                }
            }else{
                setMsg(data.msg)
            }
        }else{
            setMsg(isValidImage.msg)
        }
    }

    return(
        <div className="createpost-container">
            <h1 className="text-center common-header" style={{zIndex:"3"}}>Create Post</h1>

             <div className='createpost-common-container d-flex justify-content-center container '>
            <div className="mt-5" style={{width:"75%"}}>
                <form className="mt-5" onSubmit={createPost}>
                    {
                        msg.length > 0 ? <p className='common-error-msg'>{msg}</p> : <></>
}                   
                <div className="form-group  row mb-3">
                    <label className="col-sm-4" for="inputName">Title</label>
                    <div className="col-sm-8">
                        <input type="text" className="form-control" placeholder="The event of the post" onChange={e => setTitle(e.target.value)} required={true}/>
                    </div>
                </div>
                <div className="form-group  row mb-3">
                    <label className="col-sm-4 mb-1" for="exampleFormControlTextarea1">Description</label>
                    <textarea className="form-control" id="exampleFormControlTextarea1" rows="3" onChange={e => setDescription(e.target.value)}></textarea>
                </div>
                {/* <div className="form-group  row mb-3">
                     <label className="col-sm-8 mb-1" for="exampleFormControlTextarea1">Image</label>
                    <input type="file" className="form-control-file col-sm-8" id="exampleFormControlFile1" required={true} onChange={e => setFile(e.target.files[0])} name="file_1"/>
                    <small id="passwordHelpInline" className="common-error-msg">
                    {imageValidate}
                    </small>
                </div> */}
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
                <button type="submit" className="btn createpost-submit-button">Submit</button>
                </form>
            </div>
            </div><br/>
        </div>
    )
}

export default CreatePost