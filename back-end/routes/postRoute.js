const express = require('express')
const bodyParser = require("body-parser")
const { createPost, showAllPosts, giveApprove, showApprovedPosts } = require('../database/postDB')

const postRoute = express.Router()

postRoute.post('/post', async(req,res) => {

    var title = 'post 1'
    var description = 'cake classes ne biginning'
    var name = 'anne'
    var cake_makers_id = req.session.user_id

    var session = req.session
    console.log(session.isLog)
    var imageFile = req.files.file

    if (req.session.isLog === true) {
        var data = await createPost(title, description, imageFile, name, cake_makers_id)
            if (data.affectedRows > 0) {
                res.send({msg: "Post created successfully"})
            }else{
                res.send({msg: "Something went wrong"})
            }
    }else{
        res.json({msg: "You are not logged In. Please login and try again", isLog: false})
    }
})

postRoute.get('/show_all_posts', async(req, res) => {

    // console.log(data[0].post_id)
    if (req.session.isLog == true) {
        var data = await showAllPosts()
        if (data.length > 0) {
            res.json({msg: "data successfully emerged", data})
        }else{
            res.json({msg:"Something went wrong"})
        }
    }else{
        res.json({msg: "You are not logged in. "})
    }

})

postRoute.get('/give_approve', async(req,res) => {
    if (req.session.isLog == true) {
        let approve = 1
        var post_id = '7d064fd1-0b82-4301-972b-ad3b83d141ce'
        var data = await giveApprove(post_id, approve)
        res.json({msg:"Successfully approved"})
    }else{
        res.json({msg: "You are not logged In"})
    }
})

postRoute.get('/show_approved_posts' , async(req, res) => {
    var data = await showApprovedPosts()
    if (data.length > 0) {
        res.json({msg: "Successfully emerged approved posts", data})
    }else{
        res.json({msg: "Something went wrong"})
    }
})

module.exports = postRoute