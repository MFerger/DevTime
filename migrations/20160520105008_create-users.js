
exports.up = function(knex, Promise) {
  return knex.schema.createTable('users', table => {
            table.increments();
            table.string('phone').notNullable().unique();
            table.string('twilio_id').notNullable().unique();
            table.string('token').notNullable().unique();
            table.string('name').notNullable().unique();
            table.integer('q1');
            table.integer('q2');
            table.integer('q3');
            table.integer('q4');
            table.integer('time').unsigned();
    })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('users');
};
