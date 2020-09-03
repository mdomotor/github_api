const github = require('../services/githubService');
const search = require('../repository/searchesRepository');
const statistics = require('../repository/statisticsRepository');

async function getIssues (req, res, next) {
    try {
        // getting issues informations
        const openIssues = await github.getOpenIssues(req.params.owner, req.params.repo);
        const openIssueTimes = openIssues > 0 ? await github.getIssuesTimes(req.params.owner, req.params.repo, openIssues) : {};
        
        res.json({ 
            openIssues: openIssues,
            openIssuesAvg: openIssueTimes.avg || null,
            openIssueStd: openIssueTimes.std || null
        });
    } catch (error) {
        res.status(error.statusCode).send({ 
            message: error.message
        });

        return next();
    }
    
    // save search: project and user
    const rows = await search.insertSearch(req.params.owner, req.params.repo, req.query.user);
};

async function getOpenIssuesHistory(req, res, next) {
    // find history of open issues
    const rows = await statistics.findStatistics(req.params.owner, req.params.repo, req.query.user);
    
    res.json({ 
        openIssuesHistory: rows
    });
}

module.exports = { getIssues, getOpenIssuesHistory };