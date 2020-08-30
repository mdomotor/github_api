const pg = require('pg');
const client = new pg.Client(process.env.DATABASE_URL);

function insertSearch(owner, repo, user) {
  client.connect();
  
  const insertQuery = `INSERT INTO searches VALUES ('${owner}', '${repo}', '${user}', now()::timestamp);`;
  console.log(insertQuery);

  client.query(insertQuery).then((err, res) => {
    if (err) {
      console.log(err.stack);
      client.end()
    } else {
      console.log('New row inserted!');
    }
  }).finally(() => client.end());
}

module.exports = { insertSearch };