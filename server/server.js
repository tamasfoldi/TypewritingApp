var express = require('express');
var path = require('path');
var app = express();

app.use('/app', express.static(path.resolve(__dirname, '../app')));
app.use('/node_modules', express.static(path.resolve(__dirname, '../node_modules')));

var renderIndex = function (req, res) {
    res.sendFile(path.resolve(__dirname, '../index.html'));
};

app.post('/api/user/login', function (req, res) {
    res.send({ "id_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiYWRtaW4iOnRydWUsImV4cCI6IjE0NjAzMTk5NjkifQ.ouX3YPsmlZvV9JOM6g4i8ApwxDSxUnMt-NLJrRuDs6g" });
});

app.get('/*', renderIndex);

app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});