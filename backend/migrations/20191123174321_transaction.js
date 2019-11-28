
exports.up = function(knex, Promise) {
    return knex.schema.createTableIfNotExists('transaction',function(table){
        table.string('orderId').primary()
        table.string('captureId').unique()
    })
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists('transaction')
};
