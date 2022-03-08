import React, { Fragment, useEffect, useState } from "react";
import './../../css/Common/ChatList.css';
import ChatContainer from "./ChatContainer";
import axios from 'axios';
import profile from'./../../images/profiles/6.jpg';

const ChatList = () => {

    const type = localStorage.getItem('type')
    const userId = localStorage.getItem('userId')
    var [allChats, setAllChats] = useState([])
    var [cake_makers_id, setCakeMakersId] = useState('')
    var [clickedId, setClickedId] = useState('')
    var [cus_id, setCusId] = useState('')

    useEffect(async()=>{
      if (type == 'customer') {
        var {data} = await axios.get('http://localhost:8000/cakemaker/allprofiles/cakemakers')
        setAllChats(data.data)
        console.log("all chats: ",allChats)
      }else if(type == 'cakemaker'){
        var {data} = await axios.post('http://localhost:8000/general/chat/available_chats', {userId})
        setAllChats(data.data)
        console.log("all chats: ",data)
      }
    },[])

    return(
        <Fragment>
            <h1 className="common-header text-center" style={{zIndex:"3"}}>Chat with {type == 'cakemaker' ? <span>your customers</span> : <span>a Cake Maker</span>}</h1>
  <div className="chatlist-container clearfix row">

    <div className="chatlist-people-list col-md-4" id="people-list">
      <div className="chatlist-search row">
        <input className="form-control col-11" style={{background:"transparent", borderBottom:"2px solid #b89472", width:"80%", padding:"5px"}} type="search" placeholder="Search" aria-label="Search"/>
        <button className="btn col-1 chatlist-search-icon" style={{border:"2px solid #b89472"}}><i style={{color:"#b89472"}} aria-label="Search" className="fas fa-search"></i></button>
      </div>

       <ul className="chatlist-list">
        
        { type == 'customer' ? 
          allChats.map((item) => {
            return(
            <li className="chatlist-list-container row" onClick={(e) => {setClickedId(item.cake_makers_id)}}>
              <img src={item.profile_picture} alt="avatar"  className="col-3 col-lg-2 chatlist-list-img" />
              <div className="chatlist-about col-9 col-lg-10">
                <div className="chatlist-name">{item.name}</div>
                {/* <div className="chatlist-status">
                  <i className="fa fa-circle online" style={{fontSize:"8px"}}></i> <p>online</p>
                </div> */}
              </div>
            </li>
            )
          }) :
           allChats.map((item) => {
            return(
            <li className="chatlist-list-container row" onClick={(e) => {setClickedId(item.cus_id)}}>
              <img src={profile} alt="avatar"  className="col-3 col-lg-2 chatlist-list-img" />
              <div className="chatlist-about col-9 col-lg-10">
                <div className="chatlist-name">{item.cus_name}</div>
                {/* <div className="chatlist-status">
                  <i className="fa fa-circle online" style={{fontSize:"8px"}}></i> <p>online</p>
                </div> */}
              </div>
            </li>
            )
          })
        }
      </ul> 
    </div>
    {console.log("cake_makers_id", cake_makers_id, cus_id)
  }
      <ChatContainer clickedId={clickedId} />
  </div> 
        </Fragment>
    )
}

export default ChatList