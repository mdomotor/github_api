const knex = require('../db');

async function findStatistics(owner, repo, user) {
  resp = await knex('statistics')
                   .join('libraries', 'statistics.lib_id', 'libraries.id')
                   .select('statistics.open_issues_count', 'statistics.created_at')
                   .where({ owner, repo, user });
  return resp;
}

module.exports = { findStatistics };