const express = require('express')
const bodyParser = require("body-parser")
const { displayOnerOrder, displayCustomerDetails } = require('../database/displayOneOrderDetailsDB')

const displayOneOrderDetailsRoute = express.Router()

displayOneOrderDetailsRoute.use(bodyParser.json(true))

displayOneOrderDetailsRoute.post('/details',async(req, res) => {

    var data = await displayOnerOrder(req.body.order_id)
    // var data = await displayOnerOrder('27f26d32-c840-473d-9a20-66b1dfbf6d55')

    console.log("data: ", data)
    if (req.session.isLog) {
        if (data.direct_row.length > 0 || data.indirect_row.length > 0) {
            if (data.direct_row.length > 0) {

                let cus_id = data.direct_row[0].cus_id

                let cus_details = await displayCustomerDetails(cus_id)


                console.log(cus_details)
                
                res.json({msg:"data successfully fetched", success: true, isLog:true,indirect_row: data.indirect_row, direct_row: data.direct_row, direct_indirect: "direct",cus_details})
            }else{
                let cus_id = data.indirect_row[0].cus_id
                
                let cus_details = await displayCustomerDetails(cus_id)
                console.log(cus_details)

                res.json({msg:"data successfully fetched", success: true, isLog:true,indirect_row: data.indirect_row, direct_row: data.direct_row, direct_indirect: "indirect", cus_details})
            }
        }else{
            res.json({msg:"something went wrong", success: false, isLog: true})
        }
    }else{
        res.json({msg:"You are not Logged In",  isLog: false})

    }
})

module.exports = displayOneOrderDetailsRoute