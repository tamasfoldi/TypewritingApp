System.register(["express", "path", "express-jwt", "mongodb", "body-parser"], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var express, path, jwt, mongodb_1, bodyParser;
    var app, dbConn, jwtCheck, renderIndex;
    return {
        setters:[
            function (express_1) {
                express = express_1;
            },
            function (path_1) {
                path = path_1;
            },
            function (jwt_1) {
                jwt = jwt_1;
            },
            function (mongodb_1_1) {
                mongodb_1 = mongodb_1_1;
            },
            function (bodyParser_1) {
                bodyParser = bodyParser_1;
            }],
        execute: function() {
            app = express();
            dbConn = 'mongodb://admin:MAcsek24@ds023560.mlab.com:23560/typewritingapp';
            jwtCheck = jwt({
                secret: new Buffer('1Jl2avFWtDPzXN3uJc9WOeXNKUiTNuTHHGWevec-8F6QcyIyZI3-VpdbGXzi-1M9', 'base64'),
                audience: 'nAG6Yz8t5KQu07YukjV83Wh94hOYiR4T'
            });
            app.use('/app', express.static(path.resolve(__dirname, '../app')));
            app.use('/node_modules', express.static(path.resolve(__dirname, '../node_modules')));
            app.use(bodyParser.json()); // for parsing application/json
            app.use(bodyParser.urlencoded({ extended: true }));
            renderIndex = function (req, res) {
                res.sendFile(path.resolve(__dirname, '../index.html'));
            };
            app.use('/api', jwtCheck);
            app.get('/api/user/:email', function (req, res) {
                mongodb_1.MongoClient.connect(dbConn, function (err, db) {
                    if (err) {
                        throw err;
                    }
                    db.collection('users').find({ email: req.params.email }).limit(1).toArray(function (err, result) {
                        if (err) {
                            throw err;
                        }
                        var user = result[0];
                        if (!user.lastCompletedLessonId && user.lastCompletedLessonId !== 0) {
                            user.lastCompletedLessonId = -1;
                        }
                        res.status(200).send({ "username": user.username, "email": user.email, "password": user.password, "lastCompletedLessonId": user.lastCompletedLessonId });
                        db.close();
                    });
                });
            });
            app.put('/api/user/:email', function (req, res) {
                mongodb_1.MongoClient.connect(dbConn, function (err, db) {
                    if (err) {
                        throw err;
                    }
                    db.collection('users').findOneAndUpdate({ email: req.params.email }, { $set: { lastCompletedLessonId: req.body.lastCompletedLessonId } }, function (result) {
                        res.status(200).send(result);
                        db.close();
                    });
                });
            });
            app.get('/*', renderIndex);
            app.listen(3000, function () {
                console.log('Example app listening on port 3000!');
            });
        }
    }
});
//# sourceMappingURL=server.js.map