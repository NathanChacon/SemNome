
const db = require('./db')
module.exports = {
    getCategorys: () => {
        return db.select('*').from('category')
    },
    getFoodById: (id) => {
        return db.select('*').from('food').where('idFood',id)
    },
    getFoodByCategoryId: (id) => {
        return db.select('*').from('food').where('idcat',id)
    },
    getAllOrders: () => {
        return db.select('orderId','userName','cpfOrCnpj','address','method','description','change','amount','status','date').from('order')
    },
    getOrdersByClientId: (clientId) => {
        return db.select('orderId','description','amount','status','method').from('order').where('userId',clientId)
    },
    uploadCategory:(nameCategory,image) =>{
        return db('category').insert({nameCategory,image})
    },
    uploadFood:(foodName,foodDescription,image,price,idcat) =>{
        return db('food').insert({foodName,foodDescription,image,price,idcat})
    },
    uploadOrder:(userId,userName,cpfOrCnpj,address,method,description,amount,change,date) => {
        return db('order').insert({userId,userName,cpfOrCnpj,address,method,description,amount,change,date})
    },
    findUser:(userID) =>{
        return db.select('*').from('user').where('userID',userID).first()
    },
    createUser:(userID,name,email) =>{
        return db('user').insert({userID,name,email})
    },
    saveTransaction:(orderId,userId,authorizationId) => {
        return db('transaction').insert({orderId,userId,authorizationId})
    },
    saveCaptureID: (captureId,orderId) => {
        return db('transaction').where({'orderId':orderId}).update({captureId})
    },
    lookupAuthorizationID:(orderId) => {
        return db.select('*').from('transaction').where('orderId',orderId).first()
    },
    updateOrderStatus:(orderId,status) => {
        return db('order').where({orderId}).update({status})
    }
}