const connection = require('./database')
const bcrypt = require('bcrypt')
const saltRounds = 10
const {v4: uuid} = require('uuid')
const {SHA256} = require('crypto-js')

const loginAdmin = (email, password) =>{
    return new Promise((resolve, reject) => {
        let hashed_email = SHA256(email).toString()

        console.log("loginAdmin email", hashed_email)
        connection.query(`SELECT*FROM admin_details WHERE email='${hashed_email}' `, (err_1, row) => {
        if (err_1) {
            return reject(err_1)
        }else{
            bcrypt.compare(password, row[0].password, (err_2, result) => {
                    if (err_2) {
                        return reject(err_2)
                    }else{
                        return resolve(row)
                    }
                })
            }
        })
    })
} 

const signInAdmin = (name,email, password) =>{
    return new Promise((resolve, reject) => {
        bcrypt.hash(password, saltRounds, (error, hashed_password) => {
            if (error) {
                console.log(error)
                return reject(error)
            }else{
                // console.log("signinAdmin email: ",hashed_email)
                let random_id = uuid()
                // One way hash function, it is a static value
                let hashed_email = SHA256(email).toString()

                console.log("signinAdmin pw: ",hashed_email)

                connection.query(`INSERT INTO admin_details(admin_id, name,email, password) values('${random_id}','${name}','${hashed_email}', '${hashed_password}')`, (error, row) =>{
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
        console.log("findExistuser email: ",hashed_email)
        connection.query(`SELECT*FROM admin_details WHERE email='${hashed_email}'`, (error, row) => {
            if (error) {
                return reject(error)
            }else{
                return resolve(row)
            }
        })
    })
}
module.exports = {signInAdmin, loginAdmin, findExistUser}