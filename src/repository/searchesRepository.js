const knex = require('../db');

async function insertSearch(owner, repo, user) {
  const value = {owner, repo, user, created_at: new Date(Date.now())};
  resp = await knex('searches').insert(value).returning(['owner', 'repo', 'user','created_at']);
  return resp;
}

module.exports = { insertSearch };