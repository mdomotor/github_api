const knex = require('../db');

async function findDistinctLibraries() {
  resp = await knex('user_libraries')
                   .distinct('lib_id', 'repo', 'owner')
                   .join('libraries', 'user_libraries.lib_id', 'libraries.id');
  return resp;
}

async function insertUserLibrary(lib_id, user) {
  resp = await knex('user_libraries').insert({lib_id, user}).returning(['lib_id', 'user']);
  return resp;
}

async function deleteUserLibrary(owner, repo, user) {
  resp = await knex.del().from(knex.raw('user_libraries USING libraries'))
                    .where(knex.raw('user_libraries.lib_id = libraries.id'))
                    .andWhere({owner, repo, user});
  return resp;
}

module.exports = { findDistinctLibraries, insertUserLibrary, deleteUserLibrary };