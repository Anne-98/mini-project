import axios from "axios";
import React, { Fragment, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import './../../css/Admin/AdminViewPost.css'

const AdminViewPost = ({postId}) => {

    let [msg, setMsg] = useState('')
    let [row, setRow] = useState([])

    const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"];

    useEffect(async()=>{
        var {data} = await axios.post('http://localhost:8000/admin/posts/show_post', {post_id: postId})

        console.log("data",data)
        if (data.isLog) {
            if (data.success) {
                setRow(data.data)
                setMsg(data.msg)
            }else{
                setMsg(data.msg)
            }
        }else{
            setMsg(data.msg)
        }
    }, [])
    return(
        <Fragment>
            <h1>Post Overview</h1>
            {
                 msg.length > 0 ? <p className='common-error-msg'>{msg}</p> : <></>
            }
            <section class="blog" data-scroll-index="4">
        <div class="container">
          <div class="row">
           {
             row.map((item) => {

              let post_date = item.post_date
              let splitted_date = post_date.split('/')
              let month = parseInt(splitted_date[1])
              console.log("sdfsa", splitted_date)
              return(

                 <div class="col-md-6 col-lg-4">
                  <div class="item">
                    <div class="img">
                      <img src={item.image} alt=""/>
                    </div>
                    <div class="info">
                      <div class="date">
                        <span>{splitted_date[2]}<br/> {monthNames[month-1].substr(0,3)}</span>
                      </div>
                      <a href=""><h5>{item.title}</h5></a>
                      <p>{item.description}</p>
                      <a href="#0" class="user"><i class="fas fa-user"></i>Admin</a>
                      <a href="#0" class="more"><i class="fas fa-long-arrow-alt-right"></i></a>
                    </div>
                  </div>
                </div>

               )
             })
           }

            {/* <div class="col-md-6 col-lg-4">
                <div class="item">
                  <div class="img">
                    <img src="https://i.ibb.co/m5yGbdR/blog2.jpg" alt=""/>
                  </div>
                  <div class="info">
                    <div class="date">
                      <span>19 <br/> Dec</span>
                    </div>
                    <a href=""><h5>Lorem Ipsum is simply dummy</h5></a>
                    <p>Lorem ipsum dolor sit amet conse ctetur, adipi sicing elit. Nisi sapiente hic fugiat delectus dicta delectus dicta.</p>
                    <a href="#0" class="user"><i class="fas fa-user"></i>Admin</a>
                    <a href="#0" class="more"><i class="fas fa-long-arrow-alt-right"></i></a>
                  </div>
                </div>
              </div>

              <div class="col-md-6 col-lg-4">
                <div class="item">
                  <div class="img">
                    <img src="https://i.ibb.co/YXV3zmh/blog3.jpg" alt=""/>
                  </div>
                  <div class="info">
                    <div class="date">
                      <span>25 <br/> Dec</span>
                    </div>
                    <a href=""><h5>Lorem Ipsum is simply dummy</h5></a>
                    <p>Lorem ipsum dolor sit amet conse ctetur, adipi sicing elit. Nisi sapiente hic fugiat delectus dicta delectus dicta.</p>
                    <a href="#0" class="user"><i class="fas fa-user"></i>Admin</a>
                    <a href="#0" class="more"><i class="fas fa-long-arrow-alt-right"></i></a>
                  </div>
                </div>
              </div> */}
          </div>
        </div>
      </section>

        </Fragment>
    )
}

export default AdminViewPost