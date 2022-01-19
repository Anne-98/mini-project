const express = require('express')
const bodyParser = require('body-parser')
const {loginCustomer, findExistUser} = require('./../database/customerDB')
const {signInCustomer} = require('./../database/customerDB')
const postRoute = require('./postRoute')
const indirectOrdersRoute = require('./indirectOrderRoute')
const directOrderRoute = require('./directOrderRoute')
const customerProfileRoute = require('./customerProfileRoute')
const customerOrderHistoryRoute = require('./customerOrderHistoryRoute')

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
    var {name, password, email, address, question, contact_num} = req.body

    
    if (!req.session.isLog) {
        const data = await findExistUser(email)

        if (data.exist == true) {
            req.session.isLog = false
            req.session.user_id = null
            res.json({exist: true, msg:"You already have an account"})
        }else{
            
            const dataSet = await signInCustomer(name, password, email, address, question, contact_num)

            if (dataSet.length > 0) {
                req.session.isLog = true
                req.session.user_id = dataSet[0].cake_makers_id
                res.json({exist: false, success: true, data: dataSet, msg:"Successfully created", isLog: req.session.isLog})
            }else{
                req.session.isLog = false
                req.session.user_id = null
                res.json({exist: false, success: false, msg: "Something went wrong", isLog: req.session.isLog})
            }
    }
    
}else{
    res.json({exist:true, success:false, msg:"You are already Logged In", isLog: true})
}
})

customerRoute.use('/posts', postRoute)
customerRoute.use('/indirect_orders', indirectOrdersRoute)
customerRoute.use('/direct_orders', directOrderRoute)
customerRoute.use('/profile', customerProfileRoute)
customerRoute.use('/orders', customerOrderHistoryRoute)

module.exports = customerRoute
