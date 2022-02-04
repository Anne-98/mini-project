const express = require('express')
const { insertDesign, getCakemakerDesigns, getOneDesignDetails, updateDesigns } = require('../database/designDB')

const designRoute = express.Router()

designRoute.post('/insert', async(req, res) => {

    var cake_makers_id = req.session.user_id
    var {title, description, category, price} = req.body
    var imageFile = req.files.file

    console.log(imageFile)
    if (req.session.isLog == true) {
        var data = await insertDesign(title, description, imageFile, category, price, cake_makers_id)

        console.log(data)
        if (data.affectedRows > 0) {
            res.json({success: true, msg: "Successfully added a new design", isLog: true})
        }else{
            res.json({success: false, msg: "Some data are missing", isLog: true})
        }
    }else{
        res.json({logged: false, msg:"You are not logged In", isLog: false})
    }
})

designRoute.post('/get_cakemaker_designs',async(req, res) => {
    var cake_makers_id = req.body.cake_makers_id
    // var cake_makers_id = 'ec5395ff-8dd0-44a4-bc2f-4ece9744327e'
    let data = await getCakemakerDesigns(cake_makers_id)

    if (data.length > 0) {
        res.json({msg: "Design details successfully fetched", data, sucess: true})
    }else{
        res.json({msg: "Something went wrong", sucess: false})

    }
})

designRoute.post('/design_details', async(req, res) => {

    var design_id = req.body.design_id

    var data = await getOneDesignDetails(design_id)

    if (data.length > 0) {
        res.json({msg:"Data Successfully fetched", success:true, data})
    }else{
        res.json({msg:"Something went wrong", success:false})

    }
})

designRoute.post('/design', async(req, res) => {

    var {title, description, category, price, design_id} = req.body

    if (req.files != undefined) {
        var imageFile = req.files.file
    }else{
        var imageFile = {name: ''}
    }

    if (req.session.isLog) {
        var data = await updateDesigns(title, description, imageFile, category, price, design_id)

        if (data.changedRows > 0) {
            res.json({success:true, msg:"Successfully updated", isLog: true})
        }else{
            res.json({success:false, msg:"Data type or content doesn't match to the database", isLog:true})
        }
    }else{
        res.json({isLog:false, msg:"You are not logged in"})
    }
})

module.exports = designRoute