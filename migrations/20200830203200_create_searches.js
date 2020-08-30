
exports.up = function(knex) {
  return knex.schema.createTable('searches', (table) => {
    table.increments('id').primary();
    table.string('owner').notNullable();
    table.string('repo').notNullable();
    table.string('user').notNullable();
    table.timestamp('created_at').notNullable();
  });
};

exports.down = function(knex) {
    return knex.schema.dropTable('searches');
};
