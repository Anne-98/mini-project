const connection = require('./database')

const getCustomerProfile = (customer_id) => {

    return new Promise((resolve, reject)=>{
        connection.query(`SELECT*FROM customer_details WHERE cus_id = '${customer_id}' LIMIT 1`, (err, row) => {
            if (err) {
                return reject(err)
            }else if(row.length == 0){
                return resolve({row, exist: false})
            }else{
                return resolve(row)
            }
        })
    })
}

const updateCustomerProfile = (name, address, question, contact_num, customer_id) => {

    return new Promise((resolve, reject) => {

        connection.query(`UPDATE customer_details SET name = '${name}' , address = '${address}' , question = '${question}' , contact_num = '${contact_num}' WHERE cus_id = '${customer_id}'`, (error, row) => {
            if (error) {
                return reject(error)
            }else if(row.length == 0){
                return resolve(row)
            }else{
                row.changedRows = 1
                console.log("row.changedRows",row)
                return resolve(row)
            }
        })
    })
}
module.exports = {getCustomerProfile, updateCustomerProfile}