import React, {Fragment, useState, useEffect} from 'react';
import axios from 'axios';
import './../../css/design.css'
import { Link } from 'react-router-dom';
import './../../css/Home/Design.css';

const Design = () => {

    var [designs, setDesigns] = useState([])
    // var [title, setTitle] = useState('')
    var type = localStorage.getItem('type')
    var userId = localStorage.getItem('userId')
    
    useEffect(async() => {
        var {data} = await axios.get('http://localhost:8000/general/get_all_designs')
        
        if (data.data) {
            setDesigns(data.data)
        }else{
            alert("failed")
        }
    }, [])

    const userOnClick = () => {
        alert("You should have an account to make order")
    }

    return(
        <Fragment>
            <div className='row '>
                {
                    designs.map((item) => {
                        console.log(item.title)
                        return(
                            <div className="design-container col ">
                                <div className="design-card">
                                    <div className="design-img-cover">
                                        <img src={item.image}/>
                                        {
                                            type == 'customer' || type == 'cakemaker' ? <Link to={`/orders/direct/${item.design_id}`}><div className="design-icon" >
                                            <i class="fas fa-cart-plus"></i>
                                        </div></Link> : <div className="design-icon" onClick={userOnClick}>
                                            <i class="fas fa-cart-plus"></i>
                                        </div>
                                        }
                                    </div>
                                    
                                    <div className="design-desc ">
                                    <h2>{item.title}</h2>
                                    <p>{item.description}</p>
                                    </div>
                                    <Link to={`/designs/details/${item.design_id}`} className="text-decoration-none design-details-btn">
                                    Details
                                    </Link>
                                </div>
                                </div>
                        )
                    })
                }
            </div>
        </Fragment>
    )
}

export default Design