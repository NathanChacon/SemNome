
const db = require('./db')
module.exports = {
    getCategorys: () => {
        return db.select('*').from('category')
    },
    getFoodById: (id) => {
        return db.select('*').from('food').where('idcat',id)
    },
    uploadCategory:(nameCategory,image) =>{
        return db('category').insert({nameCategory,image})
    },
    uploadFood:(foodName,foodDescription,image,price,idcat) =>{
        return db('food').insert({foodName,foodDescription,image,price,idcat})
    },
    findUser:(userID) =>{
        return db.select('*').from('user').where('userID',userID).first()
    },
    createUser:(userID,name,email) =>{
        return db('user').insert({userID,name,email})
    }
}