
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('user_libraries').del()
    .then(function () {
      // Inserts seed entries
      return knex('user_libraries').insert([
        {user: 'test_username', lib_id: 1},
        {user: 'test_username', lib_id: 2},
        {user: 'test_user', lib_id: 2}
      ]);
    });
};
