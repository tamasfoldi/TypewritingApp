var express = require('express');
var path = require('path');
var jwt = require('jsonwebtoken');
var app = express();

app.use('/app', express.static(path.resolve(__dirname, '../app')));
app.use('/node_modules', express.static(path.resolve(__dirname, '../node_modules')));

var renderIndex = function (req, res) {
    res.sendFile(path.resolve(__dirname, '../index.html'));
};

app.post('/api/user/login', function (req, res) {
    var token = jwt.sign({}, "secret", {expiresIn: 60});
    res.send({ "id_token": token });
});

app.get('/*', renderIndex);

app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});