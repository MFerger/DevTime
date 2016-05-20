
exports.up = function(knex, Promise) {
    return knex.schema.createTable('conversations', table => {
            table.increments();
            table.integer('user_id').unsigned().references('id').inTable('users').onDelete('cascade').onUpdate('cascade');
            table.string('receiver_num');
        });
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('conversations');
};
