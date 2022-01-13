const express = require('express')
const bodyParser = require('body-parser')
const { getProfiles } = require('../database/generalDB')
const { getDesigns } = require('../database/designDB')

const generalRoute = express.Router()
generalRoute.use(bodyParser.json())

generalRoute.get('/profiles', async(req, res) => {

    var data = await getProfiles()
    if (data.length > 0) {
        res.json({msg: "Profiles data fetched successfully", data})
    }else{
        res.json({msg:"Something went wrong"})
    }
})

generalRoute.get('/get_all_designs', async(req, res) => {

    var data = await getDesigns()

    if (data.length > 0) {
        res.json({msg: "all designs fetched successfully", data})
    }else{
        res.json({msg: "all designs fetching failed"})
    }
})

generalRoute.get('/logout', (req, res) => {
    req.session.destroy()
    // req.session.user_id = null
    console.log(req.session)
    res.json({msg: "successfully logged out", isLog: false})
})

module.exports = generalRoute
