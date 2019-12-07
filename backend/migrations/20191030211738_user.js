
exports.up = async function(knex, Promise) {
    return await knex.schema.createTableIfNotExists('user',function (table){
        table.string('userID').primary()
        table.string('name', 100).notNull()
        table.string('email', 300).unique().notNull()
        table.string('neighborhood')
        table.string('street')
        table.string('type')
    })
};

exports.down = async function(knex, Promise) {
    return await knex.schema.dropTableIfExists('user')
};
