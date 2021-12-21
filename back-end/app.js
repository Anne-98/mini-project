const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const indexRoute = require('./routes/indexRoute')

const app = express()

app.use(cors())

app.use('/', indexRoute)

app.listen(8000, (error) =>{
  if (error) {
    console.log("Server Error")
  }
  console.log("Server successfully created..!")
})