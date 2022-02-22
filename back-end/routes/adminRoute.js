const express = require('express')
const bodyParser = require('body-parser')
const {loginAdmin, findExistUser, getAllCustomers, monthlyOrders, adminWarn} = require('./../database/adminDB')
const {signInAdmin} = require('./../database/adminDB')
const postRoute = require('./postRoute')
const cakeMakersAllOrdersRoute = require('./cakeMakersAllOrdersRoute')


const adminRoute = express.Router()
adminRoute.use(bodyParser.json())

adminRoute.post('/login', async(req, res) => {
    // var email = 'anne@gmail.com'
    // var password = '1234'
    var {email, password} = req.body

    if (!req.session.isLog) {
        const data = await loginAdmin(email, password)

        if (data.length > 0) {
            req.session.isLog = true
            var admin = data[0].admin_id
            req.session.user_id = admin
            res.json({success: true, data, msg: "Successfully logged",isLog: true})
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
        res.json({success:false, msg: "You have already Logged In",isLog: true})
    }
})

adminRoute.post('/signin', async(req, res) => {
    // var email = 'anne@gmail.com'
    // var password = '1234'
    // var name = 'anne'

    var {name,email, password} = req.body

    console.log(name,email, password)
    if (!req.session.isLog) {
        const data = await findExistUser(email)
    console.log("findExist: ",data)
        if (data.length > 0) {
            res.json({exist: true, msg:"You already have an account"})
        }else{
            
            const dataSet = await signInAdmin(name, email, password)

            if (dataSet.length > 0) {
                req.session.isLog = true
                req.session.user_id = dataSet[0].admin_id
                res.json({exist: false, success: true, data: dataSet, msg:"Successfully created", isLog: true})
            }else{
                req.session.isLog = false
                req.session.user_id = null
                res.json({exist: false, success: false, msg: "Something went wrong", isLog: false})
            }
        }
    }else{
        res.json({exist:true, success:false, msg:"You are already Logged In", isLog: true})
    }
    
})

adminRoute.post('/customer_details', async(req, res) => {
    if (req.session.isLog) {

        var data = await getAllCustomers()
        if (data.length > 0) {
            res.json({isLog:true, msg:"All data fetched successfully", success:true, data})
        }else{
            
            res.json({isLog:true, msg:"Something went wrong", success:false})
        }
    }else{
        res.json({isLog:false, msg:"You are not Logged In"})
    }
})
adminRoute.post('/monthly_orders', async(req, res) => {
    if (req.session.isLog) {

        var data = await monthlyOrders()
        if (data.length > 0) {
            res.json({isLog:true, msg:"All data fetched successfully", success:true, data})
        }else{
            
            res.json({isLog:true, msg:"Something went wrong", success:false})
        }
    }else{
        res.json({isLog:false, msg:"You are not Logged In"})
    }
})

adminRoute.post('/warn', async(req, res) => {
    if (req.session.isLog) {
        var warn = req.body.warn
        var cake_makers_id = req.body.cake_makers_id

        var data = await adminWarn(warn, cake_makers_id)
        if (data.affectedRows > 0) {
                res.json({isLog:true, msg:"Warning sent", success:true})
        }else{
            
            res.json({isLog:true, msg:"Something went wrong", success:false})
        }
    }else{
        res.json({isLog:false, msg:"You are not Logged In"})
    }
})

adminRoute.use('/posts', postRoute)
adminRoute.use('/all_orders', cakeMakersAllOrdersRoute)

module.exports = adminRoute
