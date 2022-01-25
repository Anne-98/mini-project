const connection = require('./database')

const getConfirmedOrders = (cake_makers_id) => {

    return new Promise((resolve, reject) => {
        connection.query(`SELECT*FROM direct_orders WHERE confirm = 1 AND cake_makers_id = '${cake_makers_id}'`, (err, direct_row) => {
    
            console.log("1")
            if (err) {
                console.log("2")
                return reject(err)
            }else{
                connection.query(`SELECT*FROM indirect_orders WHERE confirm = 1 AND cake_makers_id = '${cake_makers_id}'`, (error, indirect_row) => {
                    if (error) {
                        console.log("3")
                        return reject(error)
                    }else{
                        console.log(indirect_row, direct_row)
                        return resolve({indirect_row, direct_row})
                    }
                })
            }
        })
    })
}

module.exports = {getConfirmedOrders}