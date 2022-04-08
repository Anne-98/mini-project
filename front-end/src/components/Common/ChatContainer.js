import axios from "axios";
import React, { Fragment, useEffect, useState } from "react";
import io, { Socket } from 'socket.io-client';


var socket;
var CONNECTION_PORT = 'localhost:8000/';
socket = io(CONNECTION_PORT);

const ChatContainer = ({clickedId, clickedName}) => {
  
  const [message, setMessage] = useState('')
  const [messageList, setMessageList] = useState([]);
  var type = localStorage.getItem('type')
  var userId = localStorage.getItem('userId');

  // fetch chat history................................
  
  useEffect(async()=>{
    var {data} = await axios.post('http://localhost:8000/general/chat/clicked_chat', {userId, clickedId, type})
    var messages = JSON.parse(data.data[0].chat_history)
    
    setMessageList(messages)

    socket.on("receive_message", (data) => {
      var dataSet = JSON.parse(data)
      setMessageList([...messageList, dataSet.chat_history])
      console.log("variable: ", messageList.length)
    })
  }, [clickedId])
  
  
    const sendMessage = async() => {

      var time = new Date();
      const formattedTime = time.toLocaleString("en-US", { hour: "numeric", minute: "numeric" });

      let messageContent = {
        content: {
          author: userId,
          message: message, 
          time: formattedTime,
          type: type
        }
      }

      var history = [...messageList, messageContent.content]
      
      socket.emit("send_message",  {history, recieverId: clickedId, senderId:userId, type})

      setMessageList(history)
      
      // var {data} = await axios.post('http://localhost:8000/general/chat/chat_update', {chat_history:messageList, cake_makers_id:clickedId, cus_id:userId})

      // socket.emit('save_message_list', {history, recieverId: clickedId, senderId:userId})

      setMessage("")
  }

  const getAlert = () =>{
    alert("hiiiiiiii")
  }
    return(
        <Fragment>
          {/* <h1>{clickedName}</h1> */}
              <div className="chatlist-chat col-md-8">
      <div className="chatlist-chat-header clearfix row">
        <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/195612/chat_avatar_01_green.jpg" alt="avatar"  className="col-3 col-lg-1" />
        
        <div className="chatlist-chat-about col-9 col-lg-11">
          <div className="chatlist-chat-with">Chat with Vincent Porter</div>
          <div className="chatlist-chat-num-messages">already 1 902 messages</div>
        </div>
      </div>  
      
      <div className="chatlist-chat-history">
        <ul>
          {/* <li className="clearfix">
            <div className="chatlist-message-data align-right">
              <span className="chatlist-message-data-time" >10:10 AM, Today</span> &nbsp; &nbsp;
              <span className="chatlist-message-data-name" >Olia</span> <i className="fa fa-circle me"></i>
              
            </div>
            <div className="chatlist-message chatlist-other-message float-right">
              Hi Vincent, how are you? How is the project coming along?
            </div>
          </li>
          
          <li>
            <div className="chatlist-message-data">
              <span className="chatlist-message-data-name"><i className="fa fa-circle online"></i> Vincent</span>
              <span className="chatlist-message-data-time">10:12 AM, Today</span>
            </div>
            <div className="chatlist-message chatlist-my-message">
              Are we meeting today? Project has been already finished and I have results to show you.
            </div>
          </li> */}
          {
            messageList.map((item) => {
              return(
                <li className="row" style={{float: item.type == type ? 'right' : 'left'}}>
                  <div className="chatlist-message-data" >
                    <span className="chatlist-message-data-name"><i className="fa fa-circle online"></i> {item.type == type ? 'you' : clickedName}</span>
                    <span className="chatlist-message-data-time">{item.time}</span>
                  </div>
                    <i class="fas fa-caret-up"></i>
                  <div className="chatlist-message chatlist-my-message" style={{background: item.type == type ? '#b89472' : '#deb495'}}>
                    {item.message}
                  </div>
                </li>
              )
            })
          }
          
          {/* <li className="clearfix">
            <div className="chatlist-message-data align-right">
              <span className="chatlist-message-data-time" >10:14 AM, Today</span> &nbsp; &nbsp;
              <span className="chatlist-message-data-name" >Olia</span> <i className="fa fa-circle me"></i>
              
            </div>
            <div className="chatlist-message chatlist-other-message float-right">
              Well I am not sure. The rest of the team is not here yet. Maybe in an hour or so? Have you faced any problems at the last phase of the project?
            </div>
          </li>
          
          <li>
            <div className="chatlist-message-data">
              <span className="chatlist-message-data-name"><i className="fa fa-circle online"></i> Vincent</span>
              <span className="chatlist-message-data-time">10:20 AM, Today</span>
            </div>
            <div className="chatlist-message chatlist-my-message">
              Actually everything was fine. I'm very excited to show this to our team.
            </div>
          </li> */}
          
          {/* <li>
            <div className="chatlist-message-data">
              <span className="chatlist-message-data-name"><i className="fa fa-circle online"></i> Vincent</span>
              <span className="chatlist-message-data-time">10:31 AM, Today</span>
            </div>
            <i className="fa fa-circle online"></i>
            <i className="fa fa-circle online" style={{color:"#AED2A6"}}></i>
            <i className="fa fa-circle online" style={{color:"#DAE9DA"}}></i>
          </li> */}
          
        </ul>
        
      </div> 
      
      {/* <div className="chatlist-chat-message clearfix">
        <textarea name="message-to-send" id="message-to-send" placeholder ="Type your message" rows="3"></textarea>
                
        <i className="fa fa-file-o"></i> &nbsp;&nbsp;&nbsp;
        <i className="fa fa-file-image-o"></i>
        
        <button>Send</button>

      </div>  */}

      <div className="input-group mb-3 chat-message-input">
              <input type="text" className="form-control" placeholder="Messages..." aria-label="Messages..." onChange={(e)=>{setMessage(e.target.value)}}/>
              {/* <Keyboard
                onChange={onChange}
                onKeyPress={onKeyPress}
              /> */}
              <div className="input-group-append ">
                <button className="btn chat-send-btn" onClick={sendMessage} type="submit"><i className="fas fa-paper-plane" style={{transform:"rotate(45deg)"}}></i></button>
              </div>
            </div>
          </div>
        </Fragment>
    )
}

export default ChatContainer