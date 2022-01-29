import React, {Fragment, useState, useEffect} from 'react';
import axios from 'axios';
import './../../css/design.css'
import { Link } from 'react-router-dom';
import './../../css/Home/Design.css';

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
            <div className='row'>
                {
                    designs.map((item) => {
                        console.log(item.title)
                        return(
                            <Link to={`/designs/details/${item.design_id}`} className="text-decoration-none col">
                            <div className="design-container">
 
                                <div className="design-card">
                                    <div className="design-img-cover">
                                        <img src={item.image}/>
                                        <div className="design-icon" >
                                            <i class="fas fa-cart-plus"></i>
                                        </div>
                                    </div>
                                    
                                    <div className="design-desc">
                                    <h1>{item.title}</h1>
                                    <p>{item.description}</p>
                                    <a href ="">details <svg width="19" height="14" viewBox="0 0 23 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M0 9H22M12 1.5L20.9333 8.2C21.4667 8.6 21.4667 9.4 20.9333 9.8L12 16.5" stroke="white" stroke-width="3"/>
                                </svg></a>
                                    </div>
                                </div>
                                </div>
                            </Link>
                        )
                    })
                }
            </div>
        </Fragment>
    )
}

export default Design