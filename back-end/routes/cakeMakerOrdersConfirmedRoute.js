const express = require('express')
const bodyParser = require('body-parser')
const { getConfirmedOrders } = require('../database/cakeMakerOrdersConfirmedDB')

const cakeMakerOrdersConfirmedRoute = express.Router()
cakeMakerOrdersConfirmedRoute.use(bodyParser.json())

cakeMakerOrdersConfirmedRoute.post('/all_orders', async(req, res) => {
    
    var cake_makers_id = req.body.cake_makers_id
    // var cake_makers_id = 'ec5395ff-8dd0-44a4-bc2f-4ece9744327e'
    
    if (req.session.isLog) {

        var data =await  getConfirmedOrders(cake_makers_id)

        console.log(data)
        if (data.direct_row.length > 0 || data.indirect_row.length > 0) {
            res.json({success:true, isLog: true, msg:'', data})
        }else{
            
            res.json({success:true, isLog: true, msg:"You have no any upcoming order"})
        }
    }else{
        res.json({success:false, msg:"You are not Logged In", isLog:false})
    }
})

module.exports = cakeMakerOrdersConfirmedRoute