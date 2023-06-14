// Path: /routes/status/index.js
var express = require('express');
var router = express.Router();
const config = require('../../config/config');

/* GET /api/status */
router.get('/', function(req, res, next) {  
  res.json({status: '200OK'});  
});

module.exports = router;
