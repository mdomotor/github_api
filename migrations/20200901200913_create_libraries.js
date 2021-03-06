
exports.up = function(knex) {
    return knex.schema.createTable('libraries', (table) => {
        table.increments('id').primary();
        table.string('owner').notNullable();
        table.string('repo').notNullable();
    });
    
};

exports.down = function(knex) {
    return knex.schema.dropTable('libraries');
};
