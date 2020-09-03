const statistics = require('../src/repository/statisticsRepository.js');
const knex = require('../src/db');
const assert = require('assert');
const sinon = require('sinon');

describe('statisticsRepository', () => {
    let sandbox = sinon.createSandbox();

    beforeEach(async function () {
        sandbox.stub(Date, 'now').returns(new Date("2020-09-01T00:00:00Z"));
        await knex.raw('TRUNCATE TABLE statistics, libraries CASCADE');
        await knex.raw('TRUNCATE TABLE user_libraries, libraries CASCADE');
    });

    afterEach(function () {
        sandbox.restore();
    });

    describe('#findStatistics()', () => {
        it('should return the rows selected', async () => {
            
            const rows = [
                { "open_issues_count": 10, "created_at": new Date("2020-08-31T03:00:00.000Z") },
                { "open_issues_count": 15, "created_at": new Date("2020-08-30T03:00:00.000Z") }
            ];

            await knex('libraries').insert({id: 1, repo: 'repository', owner: 'test'});
            await knex('user_libraries').insert({lib_id: 1, user: 'joao'});
            await knex('statistics').insert([
                                        {lib_id: 1, open_issues_count: 10, created_at: '2020-08-31'},
                                        {lib_id: 1, open_issues_count: 15, created_at: '2020-08-30'}
                                    ]);
            
            const selectedRows = await statistics.findStatistics('test', 'repository', 'joao');

            assert.deepEqual(rows, selectedRows);
        });
    });

    describe('#insertStatistics()', () => {
        it('should return the row inserted', async () => {
            await knex('libraries').insert({id: 1, repo: 'repository', owner: 'test'});
            await knex('user_libraries').insert({lib_id: 1, user: 'joao'});
            const rows = await statistics.insertStatistics(1, 25);
            const selectedRows = await knex.select('lib_id', 'open_issues_count', 'created_at').from('statistics');
            assert.deepEqual(rows, selectedRows);
        });
    });
});