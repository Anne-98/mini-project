const connection = require('./database')
const bcrypt = require('bcrypt')
const saltRounds = 10
const {SHA256} = require('crypto-js')
const {v4: uuid} = require('uuid')

const loginAdmin = (email, password) =>{
    return new Promise((resolve, reject) => {
        let hashed_email = SHA256(email).toString()

        console.log("loginAdmin email", hashed_email)
        connection.query(`SELECT*FROM admin_details WHERE email='${hashed_email}'`, (error, row) => {
            if (row.length == 0) {
                return resolve({exist: false})
            }else{
                bcrypt.compare(password, row[0].password, (error, result) => {
                    if (result == false) {
                        return resolve(result)
                    }else if (error) {
                        return reject(error)
                    }
                    else{
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
                
                console.log("email: ",email)
                console.log("signinAdmin pw: ",hashed_email)

                connection.query(`INSERT INTO admin_details(admin_id, name,email, password) values('${random_id}','${name}','${hashed_email}', '${hashed_password}')`, async(error, row) =>{
                    if (error) {
                        return reject(error)
                    }else{
                        const data = await loginAdmin(email, password)
                        return resolve(data)
                        }
                })
            }
        })
    })
}

const findExistUser = (email) => {
    return new Promise((resolve, reject) => {
        let hashed_email = SHA256(email).toString()
        console.log("email: ",email)
        console.log("hashed_email: ", hashed_email)
        connection.query(`SELECT*FROM admin_details WHERE email='${hashed_email}'`, (error, row) => {
            if (error) {
                return reject(error)
            }else{
                return resolve(row)
            }
        })
    })
}

const getAllCustomers = () => {
    return new Promise((resolve, reject) => {
        connection.query(`SELECT*FROM customer_details`, (err, row)=>{
            if(err){
                return reject(err)
            }else{
                return resolve(row)
            }
        })
    })
}

const monthlyOrders = () => {
    return new Promise((resolve, reject) => {
        connection.query(`SELECT*FROM monthly_orders`, (err, row) => {
            if (err) {
                return reject(err)
            }else{
                return resolve(row)
            }
        })
    })
}

const adminWarn = (warn, cake_makers_id) => {
    return new Promise((resolve, reject) => {
        connection.query(`UPDATE cake_makers_details SET warning = ${warn} WHERE cake_makers_id = '${cake_makers_id}'`, (err, row) => {
            if (err) {
                return reject(err)
            }else{
                return resolve(row)
            }
        })
    })
}

module.exports = {signInAdmin, loginAdmin, findExistUser, getAllCustomers, monthlyOrders, adminWarn}