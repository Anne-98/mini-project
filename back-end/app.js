const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const indexRoute = require('./routes/indexRoute')
const customerRoute = require('./routes/customerRoute')
const cakeMakerRoute = require('./routes/cakeMakerRoute')
const adminRoute = require('./routes/adminRoute')
const fileupload = require('express-fileupload')
const path = require('path')
const session = require('express-session')
const designRoute = require('./routes/designRoute')

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
app.use(bodyParser.urlencoded({extended: true}))
app.use(fileupload())
app.use('/public',express.static(__dirname + '/public'))

app.use('/', indexRoute)
app.use('/customer', customerRoute)
app.use('/cakemaker', cakeMakerRoute)
app.use('/admin', adminRoute)

app.listen(8000, (error) =>{
  if (error) {
    console.log("Server Error")
  }
  console.log("Server successfully created..!")
})