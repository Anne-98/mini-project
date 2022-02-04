import React, { Fragment, useEffect, useState } from 'react'
import axios from 'axios';
import { Link, useNavigate, useParams } from 'react-router-dom';
import './../../css/Profiles/CakeMakerProfile.css';

axios.defaults.withCredentials = true

const CakeMakerProfile = () => {

    var params = useParams()
    var cake_makers_id = params.cake_makers_id
    var [row, setRow] = useState({})
    var navigate = useNavigate()
    var [designs, setDesigns] = useState([])
    var userId = localStorage.getItem('userId')
    console.log(cake_makers_id)

    useEffect(async()=>{

        var {data} = await axios.post('http://localhost:8000/cakemaker/profile/myprofile', {cake_makers_id})

        setRow(data.data[0])

        console.log(row)
        var dataSet = await axios.post('http://localhost:8000/cakemaker/cakemaker_designs/get_cakemaker_designs', {cake_makers_id})

        if (dataSet.data.sucess) {
            setDesigns(dataSet.data.data)
        }
    },[])

    const editProfile = () => {
        navigate(`/profiles/cakemaker/edit/${cake_makers_id}`)
    }
    return(
        <Fragment>
            <br/>
            <br/>
            <br/>
            <br/>
            <div className="card text-center">
                <div className="card-header">
                    <h1>Cake Maker Profile</h1>
                </div>
                {
                    cake_makers_id ==  userId ? 
                    <Fragment>
                        <Link to={`/cakemaker/orders/all/${cake_makers_id}`}><button href="#" style={{float:"right", display:"block"}} className="btn btn-success  m-3">Your Orders</button></Link>
                        <Link to={`/cakemaker/designs/new/${cake_makers_id}`}><button href="#" style={{float:"right", display:"block"}} className="btn btn-success  m-3">Upload Designs + </button></Link>
                    </Fragment> : <></>
                }
                <div className="card-body ">
                    <img style={{width: '200px', borderRadius:"50px"}} src={row.profile_picture} className="rounded mx-auto d-block" alt="..."/>
                    <h5 className="card-title">{row.name}</h5>
                    District: <span className="card-text ">{row.district}</span><br/><br/>
                    Qualifications: <span className="card-text">{row.qualifications}</span><br/><br/>
                    Contact Number: <span className="card-text">0{row.contact_num}</span><br/><br/>
                    Brand Name: <span className="card-text">{row.brand_name}</span>
                    
                    
                    <br/><br/>

                    <div className="btn-group" role="group" aria-label="Basic outlined example">
                        <button type="button" className="btn btn-outline-primary">
                            <a href={row.facebook} className="text-decoration-none">Facebook</a>
                            </button>
                        <button type="button" className="btn btn-outline-primary">
                            <a href={row.instagram}className="text-decoration-none">Instagram</a>
                            </button>
                        <button type="button" className="btn btn-outline-primary">
                            <a href={row.twitter}className="text-decoration-none">Twitter</a>
                            </button>
                    </div><br/><br/>
                    {
                       cake_makers_id ==  userId ? <button href="#" onClick={editProfile} className="btn btn-primary" style={{marginRight:"15px"}}>Edit</button>: <></>
                    }
                    
                    
                </div>
                <div className="card-footer text-muted">
                    2 days ago
                </div>
            </div>


            
           <div className='wrapper'>
               <div className='container'>
                   <div className='row'>
                        {
                    designs.map((item) => {

                        return(
                            <div className="container-glass col m-4">
                                <img className="img" src={item.image} alt="" />
                                <Link to={`/cakemaker/designs/edit/${item.design_id}`}><button className='btn btn-primary'>Edit</button></Link>
                                <p className="text">
                                    {item.description}
                                </p>
                                <p><b>${item.price}</b></p>
                                <div>{item.category}</div>
                                <Link to={`/designs/details/${item.design_id}`}className='text-decoration-none'><button className="btn">Discover</button></Link>
                            </div>
                        )
                    })
                }
                   </div>
               </div>
           </div>


           
        </Fragment>
    )
}

export default CakeMakerProfile