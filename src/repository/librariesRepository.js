const knex = require('../db');

async function findLibraries(owner, repo, user) {
  resp = await knex('libraries')
                   .join('libraries', 'statistics.lib_id', 'libraries.id')
                   .select('statistics.open_issues_count', 'statistics.created_at')
                   .where({ owner, repo, user });
  return resp;
}

async function insertLibrary(owner, repo, user) {
  const created_at = new Date().toISOString().slice(0,10);
  resp = await knex('libraries').insert({owner, repo, user}).returning(['owner', 'repo', 'user']);
  return resp;
}

async function deleteLibrary(owner, repo, user) {
  const created_at = new Date().toISOString().slice(0,10);
  resp = await knex('libraries').insert({lib_id, open_issues_count, created_at}).returning(['lib_id', 'open_issues_count', 'created_at']);
  return resp;
}

module.exports = { findLibraries, insertLibrary, deleteLibrary };