const jobs = require('./jobs/generateStatisticsJob');
const express = require('express');
const cron = require('node-cron');
const app = express();

// routes
const index = require('./routes/index');
const repoRoute = require('./routes/repoRoute');
const userLibrariesRoute = require('./routes/userLibrariesRoute');

app.use('/', index);
app.use('/repo', repoRoute);
app.use('/userLibraries', userLibrariesRoute);

cron.schedule('0 5 * * *', async () => {
    result = await jobs.saveStatitics();
    console.log(result);
});

module.exports = app;