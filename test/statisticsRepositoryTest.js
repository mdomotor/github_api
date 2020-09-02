const statistics = require('../src/repository/statisticsRepository.js');
const knex = require('../src/db');
const assert = require('assert');

describe('statisticsRepository', () => {
    
    beforeEach(async function () {
        await knex.raw('TRUNCATE TABLE statistics, libraries CASCADE');
    });

    afterEach(function () {
        knex.destroy();
    });

    describe('#findStatistics()', () => {
        it('should return the row inserted', async () => {
            
            const rows = [
                { "open_issues_count": 10, "created_at": new Date("2020-08-31T03:00:00.000Z") },
                { "open_issues_count": 15, "created_at": new Date("2020-08-30T03:00:00.000Z") }
            ];

            await knex('libraries').insert({id: 1, repo: 'repository', owner: 'test', user: 'joao'});
            await knex('statistics').insert([
                                        {lib_id: 1, open_issues_count: 10, created_at: '2020-08-31'},
                                        {lib_id: 1, open_issues_count: 15, created_at: '2020-08-30'}
                                    ]);

            const selectedrows = await statistics.findStatistics('test', 'repository', 'joao');

            assert.deepEqual(rows, selectedrows);
        });
    });
});