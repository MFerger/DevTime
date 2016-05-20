
exports.seed = function(knex, Promise) {
  return Promise.join(
    // Deletes ALL existing entries
    knex('users').del(),

    // Inserts seed entries
    knex('users').insert({ phone: '+13037090688', twilio_id: 'AC97360b975ad105d73717bbe511677539', token: 'fee511e61fa7b8a25918e4915eb45b5f', name: 'Seth', q1: 1, q2: 3, q3: 3, q4: 5 }),
    knex('users').insert({ phone: '+13037754929', twilio_id: 'AC364d7c71b95ce7d31a2496288dc23fa9', token: '5d9242e9e6959daf3d9c8bd232a3dc8a', name: 'Will', q1: 1, q2: 4, q3: 1, q4: 3 })
  );
};
