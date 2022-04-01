const connection = require('./database')
const {SHA256} = require("crypto-js")
const bcrypt = require('bcrypt')
const { loginCakeMaker } = require('./CakeMakerDB')
const { loginCustomer } = require('./customerDB')
const saltRounds = 10

const updatePasswordCakeMaker = (email, password) =>{

    return new Promise((resolve, reject) => {

        let hashed_email = SHA256(email).toString()

        bcrypt.hash(password, saltRounds, (err, hashed_password) => {
            console.log("hashed_email", hashed_email)
            console.log("hashed_password", hashed_password)
            let hashed_password2 = SHA256(password).toString()
            console.log("hashed_password2", hashed_password2)
            if (err) {
                return reject(err)
            }else{
                connection.query(`UPDATE cake_makers_details SET password = '${hashed_password}' WHERE email = '${hashed_email}'`, async(error, row) => {
                    if (error) {
                        return reject(error)
                    }else{
                        const data = await loginCakeMaker(email, password)
                        return resolve(data)
                    }
                })
            }
        })
    })
}
const updatePasswordCustomer = (email, password) =>{

    return new Promise((resolve, reject) => {

        let hashed_email = SHA256(email).toString()

        bcrypt.hash(password, saltRounds, (err, hashed_password) => {
            console.log("hashed_email", hashed_email)
            console.log("hashed_password", hashed_password)
            let hashed_password2 = SHA256(password).toString()
            console.log("hashed_password2", hashed_password2)
            if (err) {
                return reject(err)
            }else{
                connection.query(`UPDATE customer_details SET password = '${hashed_password}' WHERE email = '${hashed_email}'`, async(error, row) => {
                    if (error) {
                        return reject(error)
                    }else{
                        const data = await loginCustomer(email, password)
                        return resolve(data)
                    }
                })
            }
        })

    })
}

module.exports = {updatePasswordCakeMaker, updatePasswordCustomer}