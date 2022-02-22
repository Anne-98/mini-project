const connection = require('./database')

const getConfirmedOrders = (cake_makers_id) => {

    return new Promise((resolve, reject) => {
        connection.query(`SELECT*, DATE_FORMAT(complete_date,'%m/%d/%Y') AS complete_date, DATE_FORMAT(order_date,'%m/%d/%Y') AS order_date  FROM direct_orders WHERE confirm = 1 AND cake_makers_id = '${cake_makers_id}' AND dispatched = 0`, (err, direct_row) => {
    
            console.log("1")
            if (err) {
                console.log("2")
                return reject(err)
            }else{
                connection.query(`SELECT*, DATE_FORMAT(complete_date,'%m/%d/%Y') AS complete_date, DATE_FORMAT(order_date,'%m/%d/%Y') AS order_date FROM indirect_orders WHERE confirm = 1 AND cake_makers_id = '${cake_makers_id}' AND dispatched = 0`, (error, indirect_row) => {
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