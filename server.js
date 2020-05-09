var express = require('express');
var path = require('path');
var serveStatic = require('serve-static');
var history = require('connect-history-api-fallback');

app = express();
app.use(serveStatic(__dirname + "/dist"));
app.use(history());

var port = process.env.PORT || 8080;
app.listen(port);
console.log('server started '+ port);