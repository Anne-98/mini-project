const express = require('express');
const bodyParser = require('body-parser')
const {getCategories, getOneCategory} = require('../database/categoriesDB');

const categoriesRoute = express.Router()
categoriesRoute.use(bodyParser.json())

categoriesRoute.post('/categories', async(req, res) => {

    var data =await getCategories()

    if (data.length > 0) {
        res.json({success:true, msg:"All data fetched successfully", data})
    }else{
        res.json({success:false, msg:"Something went wrong"})
    }
})
categoriesRoute.post('/one_category', async(req, res) => {

    var category_name = req.body.category_name

    var data = await getOneCategory(category_name)

    if (data.length > 0) {
        res.json({success:true, msg:"All data fetched successfully", data})
    }else{
        res.json({success:false, msg:"Something went wrong"})
    }
})

module.exports = categoriesRoute