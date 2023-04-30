// Path: /app.js
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const fs = require('fs');
const config = require('./utilities/config');

config.validators.validate(); // Validate if configurations are set approporiately

var app = express();
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(express.static(path.join(__dirname, 'public')));

app.use('/', require('./routes/index'));

var api = '/api';
app.use(`${api}/status`, require('./routes/status/index'));
app.use(`${api}/info`, require('./routes/info/index'));
app.use(`${api}/speech/token`, require('./routes/speech/token'));

// catch 404 and forward to error handler
// app.use(function(req, res, next) {
//     res.sendFile(path.resolve(__dirname, 'public', 'index.html'));
// });
app.get('*', (req, res,) => {    
    if (req.path.startsWith(api)) {        
        res.status(404).json({ error: 'Not found', path: req.path, method: req.method });
        return;
    } 

    if(!fs.existsSync('./public')) {
        res.status(404).json({message: 'Your ui has not been built yet!'});
        return;
    } else {
        res.sendFile(path.resolve(__dirname, 'public', 'index.html'));
        return;
    }
});

module.exports = app;