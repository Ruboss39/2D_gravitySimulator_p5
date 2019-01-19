console.log('server is up running');

var express = require('express');
var app = express();
var server = app.listen(1337, updateLog());

function updateLog() {
    console.log('updating...')
}

app.use(express.static('public'));