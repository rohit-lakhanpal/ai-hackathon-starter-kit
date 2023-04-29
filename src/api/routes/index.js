// Path: /routes/index.js
var express = require('express');
var router = express.Router();
var fs = require('fs');

/* GET / */
router.get('/', function(req, res, next) {  
  try {    
    if(!fs.existsSync('./public')) {
      res.json({message: 'Your ui has not been built yet!'});
    } else {
      res.render('index');  
    }    
  } catch (err) {    
    res.json({message: 'Your ui has not been built yet!'});
  }
});

module.exports = router;
