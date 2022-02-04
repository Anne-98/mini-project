const connection = require('./database')

const getUncheckedMsgs = (cus_id) => {
    console.log(cus_id)
    return new Promise((resolve, reject)=>{
        connection.query(`SELECT*FROM direct_orders WHERE cus_id = '${cus_id}' AND check_msg = 0 AND (confirm = 1 OR rejected = 1)`, (err, direct_row) => {
            if (err) {
                return reject(err)
            }else{
                connection.query(`SELECT*FROM indirect_orders WHERE cus_id = '${cus_id}' AND check_msg = 0 AND (confirm = 1 OR rejected = 1)`, (error, indirect_row) => {
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

const updateCheckMsgs = (cus_id, order_id) =>{
    return new Promise((resolve, reject) => {
        connection.query(`UPDATE direct_orders SET check_msg = 1 WHERE cus_id = '${cus_id}' AND direct_order_id = '${order_id}'`, (err, direct_row) => {
            if (err) {
                return reject(err)
            }else{
                connection.query(`UPDATE indirect_orders SET check_msg = 1 WHERE cus_id = '${cus_id}' AND indirect_order_id = '${order_id}'`, (error, indirect_row)=>{
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

module.exports = {getUncheckedMsgs, updateCheckMsgs}