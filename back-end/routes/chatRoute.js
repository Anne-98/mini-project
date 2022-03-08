
const express = require('express')
const bodyParser = require('body-parser')
const { chatUpdate, availableChats, getClickedChat } = require('../database/chatDB')

const chatRoute = express.Router();
chatRoute.use(bodyParser.json())

chatRoute.post('/chat_update', async(req, res) => {
    
    if (req.session.isLog) {
        const {chat_history, cake_makers_id, cus_id} = req.body
    
        var data = await chatUpdate(chat_history, cake_makers_id, cus_id)

        if (data.affectedRows > 0) {
            res.json({isLog: true, msg: "Successfully updated", success: true})
        }else{
            res.json({isLog: true, msg: "Something went wrong", success: false})            
        }
    }else{
        res.json({isLog: false, msg: "You are not logged In", success: false})
    }
})

chatRoute.post('/available_chats', async(req, res) => {
    
    if (req.session.isLog) {
        const userId = req.body.userId
    
        var data = await availableChats(userId)

        if (data.length > 0 || data.length == 0) {
            res.json({isLog: true, msg: "Successfully fetched all data", success: true, data})
        }else{
            res.json({isLog: true, msg: "Something went wrong", success: false})            
        }
    }else{
        res.json({isLog: false, msg: "You are not logged In", success: false})
    }
})
chatRoute.post('/clicked_chat', async(req, res) => {
    
    if (req.session.isLog) {
        const userId = req.body.userId
        const clickedId = req.body.clickedId
    
        var data = await getClickedChat(userId, clickedId)

        if (data.length > 0) {
            res.json({isLog: true, msg: "Successfully fetched all data", success: true, data})
        }else{
            res.json({isLog: true, msg: "Something went wrong", success: false})            
        }
    }else{
        res.json({isLog: false, msg: "You are not logged In", success: false})
    }
})

module.exports = chatRoute