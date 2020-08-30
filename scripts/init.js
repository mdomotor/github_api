const pg = require('pg');
const client = new pg.Client('postgres://root:pass@localhost/postgres')

client.connect();

const createQuery = `CREATE TABLE searches (
        "owner" character varying(100) NOT NULL, 
        "repo" character varying(100) NOT NULL, 
        "user" character varying(100) NOT NULL,
        "created_at" timestamp NOT NULL
    );`;

client.query(createQuery).then(res => {
    console.log('Table is successfully created');
}).finally(() => client.end());
