const RequestError = require('../exceptions/requestError');
const axios = require('axios').default;

const auth = {
    username: process.env.GITHUB_USERNAME,
    password: process.env.GITHUB_TOKEN
}

function baseUrl(owner, repo) {
    return `https://api.github.com/repos/${owner}/${repo}`
}

// getOpenIssues get the amount of open issues (considering pull requests as issues)
async function getOpenIssues(owner, repo) {
    try {
        const response = await axios({method: 'get', url: baseUrl(owner, repo), auth});
        return response.data.open_issues_count;
    } catch (error) {
        const err = new RequestError(error.response.data.message, error.response.status);
        throw err;
    }
    
}

// getIssuesTimes get average and standard deviation from createad issues time to now
async function getIssuesTimes(owner, repo, openIssues) {
    const length = Math.ceil(openIssues/100);
    const pages = Array.from({length}, (_, i) => i + 1);
    const nowDate = new Date(Date.now());
    
    const axiosRequest = (page) => {
        return new Promise((resolve, reject) => {
            axios({method: 'get', url: `${baseUrl(owner, repo)}/issues?state=open&per_page=100&page=${page}`, auth})
            .then(response => {
                createdArr = response.data.map( (issue) => {
                    const convertedCreated_at = new Date(issue.created_at);
                    return getTimeDiff(convertedCreated_at, nowDate)
                });
                resolve(createdArr);
            }).catch(error => {
                reject(error);
            });
        });
    }

    const promises = pages.map(page => axiosRequest(page));

    try {
        const response = (await Promise.all(promises)).flat();
        const avg = getAverage(response);
        const std = getStandardDeviation(response);
        
        return {avg, std};
    } catch (error) {
        const err = new RequestError(error.response.data.message, error.response.status);
        throw err;
    }
}

function getTimeDiff(firstTime, secondTime) {
    const timeDiff = Math.abs(firstTime.getTime() - secondTime.getTime());
    const convertedTimeDiff = (timeDiff / (1000 * 60 * 60 * 24));
    return convertedTimeDiff;
}

function getAverage(arr) {
    const total = arr.reduce((a, b) => a + b, 0);
    return total / arr.length;
}

function getStandardDeviation(arr) {
    const mean = getAverage(arr);
    return Math.sqrt(arr.map(x => Math.pow(x - mean, 2)).reduce((a, b) => a + b) / arr.length)
}

module.exports = { getOpenIssues, getIssuesTimes };