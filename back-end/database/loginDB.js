const connection = require('./database')

const login = (email, password) => {
    
    connection.query(`INSERT INTO user(email, password) values('${email}', '${password}')`, (error, row) => {
    if (error) {
        console.log('failed')
    }else{
        console.log(row)
        return({row})
    }
})
}

module.exports = {login}