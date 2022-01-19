const express = require('express')
const { getCustomerProfile, updateCustomerProfile } = require('../database/customerProfileDB')

const customerProfileRoute = express.Router()

customerProfileRoute.post('/myprofile', async(req, res) => {

    var customer_id = req.body.customer_id
    // var customer_id = '18e8f15b-80a1-428c-8113-c119efe67c23'

    if (req.session.isLog) {
        var data = await getCustomerProfile(customer_id)

        if (data.length > 0) {
            res.json({data, msg:"Data successfully fetched into the profile page", isLog:true})
        }else{
            res.json({msg:"You haven't created any account", exist: false})
        }
    }else{
        res.json({msg: "You are not Logged In", isLog: false})
    }
})

customerProfileRoute.post('/updateprofile', async(req, res) => {
    if (req.session.isLog) {

        var {name, address, question, contact_num} = req.body
        
        var customer_id = req.session.user_id

        var data = await updateCustomerProfile(name, address, question, contact_num, customer_id)

        console.log('data.changedRows: ',data.changedRows)
        console.log(name, address, question, contact_num, customer_id)

        console.log("customerProfileRoue",data)
        if (data.changedRows > 0) {
            res.json({success: true, msg: "Successfully updated", isLog: true})
        }else{
            res.json({success:false, isLog: true, msg:"Data type or content doesn't match to the database"})
        }
    }else{
        res.json({isLog: false, msg:"You are not logged In"})
    }
})
module.exports = customerProfileRoute
