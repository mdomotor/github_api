const express = require('express');
const router = express.Router();
const controller = require('../controllers/repoController');

router.get('/:owner/:repo', controller.getIssues);
router.get('/:owner/:repo/history', controller.getOpenIssuesHistory);

module.exports = router;