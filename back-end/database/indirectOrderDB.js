const connection = require('./database')
const bcrypt = require('bcrypt')
const {v4:uuid} = require('uuid')

const indirectOrder = (order_date, cus_id, cake_makers_id, imageFile, complete_date, comment) => {
    
    var splitted_date = order_date.split('-')
    var year = `${splitted_date[0]}`
    var month = `${splitted_date[1]}`

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
                        connection.query(`SELECT*FROM monthly_orders WHERE year = '${year}' AND month = '${month}'`, (err_1, row_1)=>{
                            if (err_1) {
                                return reject(err_1)
                            }else{
                                var count = row_1[0].count + 1

                                connection.query(`UPDATE monthly_orders SET count = ${count} WHERE month = '${month}'AND  year = '${year}'`, (err_2, row_2)=>{
                                    if (err_2) {
                                        return reject(err_2)
                                    }else{
                                        return resolve(row)
                                    }
                                })

                            }
                        })
                    }
                })
            }
        })
    })
}

module.exports = {indirectOrder}
