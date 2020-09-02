const knex = require('../src/db');

exports.mochaHooks = {
    afterAll(done) {
        console.log('hooks');
        knex.destroy();
        done();
    },
};