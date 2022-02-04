const connection = require('./database')

const getSearchResults = (searched_value) => {

    return new Promise((resolve, reject) => {
        connection.query(`SELECT*FROM cake_makers_details WHERE district LIKE '%${searched_value}%'`, (err_1, district_rows) => {
            if (err_1) {
                return reject(err_1)
            }else{
                connection.query(`SELECT*FROM cake_makers_details WHERE name LIKE '%${searched_value}%'`, (err_2, name_rows) => {
                    if (err_2) {
                        return reject(err_2)
                    }else{
                        connection.query(`SELECT*FROM designs WHERE title LIKE '%${searched_value}%'`, (err_3, title_rows) => {
                            if (err_3) {
                                return reject(err_3)
                            }else{
                                return resolve({district_rows, name_rows, title_rows})
                            }
                        })
                    }
                })
            }
        })
    })
}

module.exports = {getSearchResults}