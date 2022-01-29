const connection = require('./database')

const getAllProfiles = () => {

    return new Promise((resolve, reject) => {
        connection.query(`SELECT*FROM cake_makers_details`, (err, row) => {
            if (err) {
                console.log("1111111111")
                return reject(err)
            }else{
                console.log("2222222")
                return resolve(row)
            }
        })
    })
}

module.exports = {getAllProfiles}