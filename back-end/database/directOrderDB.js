const connection = require('./database')
const bcrypt = require('bcrypt')
const {v4:uuid} = require('uuid')

const directOrder = (order_date, complete_date, cake_makers_id, cus_id, design_id, comment) => {

    var splitted_date = order_date.split('-')
    var year = `${splitted_date[0]}`
    var month = `${splitted_date[1]}`
    console.log("year, month: ", typeof(year), month)
    return new Promise((resolve, reject) => {
        var direct_order_id = uuid()
        var image = ` http://localhost:8000/public/images/designs/designs_${design_id}.jpg`

                connection.query(`INSERT INTO direct_orders(direct_order_id, order_date, complete_date,image, cake_makers_id, cus_id, design_id, comment) values('${direct_order_id}', STR_TO_DATE('${order_date}','%Y-%m-%d'), STR_TO_DATE('${complete_date}','%Y-%m-%d'),'${image}','${cake_makers_id}','${cus_id}', '${design_id}',  '${comment}')`, (error, row) => {
                    if (error) {
                        return reject(error)
                    }else{
                        connection.query(`SELECT*FROM monthly_orders WHERE year = '${year}' AND month = '${month}'`, (err_1, row_1)=>{
                            if (err_1) {
                                console.log("row_1: ", row_1)
                                return reject(err_1)
                            }else{
                                var count = row_1[0].count + 1
                                console.log("count: ", row_1[0].count)
                                connection.query(`UPDATE monthly_orders SET count = ${count} WHERE month = '${month}'AND  year = '${year}'`, (err_2, row_2)=>{
                                    if (err_2) {
                                        console.log("2", err_2.message)
                                        return reject(err_2)
                                    }else{
                                        return resolve(row)
                                    }
                                })

                            }
                        })

                    }
                })
            })
        }
                
module.exports = {directOrder}
