
exports.up = function(knex) {
    return knex.schema.createTableIfNotExists('category', function(table) {
        table.increments('idCategory').primary()
        table.string('nameCategory',40).unique().notNull()
        table.string('image',1200).notNull()
    })
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('category')
};
