const connection = require('./database')

const updateRates = (cake_makers_id, rate, order_id) => {
    return new Promise((resolve, reject) => {
        connection.query(`SELECT*FROM cake_makers_details WHERE cake_makers_id = '${cake_makers_id}'`, (err, row) => {
            if (err) {
                console.log("9")
                return reject(err)
            }else{
                
                var rated_customers = row[0].rated_customers + 1
                var rated_values = row[0].rated_values + rate

                console.log("rated_customers:", rated_customers, rated_values)
                console.log("ROW: ", row[0])
                
                connection.query(`UPDATE cake_makers_details SET rated_customers = ${rated_customers} , rated_values = ${rated_values} WHERE cake_makers_id = '${cake_makers_id}'`, (err_2, row_2) =>{
                    console.log("7")
                    if (err_2) {
                        console.log("6")
                        return reject(err_2)
                    }else{
                        console.log("5")
                        connection.query(`UPDATE direct_orders SET rated = 1 WHERE direct_order_id = '${order_id}'`, (err_3, row_3) => {
                            console.log("4")
                            if (err_3) {
                                console.log("3")
                                return reject(err_3)
                            }else{
                                console.log("1")
                                connection.query(`UPDATE indirect_orders SET rated = 1 WHERE indirect_order_id = '${order_id}'`, (err_4, row_4) => {
                                    if (err_4) {
                                        console.log("2")
                                        return reject(err_4)
                                    }else{
                                        console.log("ROW_4:",row_2)
                                        return resolve(row_2)
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

module.exports = {updateRates}