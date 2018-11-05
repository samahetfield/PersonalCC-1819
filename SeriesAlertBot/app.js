var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var app = express();

var getv = 'status: OK';

app.set('port', (process.env.PORT || 5000));
app.use(express.static(__dirname + '/public'));

app.get('/nodebot',
	function(request, response){response.json(getv)});

app.listen(app.get('port'), function() {
	console.log("Node app is running at localhost:" + app.get('port'));
});

module.exports = app

