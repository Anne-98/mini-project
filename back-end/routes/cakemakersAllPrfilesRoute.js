const express = require('express')
const { getAllProfiles } = require('../database/cakeMakerAllProfilesDB')

const cakeMakerAllProfiles = express.Router()

cakeMakerAllProfiles.get('/cakemakers', async(req, res) => {

    var data = await getAllProfiles()

    console.log("cake makersdetails: ",data)
    if (data.length > 0) {
        res.json({msg:"cake makers details successfully fetched", data, success: true})
    }else{
        res.json({msg:"Something went wrong", success: false})

    }
})

module.exports = cakeMakerAllProfiles
