const search = require('../src/repository/searchRepository.js');
const knex = require('../src/db');
const assert = require('assert');
const sinon = require('sinon');

describe('searchRepository', () => {
    let sandbox = sinon.createSandbox();
    
    beforeEach(async function () {
        sandbox.stub(Date, 'now').returns(new Date("2020-08-12T00:00:00Z"));
        await knex('searches').truncate();
    });

    afterEach(function () {
        sandbox.restore();
        knex.destroy();
    });

    describe('#insertSearch()', () => {
        it('should return the row inserted', async () => {
            const rows = await search.insertSearch('test', 'repository', 'joao');
            const selectedRows = await knex.select().from('searches');
            assert.deepEqual(rows, selectedRows);
        });
    });
});