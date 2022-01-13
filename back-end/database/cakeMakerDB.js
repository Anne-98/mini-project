const connection = require('./database')
const bcrypt = require('bcrypt')
const saltRounds = 10
const {SHA256} = require('crypto-js')
const {v4: uuid} = require('uuid')

const loginCakeMaker = (email, password) =>{
    return new Promise((resolve, reject) => {
        let hashed_email = SHA256(email).toString()

        connection.query(`SELECT*FROM cake_makers_details WHERE email='${hashed_email}'`, (error, row) => {
            if (row.length == 0) {
                // console.log(error)
                console.log("7")
                return resolve({exist: false})
            }else{
                bcrypt.compare(password, row[0].password, (error, result) => {
                    if (result == false) {
                        console.log("8")
                        return resolve(result)
                    }else if (error) {
                        console.log("9")
                        return reject(error)
                    }
                    else{
                        console.log("10")
                        console.log(row)
                        return resolve(row)
                    }
                })
            }
        })
    })
}

const signInCakeMaker = (name, password, email, district, qualifications, contact_num, brand_name, facebook, instagram, twitter, imageFile) =>{
    return new Promise((resolve, reject) => {

        bcrypt.hash(password, saltRounds, (err, hashed_password) => {
            console.log("hashing step")
            if (err) {
                console.log(err)
            }
            
            let hashed_email = SHA256(email).toString()
            let random_id = uuid()
            var profile_pic = `http://localhost:8000/public/images/profiles/profiles_${random_id}.jpg`;
            
            imageFile.mv((`${__dirname}/../public/images/profiles/profiles_${random_id}.jpg`), (err) => {
            console.log("1")
            if (err) {
                return reject(err)
                console.log("2")
            }else{ 
                connection.query(`INSERT INTO cake_makers_details(cake_makers_id, name, password, email, district, qualifications, contact_num, brand_name, profile_picture, facebook, instagram, twitter) values('${random_id}','${name}', '${hashed_password}', '${hashed_email}', '${district}', '${qualifications}', '${contact_num}', '${brand_name}','${profile_pic}','${facebook}','${instagram}','${twitter}')`, async(error, row) => {
                        console.log("3")
                        if (error) {
                            console.log("4")
                            return reject(error)
                        }else if (row.length == 0) {
                            console.log("5")
                            console.log("row.length in inserting query",row)
                            return resolve(row)
                        }
                        console.log("6")
                        const data = await loginCakeMaker(email, password)
                        console.log("data.cake_makers_id",data)
                        return resolve(data)
                        
                    })
                }
            })

            
        })
    })
}

const findExistCakeMaker = (email) => {
    return new Promise((resolve, reject) => {
        
        let hashed_email = SHA256(email).toString()

        connection.query(`SELECT*FROM cake_makers_details WHERE email='${hashed_email}'`, (error, row) => {
            if (error) {
                return reject(error)
            }else if (row.length == 0) {
                return resolve({row, exist:false})
            }else{
                return resolve({row, exist: true})
            }
        })
    })
}
module.exports = {signInCakeMaker, loginCakeMaker, findExistCakeMaker}