// import React, {useEffect, useState} from 'react';
// import io from 'socket.io-client';
// import './../../css/Common/Chat.css';

// var socket;
// var CONNECTION_PORT = 'localhost:8000/';

// const Chat = () => {

//   // before login
//   const [loggedIn, setLoggedIn] = useState(false);
//   const [room, setRoom] = useState('');
//   const [userName, setUserName] = useState('');
  
//   // after login
//   const [message, setMessage] = useState('');
//   const [messageList, setMessageList] = useState([]);

//   useEffect(()=>{
//     socket = io(CONNECTION_PORT)
//     console.log("socket: ", socket)
//   },[CONNECTION_PORT])

//   useEffect(()=>{
//     socket.on("receive_message", (data) => {
//       setMessageList([...messageList,data])
//     })
//   })
  
//   console.log("set message list: ", messageList)

//   const connectToRoom = () => {
//     setLoggedIn(true)
//     socket.emit('join_room', room)
//   }

//   const sendMessage = async() => {
//     let messageContent = {
//       room: room, 
//       content: {
//         author: userName,
//         message: message
//       }
//     }
//     await socket.emit("send_message", messageContent)
//     setMessageList([...messageList, messageContent.content])
//     setMessage("")
//   }

//   // key board..................
//   // const onChange = (input) => {
//   //   console.log("Input changed", input);
//   // }

//   // const onKeyPress = (button) => {
//   //   console.log("Button pressed", button);
//   // }

//   return(
//     <div className=''>
//       <h1 className='common-header text-center' style={{zIndex:"3"}}>Chat App</h1>
//       <div className='chat-wrapper'>
//         {
//         ! loggedIn ? (
          
//           <div className='logIn'>
//             <div className='chat-input'>
//               <input type="text" placeholder="Name..." onChange={(e)=>{setUserName(e.target.value)}}/>
//               <input type="text" placeholder="Room..." onChange={(e)=>{setRoom(e.target.value)}}/>
//             </div>
//             <div className='chat-btn'>
//               <button onClick={connectToRoom} className='btn signin-submit-button'>Enter Chat</button>
//             </div>
//           </div>
//         ) : (
//           <div className='chat-message-container'>
//             <div className='chat-messages'>
//               {
//               messageList.map((item) => {
//                 return(
//                     <div className='justify-content-right text-right' id={item.author == userName ? "you" : "other"}>
//                     <p className="chat-body">{item.message}</p>
//                     <p className='text-muted font-weight-light' style={{fontSize:"10px", paddingLeft:"5px"}}>{item.author}</p>
//                     </div>
//                 )
//               })
//               }
//             </div>
//             {/* <div className='chat-message-input row '>
//               <input type="text" placeholder='Messages...' className='col-10'/>
//               <button  className='btn col-2'>Send</button>
//             </div> */}
//             <div className="input-group mb-3 chat-message-input">
//               <input type="text" className="form-control" placeholder="Messages..." aria-label="Messages..." onChange={(e)=>{setMessage(e.target.value)}}/>
//               {/* <Keyboard
//                 onChange={onChange}
//                 onKeyPress={onKeyPress}
//               /> */}
//               <div className="input-group-append ">
//                 <button className="btn chat-send-btn" onClick={sendMessage} type="submit"><i className="fas fa-paper-plane" style={{transform:"rotate(45deg)"}}></i></button>
//               </div>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   )
// }

// export default Chat;
