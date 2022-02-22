const express = require('express')
const { dispatchOrder, setOverdue } = require('../database/DispatchOrderDB')

const cakemakerDispatchOrderRoute = express.Router()

cakemakerDispatchOrderRoute.post('/dispatch', async(req, res) => {
    if (req.session.isLog) {

        let order_id = req.body.order_id
        var data = await dispatchOrder(order_id)

        if (data.indirect_row.affectedRows > 0 || data.direct_row.affectedRows > 0) {
            res.json({isLog:true , success:true, msg: "Success"})
        }else{
            res.json({isLog:true, msg: "Something went wrong", success:false})
        }
    }else{
        res.json({isLog:false, msg: "You are not logged In"})
    }
})

cakemakerDispatchOrderRoute.post('/overdue', async(req, res) => {

    if (req.session.isLog) {

        let cake_makers_id = req.body.cake_makers_id
        let overdue_orders = req.body.overdue_orders
        
        let data = await setOverdue(cake_makers_id, overdue_orders)    
        
        if (data.affectedRows > 0) {
            res.json({isLog:true , success:true, msg: "Success"})
        }else{
            res.json({isLog:true, msg: "Something went wrong", success:false})
        }
    }else{
        res.json({isLog:false, msg: "You are not logged In"})
    }
})

// cakemakerDispatchOrderRoute.post('/get_overdue', async(req, res) => {
    
//     if (req.session.isLog) {
        
//         let overdue_data = await getOverdue()    
        
//         if (overdue_data.length > 0) {
//             res.json({isLog:true , success:true, msg: "Success", overdue_data})
//         }else{
//             res.json({isLog:true, msg: "Something went wrong", success:false})
//         }
//     }else{
//         res.json({isLog:false, msg: "You are not logged In"})
//     }
// })

module.exports = cakemakerDispatchOrderRoute