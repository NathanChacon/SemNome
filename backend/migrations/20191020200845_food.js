exports.up = async function(knex) {
    return  await knex.schema.createTableIfNotExists('food', function(table) {
        table.increments('idFood').primary().unsigned()
        table.string('foodName',40).notNull()
        table.string('foodDescription',200)
        table.string('image',1200).notNull()
        table.decimal('price',6).notNull()
        table.integer('idcat').unsigned()
        table.foreign('idcat').references('idCategory').inTable('category').onDelete('CASCADE')
    })
};

exports.down = async function(knex) {
    return await knex.schema.dropTableIfExists('food')
};