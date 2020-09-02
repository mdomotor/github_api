
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('libraries').del()
    .then(function () {
      // Inserts seed entries
      return knex('libraries').insert([
        {id: 1, owner: 'facebook', repo: 'react'},
        {id: 2, owner: 'angular', repo: 'angular'}
      ]);
    });
};
