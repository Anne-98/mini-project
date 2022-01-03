const connection = require('./database')
const fileupload = require('express-fileupload')
const {v4:uuid} = require('uuid')

const createPost = (title, description, imageFile, name, cake_makers_id) => {

    return new Promise((resolve, reject)=>{
        var post_id = uuid()
        imageFile.mv(`${__dirname}/../public/images/posts/post_${post_id}.jpg`, (err) => {
            if (err) {
                return reject(err)
            }else{

                var image = `http://localhost:8000/public/images/posts/post_${post_id}.jpg`

                connection.query(`INSERT INTO posts(post_id, title, description, image, name, cake_makers_id) values('${post_id}','${title}', '${description}', '${image}', '${name}', '${cake_makers_id}')`, (error, row) => {
                    if (error) {
                        return reject(error)
                    }else{
                        return resolve(row)
                    }
                })
            }
        })
    })
}

const showAllPosts = () => {
    return new Promise((resolve, reject) => {
        connection.query(`SELECT*FROM posts`, (error, row) => {
            if (error) {
                return reject(error)
            }else{
                return resolve(row)
            }
        })
    })
}

const giveApprove = (post_id, approve) => {
    return new Promise((resolve, reject) => {
        connection.query(`UPDATE posts SET approve = '${approve}' WHERE post_id = '${post_id}'`, (error, row) => {
            if (error) {
                return reject(error)
            }else{
                console.log(row)
                return resolve(row)
            }
        })
    })
}

const showApprovedPosts = () => {
    return new Promise((resolve, reject) => {
        connection.query(`SELECT*FROM posts WHERE approve = 1`, (error, row) => {
            if (error) {
                return reject(error)
            }else{
                return resolve(row)
            }
        })
    })
}
module.exports = {createPost, showAllPosts, giveApprove, showApprovedPosts}