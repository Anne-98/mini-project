const connection = require('./database')

const rejectOrder = (indirect_order_id, direct_order_id, indirect_reject, indirect_confirm, direct_reject, direct_confirm) => {

    return new Promise((resolve, reject)=>{
            connection.query(`UPDATE indirect_orders SET rejected = '${indirect_reject}' , confirm = '${indirect_confirm}' WHERE indirect_order_id = '${indirect_order_id}'`, (error, indirect_row) => {
            if (error) {
                return reject(error)
            }else{
                console.log("1")
                connection.query(`UPDATE direct_orders SET rejected = '${direct_reject}' , confirm = '${direct_confirm}' WHERE direct_order_id = '${direct_order_id}'`, (error, direct_row) => {
                    if (error) {
                        console.log("2")
                        return reject(error)
                    }else{
                        console.log("3")
                        return resolve({indirect_row, direct_row})
                    }
                })
            }
        })
    })
}

module.exports = rejectOrder
