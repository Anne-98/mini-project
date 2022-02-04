const express = require('express');
const { getUncheckedMsgs, updateCheckMsgs } = require('../database/customerNotificationsDB');

const customerNotificationsRoute = express.Router()

customerNotificationsRoute.post('/display', async(req, res) => {

    var cus_id = req.body.cus_id
    console.log("cus_id",cus_id)
    console.log("sessionid",req.session.cus_id)
    // var cus_id = 'ef079223-2031-4ad6-ba1f-4d1629c7c3c5'

    if (req.session.isLog) {
        var data = await getUncheckedMsgs(cus_id)

        res.json({data, msg:"Successfully data fetched", isLog: true, success: true})
    }else{
        
        res.json({msg:"You are not logged In", isLog: false})
    }
})

customerNotificationsRoute.post('/checked', async(req, res) => {

    if (req.session.isLog) {

        var cus_id = req.session.user_id
        var order_id = req.body.order_id

        var data = await updateCheckMsgs(cus_id, order_id)

        if (data.direct_row.changedRows > 0 || data.indirect_row.changedRows > 0) {
            res.json({msg:"Successfully updated", isLog: true, success:true})   
        }else{
            res.json({msg:"Error with updating data", isLog: true, success:false})   
        }
    }else{
        res.json({msg:"You are not logged In",success:false, isLog: false})
    }
})

module.exports = customerNotificationsRoute