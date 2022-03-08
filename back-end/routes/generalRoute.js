const express = require('express')
const bodyParser = require('body-parser')
const { getProfiles, deleteRow } = require('../database/generalDB')
const { getDesigns } = require('../database/designDB')
const designRoute = require('./designRoute')
const searchRoute = require('./searchRoute')
const chatRoute = require('./chatRoute')

const generalRoute = express.Router()
generalRoute.use(bodyParser.json())

generalRoute.get('/profiles', async(req, res) => {

    if (req.session.isLog) {
        var data = await getProfiles()
        if (data.length > 0) {
            res.json({msg: "Profiles data fetched successfully", data, isLog:true})
        }else{
            res.json({msg:"Something went wrong", isLog:true})
        }
    }else{
        res.json({msg:"You are not logged In", isLog:false})

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

generalRoute.use('/get_one_design', designRoute)
generalRoute.use('/search', searchRoute)

generalRoute.post('/delete_row', async(req, res) => {

    var {id,id_name, table_name} = req.body

    if (req.session.isLog) {
        var data = await deleteRow(id,id_name, table_name)
        if (data.affectedRows > 0) {
            res.json({msg:"Successfully deleted", success: true, isLog: true})
        }else{
            res.json({msg:"Something went wrong", success: false, isLog: true})
            
        }
    }else{
        res.json({msg:"You are not logged In", isLog: false})

    }
})

generalRoute.use('/chat', chatRoute)


module.exports = generalRoute
