const express = require('express')
const bodyParser = require('body-parser')
const {login} = require('./../database/loginDB')

const indexRoute = express.Router()

indexRoute.use(bodyParser.json())

indexRoute.get('/home', async(req,res)=>{

    var email = 'ant@gmail.com'
    var name = 'ant'
    var password = '1234'

    const data = await login(email, password)
    res.send(data)
})

module.exports = indexRoute