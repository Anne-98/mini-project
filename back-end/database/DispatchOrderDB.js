const connection = require('./database')

const dispatchOrder = (order_id) => {
    return new Promise((resolve, reject)=>{
        connection.query(`UPDATE direct_orders SET dispatched = 1 WHERE direct_order_id = '${order_id}'`, (error, direct_row) => {
            if (error) {
                return reject(error)
            }else{
                connection.query(`UPDATE indirect_orders SET dispatched = 1 WHERE indirect_order_id = '${order_id}'`, (err, indirect_row) => {
                    if (err) {
                        return reject(err)
                    }else{
                        return resolve({indirect_row, direct_row})
                    }
                })
            }
        })
    })
}

const setOverdue = (cake_makers_id, overdue_orders) => {
    console.log("2" ,cake_makers_id, overdue_orders)
    return new Promise((resolve, reject) => {
        connection.query(`UPDATE cake_makers_details SET overdue_orders = '${overdue_orders}' WHERE cake_makers_id = '${cake_makers_id}'`, (err, row) => {
            if (err) {
                return reject(err)
            }else{
                return resolve(row)
            }
        })
    })
}
// const getOverdue = () => {

//     return new Promise((resolve, reject) => {
//         connection.query(`SELECT*FROM cake_makers_details' WHERE cake_makers_id = '${cake_makers_id}'`, (err, row) => {
//             if (err) {
//                 return reject(err)
//             }else{
//                 return resolve(row)
//             }
//         })
//     })
// }

const getTotalDispatches = (cake_makers_id) => {
    return new Promise((resolve, reject) => {
        connection.query(`SELECT*FROM indirect_orders WHERE cake_makers_id = '${cake_makers_id}' AND dispatched = 1`, (err, indirect_row) => {
            if (err) {
                return reject(err)
            }else{
                connection.query(`SELECT*FROM direct_orders WHERE cake_makers_id = '${cake_makers_id}' AND dispatched = 1`, (error, direct_row) => {
                 if (error) {
                        return reject(error)
                    }else{
                        return resolve({direct_row, indirect_row})

                    }   
                }
            )}
        })
    })
}

module.exports = {dispatchOrder, setOverdue, getTotalDispatches}