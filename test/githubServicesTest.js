const github = require('../src/services/githubService');
const RequestError = require('../src/exceptions/requestError');
const moxios = require('moxios');
const assert = require('assert');
const sinon = require('sinon');

describe('githubService', () => {
    let sandbox = sinon.createSandbox();

    beforeEach(function () {
        // import and pass your custom axios instance to this method
        moxios.install()
        sandbox.stub(Date, 'now').returns(new Date("2020-08-12T00:00:00Z"));
    })

    afterEach(function () {
        // import and pass your custom axios instance to this method
        moxios.uninstall()
        sandbox.restore();
    })

    describe('#getOpenIssues()', () => {
        it('should return open issues count when status is 200', async () => {
            moxios.stubRequest(`https://api.github.com/repos/test/repository`, {
                status: 200,
                response: { open_issues_count: 2 }
            });

            const openIssues = await github.getOpenIssues('test', 'repository');
            assert.strictEqual(openIssues, 2);
        });

        it('should reject the request', async () => {
            moxios.stubRequest(`https://api.github.com/repos/test/repository`, {
                status: 404,
                response: { message: 'Not Found' }
            });

            await assert.rejects(async () => { 
                await github.getOpenIssues('test', 'repository');
            }, (err) => {
                assert.ok(err instanceof RequestError);
                assert.strictEqual(err.message, 'Not Found');
                assert.strictEqual(err.statusCode, 404);
                return true;
            });
        });
    });

    describe('#getIssuesTimes()', () => {
        it('should return avg and std from open issues when status is 200 - 1 pagination', async () => {
            moxios.stubRequest(`https://api.github.com/repos/test/repository/issues?state=open&per_page=100&page=1`, {
                status: 200,
                response: [{ created_at: "2020-08-10T00:00:00Z" }, { created_at: "2020-08-06T00:00:00Z" }, { created_at: "2020-08-08T00:00:00Z" }]
            });

            const timeIssues = await github.getIssuesTimes('test', 'repository', 3);
            assert.strictEqual(timeIssues.avg, 4);
            assert.strictEqual(timeIssues.std, 1.632993161855452);
        });

        it('should return avg and std from open issues when status is 200 - n pagination', async () => {
            moxios.stubRequest(`https://api.github.com/repos/test/repository/issues?state=open&per_page=100&page=1`, {
                status: 200,
                response: [{ created_at: "2020-08-10T00:00:00Z" }, { created_at: "2020-08-06T00:00:00Z" }]
            });

            moxios.stubRequest(`https://api.github.com/repos/test/repository/issues?state=open&per_page=100&page=2`, {
                status: 200,
                response: [{ created_at: "2020-08-08T00:00:00Z" }]
            });

            const timeIssues = await github.getIssuesTimes('test', 'repository', 150);
            assert.strictEqual(timeIssues.avg, 4);
            assert.strictEqual(timeIssues.std, 1.632993161855452);
        });

        it('should reject the request', async () => {
            moxios.stubRequest(`https://api.github.com/repos/test/repository/issues?state=open&per_page=100&page=1`, {
                status: 200,
                response: [{ created_at: "2020-08-10T00:00:00Z" }, { created_at: "2020-08-06T00:00:00Z" }]
            });
            
            moxios.stubRequest(`https://api.github.com/repos/test/repository/issues?state=open&per_page=100&page=2`, {
                status: 404,
                response: { message: 'Not Found' }
            });

            await assert.rejects(async () => { 
                await github.getIssuesTimes('test', 'repository', 150);
            }, (err) => {
                assert.ok(err instanceof RequestError);
                assert.strictEqual(err.message, 'Not Found');
                assert.strictEqual(err.statusCode, 404);
                return true;
            });
        });
    });
})