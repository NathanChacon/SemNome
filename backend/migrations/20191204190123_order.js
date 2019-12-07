
exports.up = async function(knex, Promise) {
    return await knex.schema.createTableIfNotExists('order',function(table){
        table.increments('orderId').primary().unsigned()
        table.string('userId')
        table.string('address')
        table.string('method')
        table.string('description')
        table.decimal('change',14,2)
        table.decimal('amount',14,2)
        table.string('status').defaultTo('delivered')
    })
};

exports.down = async function(knex, Promise) {
     return await  knex.schema.dropTableIfExists('order')
};
