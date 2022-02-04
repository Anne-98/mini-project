const connection = require('./database')
const bcrypt = require('bcrypt')
const {v4:uuid} = require('uuid')

const directOrder = (order_date, complete_date, cake_makers_id, cus_id, design_id, comment) => {
    return new Promise((resolve, reject) => {
        var direct_order_id = uuid()
        var image = ` http://localhost:8000/public/images/designs/designs_${design_id}.jpg`

                connection.query(`INSERT INTO direct_orders(direct_order_id, order_date, complete_date,image, cake_makers_id, cus_id, design_id, comment) values('${direct_order_id}', STR_TO_DATE('${order_date}','%Y-%m-%d'), STR_TO_DATE('${complete_date}','%Y-%m-%d'),'${image}','${cake_makers_id}','${cus_id}', '${design_id}',  '${comment}')`, (error, row) => {
                    if (error) {
                        return reject(error)
                    }else{
                        return resolve(row)
                    }
                })
            })
}
                
module.exports = {directOrder}
