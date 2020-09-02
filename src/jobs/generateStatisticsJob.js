const github = require('../services/githubService');
const statistics = require('../repository/statisticsRepository.js');
const user_libraries = require('../repository/userLibrariesRepository.js');

async function saveStatitics(req, res, next) {
    // find repositories to search issues
    const repos = await user_libraries.findDistinctLibraries();
    
    const promises = repos.map(async r => {
        // getting statistics for each repostory
        const openIssues = await github.getOpenIssues(r.owner, r.repo);
        
        // saving statistics
        rows = await statistics.insertStatistics(r.lib_id, openIssues);
        return rows;
    });

    // getting statistics for all repostories
    let promisesResponse;
    promisesResponse = await Promise.all(promises);
    
    return promisesResponse;
}

module.exports = { saveStatitics };