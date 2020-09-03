const knex = require('../db');

async function selectLibraries(owner, repo) {
  resp = await knex('libraries').select('id').where({ owner, repo });
  return resp;
}

async function insertLibrary(owner, repo) {
  resp = await knex('libraries').insert({owner, repo}).returning(['id', 'owner', 'repo']);
  return resp;
}

module.exports = { selectLibraries, insertLibrary };