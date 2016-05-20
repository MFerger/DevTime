
exports.seed = function(knex, Promise) {
  return Promise.join(
    // Deletes ALL existing entries
    knex('conversations').del(),

    // Inserts seed entries
    knex('conversations').insert({ user_id: 1, receiver_num: '+17165725325'}),
    knex('conversations').insert({ user_id: 2, receiver_num: '+17165725325'}),
    knex('conversations').insert({ user_id: 1, receiver_num: '+13175907767'})
  );
};
