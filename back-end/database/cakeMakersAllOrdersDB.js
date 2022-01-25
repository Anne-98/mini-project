const connection = require('./database')

const cakeMakersAllOrders = (cake_makers_id) => {
    return new Promise((resolve, reject) => {
        connection.query(`SELECT*FROM direct_orders WHERE cake_makers_id = '${cake_makers_id}' AND confirm = 0 AND rejected = 0`, (error, direct_row) => {
            if (error) {
                return reject(error)
            }else{
                connection.query(`SELECT*FROM indirect_orders WHERE cake_makers_id = '${cake_makers_id}' AND confirm = 0 AND rejected = 0`, (err, indirect_row) => {
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

module.exports = {cakeMakersAllOrders}