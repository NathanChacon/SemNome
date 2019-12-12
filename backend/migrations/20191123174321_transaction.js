

exports.up = async function(knex, Promise) {
    return await knex.schema.createTableIfNotExists('transaction',function(table){
        table.string('orderId').primary()
        table.string('userId')
        table.string('authorizationId').unique()
        table.string('captureId').unique()
        table.foreign('userId').references('user.userID')
    })
};

exports.down = async function(knex, Promise) {
    return await knex.schema.dropTableIfExists('transaction')
};
