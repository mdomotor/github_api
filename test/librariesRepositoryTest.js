const libraries = require('../src/repository/librariesRepository.js');
const knex = require('../src/db');
const assert = require('assert');

describe('librariesRepository', () => {
    
    beforeEach(async function () {
        await knex.raw('TRUNCATE TABLE libraries CASCADE');
    });

    describe('#selectLibraries()', () => {
        it('should return the id of selected row', async () => {
            const rows = [{id: 1}];
            await knex('libraries').insert({id: 1, repo: 'repository', owner: 'test'});
            const selectedRows = await libraries.selectLibraries('test', 'repository');
            assert.deepEqual(rows, selectedRows);
        });
    });

    describe('#insertLibrary()', () => {
        it('should return the row inserted', async () => {
            const rows = await libraries.insertLibrary('repository', 'test');
            const selectedRows = await knex.select('id', 'owner', 'repo').from('libraries');
            assert.deepEqual(rows, selectedRows);
        });
    });
});