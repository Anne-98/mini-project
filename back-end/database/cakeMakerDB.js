const connection = require('./database')
const bcrypt = require('bcrypt')
const saltRounds = 10
const {SHA256} = require('crypto-js')
const {v4: uuid} = require('uuid')

const loginCakeMaker = (email, password) =>{
    return new Promise((resolve, reject) => {
        let hashed_email = SHA256(email).toString()

        connection.query(`SELECT*FROM cake_makers_details WHERE email='${hashed_email}'`, (error, row) => {
            if (error) {
                return reject(error)
            }else{
                bcrypt.compare(password, row[0].password, (error, result) => {
                    if (error) {
                        console.log(error)
                        return reject(error)
                    }else{
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
            
            if (err) {
                console.log(err)
            }
            
            let hashed_email = SHA256(email).toString()
            let random_id = uuid()
            var profile_pic = `http://localhost:8000/public/images/profiles/profiles_${random_id}.jpg`;

            imageFile.mv((`${__dirname}/../public/images/profiles/profiles_${random_id}.jpg`), (err) => {
                if (err) {
                    return reject(err)
                }else{ 
                    connection.query(`INSERT INTO cake_makers_details(cake_makers_id, name, password, email, district, qualifications, contact_num, brand_name, profile_picture, facebook, instagram, twitter) values('${random_id}','${name}', '${hashed_password}', '${hashed_email}', '${district}', '${qualifications}', '${contact_num}', '${brand_name}','${profile_pic}','${facebook}','${instagram}','${twitter}')`, (error, row) => {
                        if (error) {
                            return reject(error)
                        }else{
                            const data = loginCakeMaker(email, password)
                            return resolve(data)
                        }
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
            }else{
                return resolve(row)
            }
        })
    })
}
module.exports = {signInCakeMaker, loginCakeMaker, findExistCakeMaker}