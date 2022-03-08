const connection = require('./database');
const {v4: uuid} = require('uuid')

const chatUpdate = (chat_history, cake_makers_id, cus_id) =>{
    return new Promise((resolve, reject) => {
        
        connection.query(`UPDATE chat SET chat_history = '${chat_history}' WHERE cake_makers_id = '${cake_makers_id}' AND cus_id = '${cus_id}'`, (error, row) => {
            if (error) {
                return reject(error)
            }else{
                return resolve(row)
            }
        })
    })
}

const startNewChat = (chat_history, cake_makers_id, cus_id) =>{

    const random_id = uuid() 

    return new Promise((resolve, reject) =>{
        connection.query(`INSERT INTO chat(chat_id, chat_history, cake_makers_id, cus_id) VALUES('${random_id}', '${chat_history}', '${cake_makers_id}', '${cus_id}'`, (error, row) => {
            if (error) {
                return reject(error)
            }else{
                return resolve(row)
            }
        })
    })
}

const availableChats = (userId) => {
    return new Promise((resolve, reject) => {
        connection.query(`SELECT * FROM chat WHERE cake_makers_id = '${userId}' OR cus_id = '${userId}'`, (error, row) => {
            if (error) {
                return reject(error)
            }else if(row.length == 0){
                return resolve(row)
            }else{
                return resolve(row)
            }
        })
    })
}
const getClickedChat = (userId, clickedId) => {
    return new Promise((resolve, reject) => {
        connection.query(`SELECT * FROM chat WHERE cake_makers_id = '${userId}' OR cake_makers_id = '${clickedId}' AND cus_id = '${userId}' OR cus_id = '${clickedId}'`, (error, row) => {
            if (error) {
                return reject(error)
            }else if(row.length == 0){
                return resolve(row)
            }else{
                return resolve(row)
            }
        })
    })
}
module.exports = {chatUpdate, startNewChat, availableChats, getClickedChat}