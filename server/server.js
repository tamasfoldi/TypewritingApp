var express = require('express');
var path = require('path');
var jwt = require('express-jwt');
var app = express();

var jwtCheck = jwt({
    secret: new Buffer('1Jl2avFWtDPzXN3uJc9WOeXNKUiTNuTHHGWevec-8F6QcyIyZI3-VpdbGXzi-1M9', 'base64'),
    audience: 'nAG6Yz8t5KQu07YukjV83Wh94hOYiR4T'
});

app.use('/app', express.static(path.resolve(__dirname, '../app')));
app.use('/node_modules', express.static(path.resolve(__dirname, '../node_modules')));

var renderIndex = function (req, res) {
    res.sendFile(path.resolve(__dirname, '../index.html'));
};

app.use('/api/path-you-want-to-protect', jwtCheck);

app.get('/*', renderIndex);

app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});