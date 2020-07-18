const express = require('express');
const router = express.Router();
const portfolioData = require('../src/portfolioData');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { portfolioData: portfolioData });
});

module.exports = router;