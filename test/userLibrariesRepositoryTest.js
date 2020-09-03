const userLibraries = require('../src/repository/userLibrariesRepository.js');
const knex = require('../src/db');
const assert = require('assert');

describe('userLibrariesRepository', () => {
    
    beforeEach(async function () {
        await knex.raw('TRUNCATE TABLE user_libraries, libraries CASCADE');
    });

    describe('#findDistinctLibraries()', () => {
        it('should return the distinct libraries', async () => {
            const rows = [{lib_id: 1, repo: 'repository', owner: 'test'}];
            await knex('libraries').insert({id: 1, repo: 'repository', owner: 'test'});
            await knex('user_libraries').insert([{lib_id: 1, user: 'joao'}, {lib_id: 1, user: 'joaozinho'}]);
            const selectedRows = await userLibraries.findDistinctLibraries();
            assert.deepEqual(rows, selectedRows);
        });
    });
    
    describe('#insertUserLibrary()', () => {
        it('should return the rows inserted', async () => {
            await knex('libraries').insert({id: 1, repo: 'repository', owner: 'test'});
            const rows = await userLibraries.insertUserLibrary(1, 'joao');
            const selectedRows = await knex.select('lib_id', 'user').from('user_libraries');
            assert.deepEqual(rows, selectedRows);
        });
    });

    describe('#deleteUserLibrary()', () => {
        it('should return number of rows deleted', async () => {
            await knex('libraries').insert({id: 1, repo: 'repository', owner: 'test'});
            await knex('user_libraries').insert({lib_id: 1, user: 'joao'});
            const deletedRows = await userLibraries.deleteUserLibrary('test', 'repository', 'joao');
            assert.deepEqual(1, deletedRows);
        });
    });
});