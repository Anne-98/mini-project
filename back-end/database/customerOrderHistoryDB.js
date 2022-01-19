const connection = require('./database')

const customerAllOrders = (customer_id) => {
    return new Promise((resolve, reject) => {
        connection.query(`SELECT*FROM direct_orders WHERE cus_id = '${customer_id}'`, (error, direct_row) => {
            if (error) {
                return reject(error)
            }else{
                connection.query(`SELECT*FROM indirect_orders WHERE cus_id = '${customer_id}'`, (err, indirect_row) => {
                    if (err) {
                        return reject(err)
                    }else{
                        // console.log(direct_row, indirect_row)
                        return resolve({direct_row , indirect_row})
                    }
                })
            }
        })
    })
}

module.exports = {customerAllOrders}