const express = require('express')
const bodyParser = require('body-parser')
const { cakeMakersAllOrders, getAllOrders } = require('../database/cakeMakersAllOrdersDB')

const cakeMakersAllOrdersRoute = express.Router()
cakeMakersAllOrdersRoute.use(bodyParser.json())

cakeMakersAllOrdersRoute.post('/display_orders', async(req, res) => {

    var cake_makers_id = req.body.cake_makers_id
    // var cake_makers_id = 'ec5395ff-8dd0-44a4-bc2f-4ece9744327e'
    if (req.session.isLog == true) {
        var data = await cakeMakersAllOrders(cake_makers_id)

        if (data.direct_row.length > 0 || data.indirect_row.length > 0) {
            res.json({msg: "all orders fetched successfully", data, success: true, isLog:true})
        }else{
            res.json({msg: "Something went wrong", success: false, isLog:true})
        }

    }else{
        res.json({msg: "You are not logged In", isLog:false})
    }
})
cakeMakersAllOrdersRoute.post('/direct_indirect', async(req, res) => {

    if (req.session.isLog == true) {
        var data = await getAllOrders()

        console.log("data.getallorders: ", data)
        if (data.direct_row.length > 0 || data.indirect_row.length > 0) {
            res.json({msg: "all orders fetched successfully", data, success: true, isLog:true})
        }else{
            res.json({msg: "Something went wrong", success: false, isLog:true})
        }

    }else{
        res.json({msg: "You are not logged In", isLog:false})
    }
})

module.exports = cakeMakersAllOrdersRoute