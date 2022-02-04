const connection = require('./database')
const {v4: uuid} = require('uuid')

const insertDesign = (title, description, imageFile, category, price,cake_makers_id, rates) => {
    return new Promise((resolve, reject)=>{
        
        let random_id = uuid()
        console.log(random_id)
        let image = `http://localhost:8000/public/images/designs/designs_${random_id}.jpg`

        imageFile.mv(`${__dirname}/../public/images/designs/designs_${random_id}.jpg`, (err) => {
            if (err) {
                return reject(err)
            }else{
                connection.query(`INSERT INTO designs(design_id, title, description, image, category, price, cake_makers_id) values('${random_id}', '${title}', '${description}', '${image}', '${category}', '${price}', '${cake_makers_id}')`, (error, row) =>{
                    if (error) {
                        return reject(error)
                    }else{
                        return resolve(row)
                    }
                })
            }
        })
    })
}

const getDesigns = () => {
    return new Promise((resolve, reject) => {
        connection.query(`SELECT*FROM designs`, (error, row) => {
            if (error) {
                return reject(error)
            }else{
                return resolve(row)
            }
        })
    })
}

const getCakemakerDesigns = (cake_makers_id) => {
    return new Promise((resolve, reject) => {
        connection.query(`SELECT*FROM designs WHERE cake_makers_id = '${cake_makers_id}'`, (err, row) => {
            if (err) {
                return reject(err)
            }else{
                row.length == 1
                return resolve(row)
            }
        })
    })
}

const getOneDesignDetails = (design_id) => {
    return new Promise((resolve, reject) => {
        
        connection.query(`SELECT*FROM designs WHERE design_id = '${design_id}'`, (err, row) => {
            if (err) {
                return reject(err)
            }else{
                return resolve(row)
            }
        })
    })
}

const updateDesigns = (title, description, imageFile, category, price, design_id) => {

    return new Promise((resolve, reject) => {
        connection.query(`UPDATE designs SET title = '${title}' , description = '${description}' , category = '${category}' , price = '${price}' WHERE design_id = '${design_id}'`, (err, row) => {

            console.log('row.length: ',row.length)
            console.log('row: ',row)
            console.log('imageFile.name: ',imageFile.name)
            if (err) {
                return reject(err)
            }else if(row.length == 0){
                return resolve(row)
            }else{
                if (imageFile.name.length > 0) {
                    imageFile.mv(`${__dirname}/../public/images/designs/designs_${design_id}.jpg`, (err) => {
                        if (err) {
                            return reject(err)
                        }else{
                            row.changedRows = 1
                            return resolve(row)
                        }
                    })
                }else{
                    row.changedRows = 1
                    return resolve(row)
                    
                }
            }
        })
    })
}

module.exports = {insertDesign, getDesigns, getCakemakerDesigns, getOneDesignDetails, updateDesigns}