import axios from 'axios';
import React, { Fragment, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './../../css/Profiles/cakemakerAllProfiles.css'

const CakeMakerAllProfiles = () => {

    var [row, setRow] = useState([])
    var [msg, setMsg] = useState('')
    var [image, setImage] = useState('')
    var [cake_makers_id, setCake_makers_id] = useState([])

    useEffect(async()=>{
        var {data} = await axios.get('http://localhost:8000/cakemaker/allprofiles/cakemakers') 
        var dataSet = await axios.get('http://localhost:8000/general/get_all_designs') 

        if (data.success) {
            setRow(data.data)
        }else{
            setMsg(msg)
        }

        setImage()
        
    }, [])

    console.log(row)

    return(
        <div>
             <h1 className="text-center common-header" style={{zIndex:"3"}}>Cake Makers</h1>
            <div className='row mt-5' style={{'--bs-gutter-x':"0rem"}}>
            {
                row.map((item) => {

                    var first_name = item.name.split(' ')[0]
                    var second_name = item.name.split(' ')[1]
                //    setCake_makers_id(item.cake_makers_id)

                    return(
                        <div className='col d-flex justify-content-center' data-aos="fade-up" data-aos-duration="1000">
                            
                        <figure style={{height:"fit-content"}} className="snip0056 text-center" >
                            <figcaption >
                            <h2>{first_name} <br/><span>{second_name}</span></h2>
                            <img className='profile-picture rounded-circle' src ={item.profile_picture}/>
                            <p className='pb-4'>{item.qualifications}</p>
                            <div className="icons">
                                <a href={item.facebook}><i class="fab fa-facebook"></i></a>
                                <a href={item.twitter}><i class="fab fa-twitter"></i></a>
                                <a href={item.instagram}><i class="fab fa-instagram"></i></a>
                            </div>
                            </figcaption><br/><br/>
                            <img src={item.best_project_image} alt="sample8" />
                            <Link to={`/profiles/cakemaker/${item.cake_makers_id}`}><button className='position btn'>Profile</button></Link>
                        </figure>
                        </div>
                    )
                })
            }
            </div>
        </div>
    )
}

export default CakeMakerAllProfiles