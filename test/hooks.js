const knex = require('../src/db');

exports.mochaHooks = {
    afterAll(done) {
        knex.destroy();
        done();
    },
};