const connection = require('./database')
const bcrypt = require('bcrypt')
const {v4:uuid} = require('uuid')

const indirectOrder = (order_date, cus_id, cake_makers_id, imageFile, complete_date, comment) => {
    return new Promise((resolve, reject) => {
        var indirect_order_id = uuid()
        var image = `http://localhost:8000/public/images/orders/indirect/i_order_${indirect_order_id}.jpg`

        console.log("order_Date", order_date)
        console.log("complete_Date", complete_date)
        imageFile.mv(`${__dirname}/../public/images/orders/indirect/i_order_${indirect_order_id}.jpg`, (err) => {
            if (err) {
                return reject(err)
            }else{
                connection.query(`INSERT INTO indirect_orders(indirect_order_id, order_date, cus_id, cake_makers_id, image, complete_date, comment) values('${indirect_order_id}', STR_TO_DATE('${order_date}','%Y-%m-%d'),'${cus_id}', '${cake_makers_id}','${image}', STR_TO_DATE('${complete_date}','%Y-%m-%d'), '${comment}')`, (error, row) => {
                    if (error) {
                        return reject(error)
                    }else{
                        return resolve(row)
                    }
                })
            }
        })
    })
}

module.exports = {indirectOrder}
