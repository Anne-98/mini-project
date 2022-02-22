const express = require('express')
const bodyParser = require("body-parser")
const { createPost, showAllPosts, giveApprove, showApprovedPosts, showPosts } = require('../database/postDB')

const postRoute = express.Router()

postRoute.post('/create_post', async(req,res) => {

    var {title, description, name} = req.body
    var cake_makers_id = req.session.user_id
    var imageFile = req.files.file

    console.log("description: ",description)
    const date = new Date();

    let post_date = (date.getUTCFullYear()) + "-" + (date.getMonth() + 1)+ "-" + (date.getUTCDate());

    if (req.session.isLog === true) {
        var data = await createPost(title, description, imageFile, name, cake_makers_id, post_date)
            if (data.affectedRows > 0) {
                res.send({msg: "Post created successfully", isLog: true, success: true})
            }else{
                res.send({msg: "Something went wrong", isLog:true, success:false})
            }
    }else{
        res.json({msg: "You are not logged In. Please login and try again", isLog: false})
    }
})
// to show admin
postRoute.get('/show_all_posts', async(req, res) => {

    if (req.session.isLog == true) {
        var data = await showAllPosts()
        if (data.length > 0) {
            res.json({msg: "data successfully emerged", data, success: true, isLog:true})
        }else{
            res.json({msg:"Something went wrong", success: false, isLog:true})
        }
    }else{
        res.json({msg: "You are not logged in. ", isLog:false})
    }
})

postRoute.post('/give_approve', async(req,res) => {
    if (req.session.isLog == true) {
        let approve = 1
        var post_id = req.body.post_id
        var data = await giveApprove(post_id, approve)
        if (data.affectedRows > 0) {
            res.json({msg:"Successfully approved", isLog:true, success:true})
        }else{
            
            res.json({msg:"Something went wrong", isLog:true, success:false})
        }
    }else{
        res.json({msg: "You are not logged In", isLog:false})
    }
})

// to show all users.........................................................
postRoute.get('/show_approved_posts' , async(req, res) => {
    // if (req.session.isLog == true) {
        var data = await showApprovedPosts()
        console.log("data: ", data)
        if (data.length > 0) {
            res.json({msg:"Successfully fetched all data", isLog:true, success:true, data})
        }else{
            
            res.json({msg:"Something went wrong", isLog:true, success:false})
        }
    // }else{
        // res.json({msg: "You are not logged In", isLog:false})
    // }
})

postRoute.post('/show_post', async(req, res) => {

    console.log("post_id: ", post_id)
    if (req.session.isLog) {
        var post_id = req.body.post_id
        var data = await showPosts(post_id)
        
        console.log("data: ", data)
        if (data.length > 0) {
            res.json({msg: "Successfully fetch the post", isLog:true, success:true, data})
        }else{
            res.json({msg: "Something went wrong", isLog:true, success:false})
        }
    }else{
        res.json({msg: "You are not logged In", isLog:false})
    }
})

module.exports = postRoute