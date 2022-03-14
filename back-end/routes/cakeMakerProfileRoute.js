const express = require('express')
const bodyParser = require('body-parser')
const { getCakeMakerProfile, updateCakeMakerProfile } = require('../database/cakeMakerProfileDB')

const cakeMakerProfileRoute = express.Router()

cakeMakerProfileRoute.use(bodyParser.json(true))

cakeMakerProfileRoute.post('/myprofile',async(req, res) => {

    var cake_makers_id = req.body.cake_makers_id
    console.log("cake_makers_id: ",cake_makers_id)

    // if (req.session.isLog) {
        var data = await getCakeMakerProfile(cake_makers_id)

        if (data.length > 0) {
            res.json({data, msg:"Data successfully fetched into the profile page", isLog:true, success: true})
        }else{
            res.json({msg:"Something went wrong", exist: false, success:false, isLog:true})
        }
    // }else{
    //     res.json({isLog: false, msg: 'You are not logged In'})
    // }
})

cakeMakerProfileRoute.post('/updateprofile', async(req, res) => {
    if (req.session.isLog) {

        var {name, district, qualifications, contact_num, brandName, facebook, instagram, twitter} = req.body

        if (req.files != undefined) {
            var imageFile = req.files.file
        }else{
            var imageFile = {name: ''}
        }
console.log("imageFile:", imageFile)
        var cake_makers_id = req.session.user_id

        // console.log("successfully data came to back-end :",imageFile)
// brandName,
        var data = await updateCakeMakerProfile(name, district, qualifications, contact_num, brandName, facebook, instagram, twitter, imageFile, cake_makers_id)
        // console.log('data.changedRows: ',data.changedRows)
        // console.log(name, district, qualifications, contact_num, brandName, facebook, instagram, twitter, imageFile, cake_makers_id)

        console.log("cakeMakerProfileRoue",data)
        if (data.changedRows > 0) {
            res.json({success: true, msg: "Successfully updated", isLog: true})
        }else{
            res.json({success:false, isLog: true, msg:"Data type or content doesn't match to the database"})
        }
    }else{
        res.json({isLog: false, msg:"You are not logged In"})
    }
})

module.exports = cakeMakerProfileRoute