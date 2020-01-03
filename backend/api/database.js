
const db = require('./db')
module.exports = {
    getCategorys: () => {
        return db.select('*').from('category')
    },
    getCategoryImagePath: (categoryId) => {
        return db.select('image').from('category').where('idCategory',categoryId)
    },
    updateCategoryName:(categoryId,categoryName) => {
        return db('category').where('idCategory',categoryId).update('nameCategory',categoryName)
    },
    updateCategoryImage:(categoryId,image) => {
        return db('category').where('idCategory',categoryId).update('image',image)
    },
    deleteCategory: (categoryId) => {
        return db('category').where('idCategory',categoryId).del()
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
    getClientOrderToTrack: (clientId,orderId) => {
        return db.select('status').from('order').where('userId',clientId).andWhere('orderId',orderId)
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