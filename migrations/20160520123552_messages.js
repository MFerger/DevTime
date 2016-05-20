
exports.up = function(knex, Promise) {
    return knex.schema.createTable('messages', table => {
            table.increments();
            table.integer('conversation_id').unsigned().references('id').inTable('conversations').onDelete('cascade').onUpdate('cascade');
            table.string('message');
            table.timestamp('created_at').notNullable().defaultTo(knex.raw('now()'));
    });
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('messages');
};
