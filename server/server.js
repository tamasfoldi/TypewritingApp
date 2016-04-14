var express = require('express');
var path = require('path');
var jwt = require('express-jwt');
var app = express();
var mongoose = require('mongoose');
var MongoClient = require('mongodb').MongoClient;
var dbConn = 'mongodb://admin:MAcsek24@ds023560.mlab.com:23560/typewritingapp';
var bodyParser = require('body-parser');

var jwtCheck = jwt({
    secret: new Buffer('1Jl2avFWtDPzXN3uJc9WOeXNKUiTNuTHHGWevec-8F6QcyIyZI3-VpdbGXzi-1M9', 'base64'),
    audience: 'nAG6Yz8t5KQu07YukjV83Wh94hOYiR4T'
});

app.use('/app', express.static(path.resolve(__dirname, '../app')));
app.use('/node_modules', express.static(path.resolve(__dirname, '../node_modules')));
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true }));

var renderIndex = function (req, res) {
    res.sendFile(path.resolve(__dirname, '../index.html'));
};

app.use('/api', jwtCheck);

app.get('/api/user/:email', function (req, res) {
    MongoClient.connect(dbConn, function (err, db) {
        if (err) {
            throw err;
        }
        db.collection('users').findOne({ email: req.params.email }, function (err, result) {
            if (err) {
                throw err;
            }
            var user = result;
            if (!user.lastCompletedLessonId) {
                user.lastCompletedLessonId = -1;
            }
            res.status(200).send({ "username": user.username, "email": user.email, "password": user.password, "lastCompletedLessonId": user.lastCompletedLessonId });
        });
    });
});

app.put('/api/user/:email', function (req, res) {
    MongoClient.connect(dbConn, function (err, db) {
        if (err) {
            throw err;
        }
        db.collection('users').findOne({ email: req.params.email }, function (err, result) {
            if (err) {
                throw err;
            }
            var user = result;
            if (user.lastCompletedLessonId >= req.body.lastCompletedLessonId || req.body.lastCompletedLessonId === undefined) {
                res.status(200).send("{}");
            } else {
                db.collection('users').updateOne({ email: req.params.email }, { $set: { lastCompletedLessonId: req.body.lastCompletedLessonId } }, function (err, result) {
                    if (err) {
                        throw err;
                    }
                    res.status(200).send(result);
                });
            }
        });
    });
});

app.get('/*', renderIndex);

app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});