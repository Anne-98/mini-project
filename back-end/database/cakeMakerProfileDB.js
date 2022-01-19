const connection = require('./database')

const getCakeMakerProfile = (cake_makers_id) => {

    return new Promise((resolve, reject)=>{
        connection.query(`SELECT*FROM cake_makers_details WHERE cake_makers_id = '${cake_makers_id}' LIMIT 1`, (err, row) => {
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

const updateCakeMakerProfile = (name, district, qualifications, contact_num, brandName, facebook, instagram, twitter, imageFile, cake_makers_id) => {

    // console.log("2 imageFile:", imageFile.name.length)

    return new Promise((resolve, reject) => {

        connection.query(`UPDATE cake_makers_details SET name = '${name}' , district = '${district}' , qualifications = '${qualifications}' , contact_num = '${contact_num}' , brand_name = '${brandName}' , facebook = '${facebook}' , instagram = '${instagram}' , twitter = '${twitter}' WHERE cake_makers_id = '${cake_makers_id}'`, (error, row) => {
            if (error) {
                return reject(error)
            }else if(row.length == 0){
                return resolve(row)
            }else{
                // console.log("row.changedRows",row)
                if (imageFile.name.length > 0) {
                    imageFile.mv(`${__dirname}/../public/images/profiles/profiles_${cake_makers_id}.jpg`, (err) => {
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
module.exports = {getCakeMakerProfile, updateCakeMakerProfile}