
exports.up = async function(knex) {
  return  await knex.schema.createTableIfNotExists('category', function(table) {
      table.increments('idCategory').primary()
      table.string('nameCategory',40).unique().notNull()
      table.string('image',1200).notNull()
  })
};

exports.down = async function(knex) {
return await knex.schema.dropTableIfExists('category')
};
