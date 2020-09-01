const github = require('../services/githubService');
const search = require('../repository/searchRepository.js');

exports.getRepo = async (req, res, next) => {
    try {
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
    
    //save search: project and user
    const rows = await search.insertSearch(req.params.owner, req.params.repo, req.query.user);
};