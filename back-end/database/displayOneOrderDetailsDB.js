const connection = require('./database')

const displayOnerOrder = (order_id) => {

    return new Promise((resolve, reject) => {
        // SELECT*FROM direct_orders INNER JOIN cake_makers_details ON direct_orders.cake_makers_id = cake_makers_details.cake_makers_id WHERE direct_orders.direct_order_id = '${order_id}'

        connection.query(`SELECT*FROM direct_orders INNER JOIN cake_makers_details ON direct_orders.cake_makers_id = cake_makers_details.cake_makers_id WHERE direct_orders.direct_order_id = '${order_id}'`, (err, direct_row) => {

            if (err) {
                return reject(err)
            }else{
                connection.query(`SELECT*FROM indirect_orders INNER JOIN cake_makers_details ON indirect_orders.cake_makers_id = cake_makers_details.cake_makers_id WHERE indirect_orders.indirect_order_id = '${order_id}'`,(error, indirect_row) => {
                    if (error) {
                        return reject(error)
                    }else{
                        return resolve({direct_row, indirect_row})
                    }
                })
            }
        })
    })
}

const displayCustomerDetails = (cus_id) => {

    return new Promise((resolve, reject) => {
        connection.query(`SELECT*FROM customer_details WHERE cus_id ='${cus_id}'`, (err, row) => {
            if (err) {
                return reject(err)
            }else{
                return resolve(row)
            }
        })
    })
}
module.exports = {displayOnerOrder, displayCustomerDetails}