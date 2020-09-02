const knex = require('../db');

async function findDistinctLibraries() {
  resp = await knex('user_libraries')
                   .distinct('lib_id', 'repo', 'owner')
                   .join('libraries', 'user_libraries.lib_id', 'libraries.id');
  return resp;
}

async function insertUserLibrary(owner, repo, user) {
  const created_at = new Date().toISOString().slice(0,10);
  resp = await knex('user_libraries').insert({owner, repo, user}).returning(['owner', 'repo', 'user']);
  return resp;
}

async function deleteUserLibrary(lib_id, user) {
  const created_at = new Date().toISOString().slice(0,10);
  await knex('user_libraries').del().where({lib_id, user});
  return 0;
}

module.exports = { findDistinctLibraries, insertUserLibrary, deleteUserLibrary };