const connection = require('./database')
const bcrypt = require('bcrypt')
const saltRounds = 10
const {SHA256} = require('crypto-js')
const {v4: uuid} = require('uuid')

const loginCustomer = (email, password) =>{
    return new Promise((resolve, reject) => {

        let hashed_email = SHA256(email).toString()

        connection.query(`SELECT*FROM customer_details WHERE email='${hashed_email}' `, (err, row) => {
            if (err) {
                return reject(err)
            }else{
                bcrypt.compare(password, row[0].password, (error, result) => {
                    if (error) {
                        reject(error)
                    }
                    return resolve(row)
                })
            }
        })
    })
}

const signInCustomer = (name, password, email, address, question, contact_num) =>{
    return new Promise((resolve, reject) => {
        bcrypt.hash(password, saltRounds, (error, hashed_password) => {
            
            if (error) {
                console.log(error)
                return reject(error)
            }else{
                let hashed_email = SHA256(email).toString()

                connection.query(`INSERT INTO customer_details(name, password, email, address, question, contact_num) values('${name}', '${hashed_password}', '${hashed_email}', '${address}', '${question}', '${contact_num}')`, (error, row) =>{
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

const findExistUser = (email) => {
    return new Promise((resolve, reject) => {
        
        let hashed_email = SHA256(email).toString()

        connection.query(`SELECT*FROM customer_details WHERE email='${hashed_email}'`, (error, row) => {
            if (error) {
                return reject(error)
            }else{
                return resolve(row)
            }
        })
    })
}
module.exports = {signInCustomer, loginCustomer, findExistUser}