const express = require('express')
const bodyParser = require('body-parser')
const rejectOrder = require('../database/cakemakersOrderRejectDB')

const cakemakersOrdersResponseRoute = express.Router()
cakemakersOrdersResponseRoute.use(bodyParser.json())

cakemakersOrdersResponseRoute.post('/accpect_order', async(req, res) => {

    var {indirect_order_id, direct_order_id, indirect_reject, indirect_confirm, direct_reject, direct_confirm} = req.body
    // var cake_makers_id = 'ec5395ff-8dd0-44a4-bc2f-4ece9744327e'

        // let indirect_order_id = 'empty'
        // let direct_order_id = '04233df9-1f35-4fb1-9db2-37e86f8bf7a4'
        // let indirect_reject = 0
        // let indirect_confirm = 0
        // let direct_reject = 0
        // let direct_confirm = 1

    // console.log(body)

    if (req.session.isLog == true) {

        var data = await rejectOrder(indirect_order_id, direct_order_id, indirect_reject, indirect_confirm, direct_reject, direct_confirm)


        console.log(data)

        if (data.direct_row.changedRows > 0 || data.indirect_row.changedRows > 0) {
            res.json({msg: "Successfully updated rejected and confirm column", success: true, isLog:true})
        }else{
            res.json({msg: "Something went wrong", success: false, isLog:true})
        }
    }else{
        res.json({msg: "You are not logged In", isLog:false})
    }
})

module.exports = cakemakersOrdersResponseRoute