const express = require('express')
const { insertDesign } = require('../database/designDB')

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

module.exports = designRoute