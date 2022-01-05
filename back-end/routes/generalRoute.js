const express = require('express')
const bodyParser = require('body-parser')
const { getProfiles } = require('../database/generalDB')

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

module.exports = generalRoute
