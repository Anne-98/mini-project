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
                connection.query(`INSERT INTO designs(design_id, title, description, image, category, price, cake_makers_id, rates) values('${random_id}', '${title}', '${description}', '${image}', '${category}', '${price}', '${cake_makers_id}', '${rates}')`, (error, row) =>{
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

module.exports = {insertDesign}