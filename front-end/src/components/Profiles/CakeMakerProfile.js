import React, { Fragment, useEffect, useState } from 'react'
import axios from 'axios';
import { Link, useNavigate, useParams } from 'react-router-dom';
import './../../css/Profiles/CakeMakerProfile.css';

axios.defaults.withCredentials = true

const CakeMakerProfile = () => {

    var params = useParams()
    var cake_makers_id = params.cake_makers_id
    var [row, setRow] = useState({})
    var [totalOrders, setTotalOrders] = useState('')
    var [totalDesigns, setTotalDesigns] = useState('')
    var navigate = useNavigate()
    var [designs, setDesigns] = useState([])
    var userId = localStorage.getItem('userId')
    console.log(cake_makers_id)

    useEffect(async()=>{

        var {data} = await axios.post('http://localhost:8000/cakemaker/profile/myprofile', {cake_makers_id})
        
        setRow(data.data[0])

        var dispatch_orders = await axios.post('http://localhost:8000/cakemaker/dispatch_order/number_of_dispatches', {cake_makers_id})

        setTotalOrders(dispatch_orders.data.data.direct_row.length + dispatch_orders.data.data.direct_row.length)

        var dataSet = await axios.post('http://localhost:8000/cakemaker/cakemaker_designs/get_cakemaker_designs', {cake_makers_id})

        if (dataSet.data.sucess) {
            setDesigns(dataSet.data.data)
            setTotalDesigns(designs.length)

        }
    },[])

    const editProfile = () => {
        navigate(`/profiles/cakemaker/edit/${cake_makers_id}`)
    }
    const userOnClick = () => {
        alert("You should have an account to make order")
    }
    return(
        <Fragment>
            <h1 className="text-center common-header" style={{zIndex:"3"}}>Cake Maker Profile</h1>
                
            <div className="container cm-profile-wrapper">
                {
                    cake_makers_id ==  userId ? 
                    <div style={{display:"flex", alignItems:"right", justifyContent:"right"}}>
                        <Link to={`/cakemaker/orders/all/${cake_makers_id}`}><button className="btn m-3 cm-profile-btns">Orders</button></Link>
                        <Link   to={`/cakemaker/create/post/${row.name}`}><button className="btn m-3 cm-profile-btns" >Create Post</button></Link>
                        <Link to={`/cakemaker/designs/new/${cake_makers_id}`}><button className="btn m-3 cm-profile-btns">Upload <i class="fas fa-upload"></i> </button></Link>
                    </div> : <></>
                }
                <div className='mt-5' >
                    <div className="row justify-content-center">
                    <div className='cm-profile-img-div col-4 mx-auto'>
                        <img src={row.profile_picture} className="cm-profile-img" alt="..."/>
                    </div>
                    
                    {/* <div className='col-1 ></div> */}
                    <div className='col-8 cm-profile-details-body '>
                        <h1 className="">{row.name} {
                       cake_makers_id ==  userId ? <button onClick={editProfile} className="btn cm-profile-edit-btn" ><i className="fas fa-pen "></i></button>: <></>
                    }   </h1>

                        <div className='row mb-3'>
                            <div className='col-12 mb-3' style={{color:"#f9c74f"}}>
                                <i class="fas fa-star"></i>
                                <i class="fas fa-star"></i>
                                <i class="fas fa-star"></i>
                                <i class="fas fa-star-half-alt fa-star"></i>
                                <i class="far fa-star"></i>    
                            </div>
                            <div className='col-4'><b>{totalOrders}</b> Total Orders</div>
                            <div className='col-4'><b>{totalDesigns}</b> Designs</div>
                        </div>
                        
                        <div className='cm-details-body row'>
                            <span className='details-heading col-4 '>District:</span> 
                            <span className="col-8 ">{row.district}</span>
                        </div>
                        <div className='cm-details-body row'>
                            <span className='details-heading col-4 '>Qualifications: </span>
                            <span className="col-8 ">{row.qualifications}</span>
                        </div>
                        <div className='cm-details-body row'>
                            <span className='details-heading col-4 '>Contact Number: </span>
                            <span className="col-8 ">0{row.contact_num}</span>
                        </div>
                        <div className='cm-details-body row'>
                            <span className='details-heading col-4 '>Brand Name: </span>
                            <span className="col-8 ">{row.brand_name}</span>
                        </div>
                        <div className="cm-profile-links ">
                            <a href={row.facebook} className="text-decoration-none"><i class="fab fa-facebook"></i></a>

                            <a href={row.instagram}className="text-decoration-none"><i class="fab fa-instagram"></i></a>
                            <a href={row.twitter}className="text-decoration-none"><i class="fab fa-twitter"></i></a>
                        </div>
                    </div>
                </div>
                
                </div>
            </div>

           <div className='cm-design-wrapper'  style={{position:"relative"}}>
                   <div className='row justify-content-center' style={{margin:"0px auto"}}>
                        {
                    designs.map((item) => {

                        return(
                            <div className="container-glass col-4 text-center">
                                

                                <div className='cm-designs-title mb-2'>{item.title} </div>
                                <div className='cm-designs-price'>${item.price}</div>
                                
                                <img className="img" src={item.image} alt="" />
                                {/* <p className="text">
                                    {item.description}
                                </p> */}
                                {/* <div>{item.category}</div> */}
                                {
                                            userId.length > 0 ? <Link to={`/orders/direct/${item.design_id}`}><div className="cm-profile-cart-icon" >
                                            <i class="fas fa-cart-plus"></i>
                                        </div></Link> : <div className="cm-profile-cart-icon" onClick={userOnClick}>
                                            <i class="fas fa-cart-plus"></i>
                                        </div>
                                        }
                                <Link to={`/designs/details/${item.design_id}`}className='text-decoration-none'><button className="btn cm-designs-discover mt-3">Discover</button></Link>
                            </div>
                        )
                    })
                }
                   </div>
           </div>
           
        </Fragment>
    )
}

export default CakeMakerProfile