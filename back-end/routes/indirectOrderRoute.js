const express = require('express')
const bodyParser = require('body-parser')
const { indirectOrder } = require('../database/indirectOrderDB')

const indirectOrderRoute = express.Router()

indirectOrderRoute.post('/order', async(req, res) => {
    
    var {file, complete_date, comment, cus_id, cake_makers_id} = req.body

    const date = new Date();
    let order_date = (date.getUTCFullYear()) + "-" + (date.getMonth() + 1)+ "-" + (date.getUTCDate());

    var imageFile = req.files.file

    console.log("current date: ",order_date)
    // var cus_id = req.session.user_id
    // var cake_makers_id = 'ec5395ff-8dd0-44a4-bc2f-4ece9744327e'
    // var complete_date = '2022-01-07'
    // var comment = 'I want fondant icing with royal blue color flowers'

    console.log(imageFile)
    if (req.session.isLog == true) {
        var data = await indirectOrder(order_date, cus_id, cake_makers_id, imageFile, complete_date, comment)

        if (data.affectedRows > 0) {
            res.json({msg: "Order sent succcessfully", isLog:true, success: true})
        }else{
            res.json({msg: "Select a Cake Maker", isLog:true, success:false})
        }
    }else{
        res.json({msg:"You are not logged In", isLog: false})
    }
})

module.exports = indirectOrderRoute