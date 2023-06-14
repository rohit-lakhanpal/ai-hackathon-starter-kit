// Path: /routes/info/index.js
var express = require('express');
var router = express.Router();
const config = require('../../config/config');

/* GET /api/info */
router.get('/', function(req, res, next) {  
  res.json({app: config.values.app});  
});

module.exports = router;
