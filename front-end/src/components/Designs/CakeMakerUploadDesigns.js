import React, { Fragment, useState } from "react";
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
            <h1 className="text-center common-header">Upload New Designs</h1>
            <div className="container">
        <form
           
        >
            <p className="text-danger">{msg}</p>
                    <input
                    required
                    label="Title"
                    helperText="Give a short name"
                    variant="standard"
                    className="pb-2"
                    placeholder="Title"
                    onChange={(e)=>{setTitle(e.target.value)}}
                    />
                    <input
                    required
                    id="outlined-number"
                    type="number"
                    label="Price"
                    variant="standard"
                    placeholder="Price"
                    onChange={(e)=>{setPrice(e.target.value)}}
                    className="Mui-required"

                    />

                    {/* <FormControl required variant="standard" className="pb-5" sx={{ m: 1, minWidth: 220 }}>
                        
                        <InputLabel id="demo-simple-select-standard-label">Category</InputLabel>
                        <Select
                        required
                        labelId="demo-simple-select-standard-label"
                        id="demo-simple-select-standard"
                        onChange={(e) =>{setCategory(e.target.value)}}
                        >
                        <MenuItem value="">
                            <em>None</em>
                        </MenuItem>
                        <MenuItem required name="Sponge Cake" value='Sponge Cake'>Sponge Cake</MenuItem>
                        <MenuItem required name="Butter Cake" value='Butter Cake'>Butter Cake</MenuItem>
                        <MenuItem required name="Gattou" value='Gattou'>Gattou</MenuItem>
                        </Select>
                    </FormControl> */}

                    <div className="form-group">
                        <label for="exampleFormControlSelect1">Example select</label>
                        <select className="form-control" id="exampleFormControlSelect1"
                        onChange={(e) =>{setCategory(e.target.value)}}>
                        <option value="Sponge Cake" >Sponge Cake</option>
                        <option value="Butter Cake" >Butter Cake</option>
                        <option value="Gattou">Gattou</option>
                        <option>4</option>
                        <option>5</option>
                        </select>
                    </div>

                    <div className="form-group container">
                        <label className="pb-2" for="exampleFormControlTextarea1">Description</label>
                        <textarea onChange={(e) => {setDescription(e.target.value)}} className="form-control" id="exampleFormControlTextarea1" rows="3" cols="4" 
                        required></textarea>
                    </div>
    
                        <img style={{width:"250px"}} src={imagePath} className="img-thumbnail img-fluid"/>

                    <div className="form-group">
                        <p className="text-danger">{msg}</p>
                        <p className="text-danger">{isValidImage}</p>
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
                    <button onClick={onSubmit} type="submit" className="btn btn-primary w-100 mt-4"><i className="fas fa-upload"></i> </button>
                </form>
            </div>


        </Fragment>
    )
}

export default CakeMakerUploadDesigns;
