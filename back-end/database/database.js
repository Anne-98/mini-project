const mysql = require('mysql')


const connection = mysql.createConnection({
    host:'localhost',
    database:'mini_project',
    port:3306,
    password:'',
    user:'root'

})

connection.connect((error) => {
    if (error) {
        console.log('Database connection failed')
    }else{
        console.log('Database connection success')
    }
})

module.exports = connection