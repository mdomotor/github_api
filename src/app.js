const express = require('express');
const app = express();
const router = express.Router();
const knex = require('../knex/knex.js');

// Rotas
const index = require('./routes/index');
const repoRoute = require('./routes/repoRoute');

app.use('/', index);
app.use('/repo', repoRoute);

module.exports = app;