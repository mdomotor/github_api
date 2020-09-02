const knex = require('../db');

async function findStatistics(owner, repo, user) {
  resp = await knex('statistics')
                   .join('libraries', 'statistics.lib_id', 'libraries.id')
                   .join('user_libraries', 'libraries.id', 'user_libraries.lib_id')
                   .select('statistics.open_issues_count', 'statistics.created_at')
                   .where({ owner, repo, user });
  return resp;
}

async function insertStatistics(lib_id, open_issues_count) {
  const created_at = new Date().toISOString().slice(0,10);
  resp = await knex('statistics').insert({lib_id, open_issues_count, created_at}).returning(['lib_id', 'open_issues_count', 'created_at']);
  return resp;
}

module.exports = { findStatistics, insertStatistics };