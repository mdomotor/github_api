const jobs = require('./jobs/generateStatisticsJob');
const express = require('express');
const cron = require('node-cron');
const app = express();

// routes
const index = require('./routes/index');
const repoRoute = require('./routes/repoRoute');

app.use('/', index);
app.use('/repo', repoRoute);

cron.schedule('*/1 * * * *', async () => {
    result = await jobs.saveStatitics();
    console.log(result);
});

module.exports = app;