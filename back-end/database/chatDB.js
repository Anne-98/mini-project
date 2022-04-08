const connection = require('./database');
const {v4: uuid} = require('uuid')

const chatUpdate = (chat_history, recieverId, senderId,type) =>{
    return new Promise((resolve, reject) => {
        
        if (type == 'cakemaker') {
            connection.query(`UPDATE chat SET chat_history = ? WHERE cake_makers_id = '${senderId}' AND cus_id = '${recieverId}'`,[chat_history], (error, row) => {
                if (error) {
                    console.log("1")
                    return reject(error)
                }else{
                    connection.query(`SELECT * FROM chat INNER JOIN customer_details ON chat.cus_id = customer_details.cus_id WHERE chat.cake_makers_id = '${senderId}'`, (err, row_2) => {
                        if (err) {
                            return reject(err)
                        }else{
                            return resolve(row_2[0])
                        }
                    })
                }
            })
        }else{
            connection.query(`UPDATE chat SET chat_history = ? WHERE cake_makers_id = '${recieverId}' AND cus_id = '${senderId}'`,[chat_history], (error, row) => {
                if (error) {
                    console.log("1")
                    return reject(error)
                }else{
                    connection.query(`SELECT * FROM chat INNER JOIN cake_makers_details ON chat.cake_makers_id = cake_makers_details.cake_makers_id WHERE chat.cus_id = '${senderId}'`, (err, row_2) => {
                        if (err) {
                            return reject(err)
                        }else{
                            return resolve(row_2[0])
                        }
                    })
                }
            })
        }
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

const availableChats = (userId,type) => {
    return new Promise((resolve, reject) => {
        if (type == 'customer') {
            connection.query(`SELECT * FROM chat INNER JOIN cake_makers_details ON chat.cake_makers_id = cake_makers_details.cake_makers_id WHERE chat.cus_id = '${userId}'`, (error, row) => {
            if (error) {
                return reject(error)
            }else if(row.length == 0){
                console.log("data: ", row)
                return resolve(row)
            }else{
                console.log("data: ", row)
                return resolve(row)
            }
        })
    }else{
        connection.query(`SELECT * FROM chat INNER JOIN customer_details ON chat.cus_id = customer_details.cus_id WHERE chat.cake_makers_id = '${userId}'`, (error, row) => {
            if (error) {
                return reject(error)
            }else if(row.length == 0){
                console.log("data: ", row)
                return resolve(row)
            }else{
                console.log("data: ", row)
                return resolve(row)
            }
        })
        }
    })
}
const getClickedChat = (userId, clickedId, type) => {
    return new Promise((resolve, reject) => {
        if (type == 'cakemaker') {
            connection.query(`SELECT * FROM chat WHERE cake_makers_id = '${userId}' AND cus_id = '${clickedId}'`, (error, row) => {
                if (error) {
                    return reject(error)
                }else if(row.length == 0){
                    return resolve(row)
                }else{
                    console.log("row: ",row)
                    return resolve(row)
                }
            })
        }else{
            connection.query(`SELECT * FROM chat WHERE cake_makers_id = '${clickedId}' AND cus_id = '${userId}'`, (error, row) => {
                if (error) {
                    return reject(error)
                }else if(row.length == 0){
                    return resolve(row)
                }else{
                    console.log("row: ",row)
                    return resolve(row)
                }
            })
        }
    })
}
module.exports = {chatUpdate, startNewChat, availableChats, getClickedChat}