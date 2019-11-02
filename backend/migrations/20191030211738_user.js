
exports.up = function(knex, Promise) {
    return knex.schema.createTableIfNotExists('user',function (table){
        table.string('userID').primary()
        table.string('name', 100).notNull()
        table.string('email', 300).unique().notNull()
        table.string('neighborhood')
        table.string('street')
        table.string('type')
    })
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists('user')
};
