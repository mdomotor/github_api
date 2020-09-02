
exports.up = function(knex) {
    return knex.schema.createTable('statistics', (table) => {
        table.integer('lib_id');
        table.integer('open_issues_count').notNullable();
        table.date('created_at').notNullable();
        table.foreign('lib_id').references('libraries.id')
    });
    
};

exports.down = function(knex) {
    return knex.schema.dropTable('statistics');
};
