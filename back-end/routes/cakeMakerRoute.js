const express = require('express')
const bodyParser = require('body-parser')
const {loginCakeMaker, findExistCakeMaker} = require('./../database/CakeMakerDB')
const {signInCakeMaker} = require('./../database/CakeMakerDB')
const designRoute = require('./designRoute')
const postRoute = require('./postRoute')
const cakeMakerProfileRoute = require('./cakeMakerProfileRoute')
const cakeMakersAllOrdersRoute = require('./cakeMakersAllOrdersRoute')
const cakeMakerOrdersConfirmedRoute = require('./cakeMakerOrdersConfirmedRoute')
const cakemakersOrdersResponseRoute = require('./cakemakersOrdersResponseRoute')
const displayOneOrderDetailsRoute = require('./displayOneOrderDetailsRoute')
const cakeMakerAllProfiles = require('./cakemakersAllPrfilesRoute')


const cakeMakerRoute = express.Router()
cakeMakerRoute.use(bodyParser.json())

cakeMakerRoute.post('/login', async(req, res) => {
    // var email = 'ss@gmail.com'
    // var password = '1234'
    var email = req.body.cakemaker_email
    var password = req.body.cakemaker_password

    console.log(req.session)
    
    if (!req.session.isLog) {
        const data = await loginCakeMaker(email, password)

        if (data.length > 0) {
            console.log(data[0].cake_makers_id)
            req.session.isLog = true
            var cake_makers = data[0].cake_makers_id
            req.session.user_id = cake_makers
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
        res.json({success:false, msg: "You have already Logged In",isLog: true})
    }
})

cakeMakerRoute.post('/signin', async(req, res) => {

    var {name, password, email, district, qualifications, contact_num, brandName, facebook, instagram, twitter} = req.body

    console.log(req.body)

    var imageFile = req.files.file_1
    var best_projectFile = req.files.file_2

    if (!req.session.isLog) {
        const data = await findExistCakeMaker(email)

        if (data.length > 0) {
            req.session.isLog = false
            req.session.user_id = null
            res.json({exist: true, msg:"This email has an account already", success:false})
        }else{
            
            const dataSet = await signInCakeMaker(name, password, email, district, qualifications, contact_num, brandName, facebook, instagram, twitter, imageFile, best_projectFile)

            if (dataSet.length > 0) {
                req.session.isLog = true
                req.session.user_id = dataSet[0].cake_makers_id
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
cakeMakerRoute.use('/designs', designRoute)

cakeMakerRoute.use('/createpost', postRoute)

cakeMakerRoute.use('/posts', postRoute)

cakeMakerRoute.use('/orders', cakeMakersAllOrdersRoute)

cakeMakerRoute.use('/profile', cakeMakerProfileRoute)
cakeMakerRoute.use('/order', cakemakersOrdersResponseRoute)
cakeMakerRoute.use('/confirmed', cakeMakerOrdersConfirmedRoute)
cakeMakerRoute.use("/one_order", displayOneOrderDetailsRoute)
cakeMakerRoute.use("/allprofiles", cakeMakerAllProfiles)
cakeMakerRoute.use('/cakemaker_designs', designRoute)

module.exports = cakeMakerRoute