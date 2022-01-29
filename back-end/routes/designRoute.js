const express = require('express')
const { insertDesign, getCakemakerDesigns, getOneDesignDetails } = require('../database/designDB')

const designRoute = express.Router()

designRoute.post('/insert', async(req, res) => {

        console.log(req.session)

    var title = 'Gatto'
    var description = 'made with sponch cake. chocolate and pineapple gatou are available'
    var category = 'sponch cakes'
    var price = 1000
    var rates = 5
    var imageFile = req.files.file
    var cake_makers_id = req.session.user_id
    // var imageFile = '/http:8000//public/images/designs/ksjhfaksjhf'
    console.log(cake_makers_id)
    
    if (req.session.isLog == true) {
        var data = await insertDesign(title, description, imageFile, category, price, cake_makers_id, rates)
        if (data.length > 0) {
            res.json({success: true, msg: "Successfully added a new design"})
        }else{
            res.json({success: false, msg: "Some data are missing"})
        }
    }else{
        res.json({logged: false, msg:"You are not logged In"})
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

module.exports = designRoute