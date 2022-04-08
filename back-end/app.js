const express = require('express')
const cors = require('cors')
const socket = require('socket.io')
const bodyParser = require('body-parser')
const indexRoute = require('./routes/indexRoute')
const customerRoute = require('./routes/customerRoute')
const cakeMakerRoute = require('./routes/cakeMakerRoute')
const adminRoute = require('./routes/adminRoute')
const fileupload = require('express-fileupload')
const path = require('path')
const session = require('express-session')
const designRoute = require('./routes/designRoute')
const generalRoute = require('./routes/generalRoute')
const { isObject } = require('util')
const port = process.env.PORT || 8000;

const app = express()

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(session({
  secret: 'sakjfhashflk',
  saveUninitialized: true,
  cookie: {maxAge: 60*60*24*1000},
  resave: true
}))

app.use(cors({
  credentials:true,
  origin: 'http://localhost:3000',
  methods: ['get','post']
}))
app.use(express.json())

app.use(bodyParser.urlencoded({extended: true}))
app.use(fileupload())
app.use('/public',express.static(__dirname + '/public'))


app.use('/', indexRoute)
app.use('/customer', customerRoute)
app.use('/cakemaker', cakeMakerRoute)
app.use('/admin', adminRoute)
app.use('/general', generalRoute)

// chat.....................................
// io = socket(server)
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const { chatUpdate } = require('./database/chatDB')
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"]
  }
});

io.on('connection', (socket)=>{

  socket.on("send_message",async (data) => {
    
      var chat_history = JSON.stringify(data.history)
      var recieverId = data.recieverId
      var senderId = data.senderId
      let type = data.type
    
      var dataSet = await chatUpdate(chat_history, recieverId, senderId, type)

      console.log("dataSet: ", dataSet)
      socket.broadcast.emit("receive_message", dataSet);  
    
    })

  // socket.on('save_message_list', async(data) =>{
      // var chat_history = JSON.stringify(data.history)
      // var recieverId = data.recieverId
      // var senderId = data.senderId
    
      // var dataSet = await chatUpdate(chat_history, recieverId, senderId)

      // socket.broadcast.emit("receive_message", dataSet);

      
      //   console.log("data: ", dataSet)
  // })
  
  socket.on('disconnect', ()=>{
    console.log("User disconnected")
  })
})

// app.get('/', (req, res) => {
//   res.sendFile(__dirname + '/index.html');
// });

// io.on('connection', (socket) => {
//   console.log('a user connected');
// });

// chat.....................................

server.listen(port, (error) =>{
  if (error) {
    console.log("Server Error")
  }
  console.log("Server successfully created..!", `Listening on port ${port}`)
})
