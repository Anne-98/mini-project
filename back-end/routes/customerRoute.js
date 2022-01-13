const express = require('express')
const bodyParser = require('body-parser')
const {loginCustomer, findExistUser} = require('./../database/customerDB')
const {signInCustomer} = require('./../database/customerDB')
const postRoute = require('./postRoute')
const indirectOrdersRoute = require('./indirectOrderRoute')
const directOrderRoute = require('./directOrderRoute')

const customerRoute = express.Router()
customerRoute.use(bodyParser.json())

customerRoute.post('/login', async(req, res) => {
    // var email = 'anne@gmail.com'
    // var password = '1234'

    var email = req.body.customer_email
    var password = req.body.customer_password

    console.log(req.session)
    
    if (!req.session.isLog) {
        const data = await loginCustomer(email, password)
        console.log(data)
        if (data.length > 0) {
            req.session.isLog = true
            req.session.user_id = data[0].cus_id
            console.log(req.session)
            res.json({success: true, data, msg: "Successfully logged", isLog: true})
        }else if (data.exist ==  false) {
            req.session.isLog = false
            req.session.user_id = null
            res.json({success: false, msg: "This Email doesn't exist", isLog: false})
        }else{
            req.session.isLog = false
            req.session.user_id = null
            res.json({success: false, msg: "Invalid credentials", isLog: false})
        }
    }else{
        res.json({success:false, msg:"You have already Logged In"})
    }
})

customerRoute.post('/signin', async(req, res) => {
    var email = 'anne@gmail.com'
    var password = '1234'
    var name = 'anne'
    var address = '150/C, Bolawalana ,Katunayake'
    var question = 'wulfy'
    var contact_num = 0172244111

    const data = await findExistUser(email)
    
    if (data.length > 0) {
        res.json({exist: true, msg:"You already have an account"})
    }else{
        const dataSet = await signInCustomer(name, password, email, address, question, contact_num)
                
        if (dataSet.affectedRows > 0) {
            req.session.isLog = false
            req.session.user_id = dataSet[0].cus_id
            res.json({exist: false, success: true, msg:"Successfully created", data: dataSet})
        }else{
            res.json({exist: false, success: false, msg: "Something went wrong"})
        }
    }
    
})

customerRoute.use('/posts', postRoute)
customerRoute.use('/indirect_orders', indirectOrdersRoute)
customerRoute.use('/direct_orders', directOrderRoute)

module.exports = customerRoute
