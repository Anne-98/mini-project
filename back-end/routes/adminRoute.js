const express = require('express')
const bodyParser = require('body-parser')
const {loginAdmin, findExistUser} = require('./../database/adminDB')
const {signInAdmin} = require('./../database/adminDB')

const adminRoute = express.Router()
adminRoute.use(bodyParser.json())

adminRoute.get('/login', async(req, res) => {
    var email = 'anne@gmail.com'
    var password = '1234'

    const data = await loginAdmin(email, password)

    if (data.length > 0) {
        res.json({success: true, data, msg: "Successfully logged"})
    }else{
        res.json({success: false, msg: "Invalid credentials"})
    }
})

adminRoute.get('/signin', async(req, res) => {
    var email = 'anne@gmail.com'
    var password = '1234'
    var name = 'anne'

    const data = await findExistUser(email)
    
    if (data.length > 0) {
        res.json({exist: true, msg:"You already have an account"})
    }else{
        const dataSet = await signInAdmin(name,email, password)
                
        if (dataSet.affectedRows > 0) {
            res.json({exist: false, success: true, data: dataSet, msg:"Successfully created"})
        }else{
            res.json({exist: false, success: false, msg: "Something went wrong"})
        }
    }
    
})

adminRoute.get('/logout', (req, res) => {
    req.session.isLog = false
    req.session.user_id = null
    res.json({msg: "successfully logged out", isLog: req.session.isLog})
})


module.exports = adminRoute
