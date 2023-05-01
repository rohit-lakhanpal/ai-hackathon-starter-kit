// Path: /routes/info/index.js
var express = require('express');
var router = express.Router();
const { getInfo } = require('../../utilities/openai');

/* GET /api/openai/models */
router.get('/', async (req, res, next) => {  
  res.json(await getInfo());  
});

module.exports = router;
