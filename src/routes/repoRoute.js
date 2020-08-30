const express = require('express');
const router = express.Router();
const controller = require('../controllers/repoController');

router.get('/:owner/:repo', controller.getRepo);

module.exports = router;