import React, {Fragment, useState, useEffect} from 'react';
import axios from 'axios';
import './../../css/design.css'

const Design = () => {

    var [designs, setDesigns] = useState([])
    // var [title, setTitle] = useState('')
    
    useEffect(async() => {
        var {data} = await axios.get('http://localhost:8000/general/get_all_designs')
        
        if (data.data) {
            setDesigns(data.data)
        }else{
            alert("failed")
        }
    }, [])

    return(
        <Fragment>
            <div>
                {
                    designs.map((item) => {
                        console.log(item.title)
                        return(
                            <div>
                                <h1>{item.title}</h1>
                                <p>{item.description}</p>
                                <img src={item.image} style={{width:"100px"}}/>
                            </div>
                        )
                    })
                }
            </div>
        </Fragment>
    )
}

export default Design