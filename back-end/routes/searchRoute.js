const express = require('express');
const { getSearchResults } = require('../database/searchDB');

const searchRoute = express.Router();

searchRoute.post('/search_item', async(req, res) => {

    var searched_value = req.body.searched_value
    var data = await getSearchResults(searched_value)

    if (data.district_rows || data.name_rows || data.title_rows > 0) {
        res.json({msg:"Searched values found", data, success: true})
    }else{
        
        res.json({msg:"Sorry...! There is no matching items found", success: false})
    }
})

module.exports = searchRoute
