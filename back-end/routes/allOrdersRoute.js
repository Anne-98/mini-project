const express = require('express')
const bodyParser = require('body-parser')
const { allOrders } = require('../database/allOrdersDB')

const allOrdersRoute = express.Router()
allOrdersRoute.use(bodyParser.json())

allOrdersRoute.get('/display_orders', async(req, res) => {

    var cake_makers_id = 'ec5395ff-8dd0-44a4-bc2f-4ece9744327e'

    if (req.session.isLog == true) {
        var data = await allOrders(cake_makers_id)
        console.log(data.direct_row.length > 0 || data.indirect_row.length > 0 == true)
        if (data.direct_row.length > 0 || data.indirect_row.length > 0 == true) {
            res.json({msg: "all orders fetched successfully", data})
        }else{
            res.json({msg: "Something went wrong"})
        }

    }else{
        res.json({msg: "You are not logged In"})
    }
})

module.exports = allOrdersRoute