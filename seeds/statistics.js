
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('statistics').del()
    .then(function () {
      // Inserts seed entries
      return knex('statistics').insert([
        {lib_id: 1, open_issues_count: 550, created_at: '2020-08-31'},
        {lib_id: 1, open_issues_count: 558, created_at: '2020-08-30'},
        {lib_id: 1, open_issues_count: 551, created_at: '2020-08-29'},
        {lib_id: 1, open_issues_count: 570, created_at: '2020-08-28'},
        {lib_id: 1, open_issues_count: 576, created_at: '2020-08-27'},
        {lib_id: 1, open_issues_count: 568, created_at: '2020-08-26'},
        {lib_id: 1, open_issues_count: 560, created_at: '2020-08-25'},
        {lib_id: 1, open_issues_count: 555, created_at: '2020-08-24'},
        {lib_id: 1, open_issues_count: 545, created_at: '2020-08-23'},
        {lib_id: 1, open_issues_count: 556, created_at: '2020-08-21'},
        {lib_id: 2, open_issues_count: 1200, created_at: '2020-08-31'},
        {lib_id: 2, open_issues_count: 1225, created_at: '2020-08-30'},
        {lib_id: 2, open_issues_count: 1195, created_at: '2020-08-29'},
        {lib_id: 2, open_issues_count: 1210, created_at: '2020-08-28'},
        {lib_id: 2, open_issues_count: 1180, created_at: '2020-08-27'}
      ]);
    });
};
