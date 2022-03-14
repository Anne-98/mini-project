import React, {Fragment, useState, useEffect} from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import './../../css/Home/Design.css';

const Design = () => {

    var [designs, setDesigns] = useState([])
    var [allDesigns, setAllDesigns] = useState([])
    // var [title, setTitle] = useState('')
    var type = localStorage.getItem('type')
    var userId = localStorage.getItem('userId')
    var navigate = useNavigate()
    
    useEffect(async() => {
        var {data} = await axios.get('http://localhost:8000/general/get_all_designs')
        var dataSet = data.data.slice(-8)
        console.log(data)
        let reverse = dataSet.reverse()
        if (data.data) {
            setDesigns(reverse)
            setAllDesigns(data.data)
        }else{
            alert("failed")
        }
    }, [])

    const userOnClick = () => {
        alert("You should have an account to make order")
        navigate('/login')

    }

    const lordMore = () =>{
        let length = designs.length + 4
        let dataSet = allDesigns.slice(-length)
        let reverse = dataSet.reverse()
        setDesigns(reverse)
    }

    return(
        <div className='container'>
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
                                        </div></Link> : <div className="design-icon"onClick={userOnClick}>
                                        <i class="fas fa-cart-plus"></i>
                                        </div>
                                        }
                                    </div>
                                    
                                    <div className="design-desc">
                                    <h2>{item.title}</h2>
                                    <p>{item.description}</p>
                                    </div>
                                    <Link to={`/designs/details/${item.design_id}`} className="text-decoration-none design-details-btn">Details 
                                    <i style={{paddingLeft:"10px"}} className="fas fa-angle-double-right"></i>
                                    </Link>
                                </div>
                                </div>
                        )
                    })
                }
            </div>
            <div className=' justify-content-center container text-center mt-5'>
                <button className='btn  cm-profile-btns' onClick={lordMore}>Lord More</button></div>
        </div>
    )
}

export default Design