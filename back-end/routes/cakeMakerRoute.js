const express = require('express')
const bodyParser = require('body-parser')
const {loginCakeMaker, findExistCakeMaker} = require('./../database/CakeMakerDB')
const {signInCakeMaker} = require('./../database/CakeMakerDB')
const designRoute = require('./designRoute')


const cakeMakerRoute = express.Router()
cakeMakerRoute.use(bodyParser.json())

cakeMakerRoute.get('/login', async(req, res) => {
    var email = 's@gmail.com'
    var password = '1234'

    console.log(req.session)
    
    const data = await loginCakeMaker(email, password)
    if (data.length > 0) {
        console.log(data[0].cake_makers_id)
        req.session.isLog = true
        var cake_makers = data[0].cake_makers_id
        req.session.user_id = cake_makers
        console.log(req.session)
        res.json({success: true, data, msg: "Successfully logged"})
    }else{
        req.session.isLog = false
        req.session.user_id = null
        res.json({success: false, msg: "Invalid credentials"})
    }
})

cakeMakerRoute.post('/signin', async(req, res) => {

    var name = 'shamalka'
    var password = '1234'
    var email = 's@gmail.com'
    var district = 'galle'
    var qualifications = 'dfajksdhfakldfhlkdf'
    var contact_num = 0112255455
    var brand_name = 'sha'
    var facebook = 'kjhafsadfhlsadfks'
    var instagram = 'lakhfalkdf'
    var twitter = 'alkdfalkdsjf'

    var imageFile = req.files.file

    const data = await findExistCakeMaker(email)

    if (data.length > 0) {
        req.session.isLog = false
        req.session.user_id = null
        res.json({exist: true, msg:"You already have an account"})
    }else{
        
        const dataSet = await signInCakeMaker(name, password, email, district, qualifications, contact_num, brand_name, facebook, instagram, twitter, imageFile)

        console.log(dataSet)

        if (dataSet.length > 0) {
            req.session.isLog = true
            req.session.user_id = data[0].cake_makers_id
            res.json({exist: false, success: true, data: dataSet, msg:"Successfully created", isLog: req.session.isLog})
        }else{
            req.session.isLog = false
            req.session.user_id = null
            res.json({exist: false, success: false, msg: "Something went wrong", isLog: req.session.isLog})
        }
    }
    
})
cakeMakerRoute.use('/designs', designRoute)
cakeMakerRoute.get('/logout', (req, res) => {
    req.session.isLog = false
    req.session.user_id = null
    res.json({msg: "successfully logged out", isLog: req.session.isLog})
})

module.exports = cakeMakerRoute