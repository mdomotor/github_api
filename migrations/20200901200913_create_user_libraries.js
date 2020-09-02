
exports.up = function(knex) {
    return knex.schema.createTable('user_libraries', (table) => {
        table.string('user').notNullable();
        table.integer('lib_id');
        table.foreign('lib_id').references('libraries.id');
    });
    
};

exports.down = function(knex) {
    return knex.schema.dropTable('user_libraries');
};
