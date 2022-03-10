const connection = require('./database')

const getCategories = () => {
    return new Promise((resolve, reject) => {
        connection.query(`SELECT*FROM categories`, (err, row) => {
            if (err) {
                return reject(err)
            }else{
                return resolve(row)
            }
        })
    })
}
const getOneCategory = (category_name) => {
    return new Promise((resolve, reject) => {
        connection.query(`SELECT*FROM designs WHERE category = '${category_name}'`, (err, row) => {
            if (err) {
                return reject(err)
            }else{
                return resolve(row)
            }
        })
    })
}

module.exports = {getCategories, getOneCategory}