const express = require('express');
const router = express.Router();
const controller = require('../controllers/userLibrariesController');

router.post('/:owner/:repo/insert', controller.saveUserLibrary);
router.delete('/:owner/:repo/delete', controller.deleteUserLibrary);

module.exports = router;