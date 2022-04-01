import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import './../../css/Post/DisplayPost.css';
import $ from 'jquery';


// $(document).ready(function(){
//         $('.displaypost-container').hover(function(){
//              $('.info').css('display', 'none');
//             $('.displaypost-img').removeClass('col-5');
//             $('.displaypost-img').addClass('col-12');
//             $('.displaypost-img').toggleClass('col-12');
//         })
//         $('.displaypost-container').mouseleave(function(){
//             $('.info').css('display', 'block');
//             $('.displaypost-img').removeClass('col-12');
//             $('.displaypost-img').addClass('col-5');
//         })
//     });

const DisplayPost = () => {

    var [firstRow, setfirstRow] = useState([])
    var [allPosts, setAllPosts] = useState([])
    const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"];
  var navigate = useNavigate()

    useEffect(async()=>{
        var {data} = await axios.get('http://localhost:8000/cakemaker/posts/show_approved_posts')
        // var latest_news = data.data[0]
        setfirstRow([data.data[0]])
        // firstRow.push(data.data[0])
        setAllPosts(data.data.slice(1,11))
    }, [])

    const onClick = (index) => {
        setfirstRow([allPosts[index]])
    }

    const cakeMakerProfile = (cake_makers_id) => {
        navigate(`/profiles/cakemaker/${cake_makers_id}`)
    }

    
    
    return(
        // data-scroll-index="4"
        <section className="display-post mb-5" >
        <div className="container">
          <div className="display-post-head text-center">
            <h3>latest posts</h3>
          </div>
          <div className="row displaypost-wrapper d-flex justify-content-center " >
                       
            {
                firstRow.map((item) => {

                    var post_date_1 = item.post_date
                    var splitted_date_1 = post_date_1.split('/')
                    var month = parseInt(splitted_date_1[1])

                    return(
                        <div className="col-lg-6 col-md-12 col-12 container justify-content-center align-center d-flex displaypost-container" style={{height:"fit-content"}} data-aos="fade-right" data-aos-duration="1500">
                            <div className="item row " >
                                <div className="img col col-xs-12 displaypost-img">
                                <img src={item.image} alt=""/>
                                <a href="#0" className="more" onClick={()=>{cakeMakerProfile(item.cake_makers_id)}}><i className="fas fa-long-arrow-alt-right"></i></a>
                                </div>
                                <div className="info col-xs-12 col-md-7" >
                                <h5 className="display-post-inner-head text-capitalize ">{item.title}</h5>
                                <p className="text-capitalize" >{item.description}</p>
                                {/* <a href="#0" className="user"><i className="fas fa-user"></i>Admin</a> */}
                                
                                </div>
                                <div className="display-post-date">
                                    <span>{splitted_date_1[2]}<br/> {monthNames[month-1].substring(0,3)}</span>
                                </div>
                            </div>
                        </div>
                    )
                })
            }
                       

             <div className="col-lg-6 col-md-12 row post-collection-wrapper justify-content-center">
                   {
                   allPosts.map((item, index) => {
                       let post_date = item.post_date
                        let splitted_date = post_date.split('/')
                        let month = parseInt(splitted_date[1])

                       return(
                           <div className=" col-3 post-collection-container row" onClick={()=>{onClick(index)}}>
                               <img src={item.image} className="post-collection-img col-12"/>
                               <div className="col-12 post-collection-title">
                                    <span>{splitted_date[2]}<br/> {monthNames[month-1].substring(0,3)}</span>
                                </div>
                           </div>
                       )
                   })
               }
               </div>
            </div>
        </div>
      </section>
    )
}

export default DisplayPost


