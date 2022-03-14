const connection = require('./database')

const cakeMakersAllOrders = (cake_makers_id) => {
    return new Promise((resolve, reject) => {
        connection.query(`SELECT*, DATE_FORMAT(complete_date,'%m/%d/%Y') AS complete_date, DATE_FORMAT(order_date,'%m/%d/%Y') FROM direct_orders WHERE cake_makers_id = '${cake_makers_id}' AND confirm = 0 AND rejected = 0`, (error, direct_row) => {
            if (error) {
                return reject(error)
            }else{
                connection.query(`SELECT*, DATE_FORMAT(complete_date,'%m/%d/%Y') AS complete_date, DATE_FORMAT(order_date,'%m/%d/%Y') FROM indirect_orders WHERE cake_makers_id = '${cake_makers_id}' AND confirm = 0 AND rejected = 0`, (err, indirect_row) => {
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
const getAllOrders = () => {
    return new Promise((resolve, reject) => {
        connection.query(`SELECT*, DATE_FORMAT(order_date, '%m') AS order_date FROM direct_orders`, (error, direct_row) => {
            if (error) {
                return reject(error)
            }else{
                connection.query(`SELECT*, DATE_FORMAT(order_date, '%m') AS order_date FROM indirect_orders`, (err, indirect_row) => {
                    if (err) {
                        return reject(err)
                    }else{
                        return resolve({direct_row , indirect_row})
                    }
                })
            }
        })
    })
}

module.exports = {cakeMakersAllOrders, getAllOrders}