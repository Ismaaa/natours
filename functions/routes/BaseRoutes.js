// libs
const express = require('express');

// handlers
const { home } = require('../controllers/BaseController');

// router
const router = express.Router();

// routes
router.route('/').get(home);

module.exports = router;
