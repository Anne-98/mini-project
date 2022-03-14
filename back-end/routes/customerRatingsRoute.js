const express = require('express')
const { updateRates } = require('../database/customerRatingRouteDB')

const customerRatingsRoute = express.Router()

customerRatingsRoute.post('/add_ratings', async(req, res) =>{

    if (req.session.isLog) {
        
        var {cake_makers_id, rate, order_id} = req.body

        let data = await updateRates(cake_makers_id, rate, order_id) 

        console.log("data.......:",data)
        if (data.changedRows > 0) {
            res.json({msg:"rates successfully updated", success:true, isLog:true})
        }else{
            
            res.json({msg:"Something went wrong", success:false, isLog:true})
        }
    }else{
        res.json({msg:"You are not logged In", isLog:false})

    }
})

module.exports = customerRatingsRoute