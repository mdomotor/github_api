const pg = require('pg');
const client = new pg.Client('postgres://root:pass@localhost/postgres')

client.connect();

const selectQuery = `SELECT * FROM searches;`;

client.query(selectQuery).then(res => {
    console.log(res.rows);
}).finally(() => client.end());
