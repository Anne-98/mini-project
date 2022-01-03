import React, {Fragment, useState, useRef} from "react";
import axios from 'axios';

axios.defaults.withCredentials = true

const Test = () => {

    var [image, setImage] = useState('')
    var [name, setName] = useState('')
    var imageRef = useRef()
    var nameRef = useRef()

    const handleUpload = async(event) => {
        event.preventDefault();
        var body = new FormData();
        body.append('file', imageRef.current.files[0])
        body.append('fileName', nameRef.current.value)
        
        var dataSet = await axios.post('http://localhost:8000/cakemaker/designs/insert', body)
        // var dataSet = await axios.post('http://localhost:8000/cakemaker/signin', body)
        
        setName(dataSet.data.msg)
        console.log(dataSet.data)
        
        // setImage(dataSet.data.image)
        console.log(dataSet.data.image)
        

    }

    return(
        <div>
            <div className="container">
                <h1 className="text-center mt-4">Image Upload</h1>
                <form onSubmit={handleUpload} className="mt-4">
                    <div className="input-group">

                        <input type="file" ref={imageRef} className="form-control" id="inputGroupFile04" aria-describedby="inputGroupFileAddon04" aria-label="Upload" />

                        <input type="text" ref={nameRef} className="input-group-text" placeholder="File Name"/>

                        <button className="btn btn-outline-secondary" type="submit" id="inputGroupFileAddon04">Button</button>
                    </div>
                </form>
                <div className="card container mt-5" style={{width:"18rem"}}>
                    <img src={image} className="card-img-top" alt="..."/>
                    <div className="card-body">
                        <h1 className="text-center">{name}</h1>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Test

