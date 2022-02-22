const connection = require('./database')

const getProfiles = () => {

    return new Promise((resolve, reject) => {
        connection.query(`SELECT*FROM cake_makers_details`, (error, row) => {
            if (error) {
                return reject(error)
            }else{
                return resolve(row)
            }
        })
    })
}

const deleteRow = (id,id_name, table_name) => {

    return new Promise((resolve, reject) => {

        connection.query(`DELETE FROM ${table_name} WHERE ${id_name} = '${id}'`, (error, row) => {
            if (error) {
                return reject(error)
            }else{
                return resolve(row)
            }
        })
    })
}

module.exports = {getProfiles, deleteRow}
