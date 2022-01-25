const express = require('express')
const bodyParser = require('body-parser')
const { directOrder } = require('../database/directOrderDB')

const directOrderRoute = express.Router()

directOrderRoute.get('/order', async(req, res) => {

    const date = new Date();

    let order_date = (date.getUTCFullYear()) + "-" + (date.getMonth() + 1)+ "-" + (date.getUTCDate());
    var complete_date = '2022-01-07'
    var cake_makers_id = 'ec5395ff-8dd0-44a4-bc2f-4ece9744327e'
    var cus_id = '27334c78-0917-4b68-92ae-a3d3958c4b3d'
    var design_id = 'dd52bd5b-1b8e-4ff3-b1a8-f270694d25d9'
    var comment = 'I want fondant icing with royal blue color flowers'

    if (req.session.isLog == true) {
        var data = await directOrder(order_date, complete_date, cake_makers_id, cus_id, design_id, comment)

        if (data.affectedRows > 0) {
            res.json({msg: "Order sent succcessfully"})
        }else{
            res.json({msg: "Order unsuccess"})
        }
    }else{
        res.json({msg:"You are not logged In"})
    }
})

module.exports = directOrderRoute