// import React, { useState } from 'react';
// import './../../css/Common/MessageInput.css';

// const MessageInput = ({socket}) => {
  
//   const [value, setValue] = useState('');

//   const submitForm = (e) => {
//     e.preventDefault();
//     socket.emit('message', value);
//     setValue('');
//   };

//   return (
//     <form onSubmit={submitForm} className="messageInput-form">
//       <input
//         autoFocus
//         value={value}
//         placeholder="Type your message"
//         onChange={(e) => {
//           setValue(e.currentTarget.value);
//         }}
//         className="messageInput-input"
//       />
//     </form>
//   );
// };

// export default MessageInput;