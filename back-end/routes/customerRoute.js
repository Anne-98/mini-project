const express = require('express')
const bodyParser = require('body-parser')
const {loginCustomer, findExistUser} = require('./../database/customerDB')
const {signInCustomer} = require('./../database/customerDB')
const postRoute = require('./postRoute')
const indirectOrdersRoute = require('./indirectOrderRoute')
const directOrderRoute = require('./directOrderRoute')

const customerRoute = express.Router()
customerRoute.use(bodyParser.json())

customerRoute.get('/login', async(req, res) => {
    var email = 'anne@gmail.com'
    var password = '1234'

    console.log(req.session)
    const data = await loginCustomer(email, password)
    
    if (data.length > 0) {
        req.session.isLog = true
        req.session.user_id = data[0].cus_id
        console.log(req.session)
        res.json({success: true, data, msg: "Successfully logged", isLog: true})
    }else{
        req.session.isLog = false
        req.session.user_id = null
        res.json({success: false, msg: "Invalid credentials", isLog: false})
    }
})

customerRoute.get('/signin', async(req, res) => {
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

customerRoute.get('/logout', (req, res) => {
    req.session.isLog = false
    req.session.user_id = null
    res.json({msg: "successfully logged out", isLog: req.session.isLog})
})

customerRoute.use('/posts', postRoute)
customerRoute.use('/indirect_orders', indirectOrdersRoute)
customerRoute.use('/direct_orders', directOrderRoute)

module.exports = customerRoute
