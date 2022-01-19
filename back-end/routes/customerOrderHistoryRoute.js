const express = require('express')
const bodyParser = require('body-parser')
const { customerAllOrders } = require('../database/customerOrderHistoryDB')

const customerOrderHistoryRoute = express.Router()
customerOrderHistoryRoute.use(bodyParser.json())

customerOrderHistoryRoute.post('/history', async(req, res) => {

    var customer_id = req.body.customer_id
    // var customer_id = 'ef079223-2031-4ad6-ba1f-4d1629c7c3c5'

    if (req.session.isLog == true) {
        var data = await customerAllOrders(customer_id)
        console.log(data.direct_row.length > 0 || data.indirect_row.length > 0 == true)
        if (data.direct_row.length > 0 || data.indirect_row.length > 0 == true) {
            res.json({msg: "all orders fetched successfully", data, isLog: true, success: true})
        }else{
            res.json({msg: "You didn't make any order.", success: false, isLog: true})
        }

    }else{
        res.json({msg: "You are not logged In", isLog: false})
    }
})

module.exports = customerOrderHistoryRoute