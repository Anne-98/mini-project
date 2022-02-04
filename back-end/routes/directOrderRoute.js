const express = require('express')
const bodyParser = require('body-parser')
const { directOrder } = require('../database/directOrderDB')

const directOrderRoute = express.Router()

directOrderRoute.post('/order', async(req, res) => {

    const date = new Date();

    let order_date = (date.getUTCFullYear()) + "-" + (date.getMonth() + 1)+ "-" + (date.getUTCDate());

    var {complete_date, cake_makers_id, cus_id, design_id, comment} = req.body
    if (req.session.isLog == true) {
        var data = await directOrder(order_date, complete_date, cake_makers_id, cus_id, design_id, comment)

        if (data.affectedRows > 0) {
            res.json({msg: "Order sent succcessfully", isLog: true, success: true})
        }else{
            res.json({msg: "Order unsuccess", isLog: true, success: false})
        }
    }else{
        res.json({msg:"You are not logged In", isLog: false})
    }
})

module.exports = directOrderRoute