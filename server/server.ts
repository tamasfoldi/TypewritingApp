import * as express from "express";
import * as path from "path";
import * as jwt from "express-jwt";
let app = express();
import { MongoClient  } from "mongodb";
let dbConn = 'mongodb://admin:MAcsek24@ds023560.mlab.com:23560/typewritingapp';
import * as bodyParser from "body-parser";

let jwtCheck = jwt({
    secret: new Buffer('1Jl2avFWtDPzXN3uJc9WOeXNKUiTNuTHHGWevec-8F6QcyIyZI3-VpdbGXzi-1M9', 'base64'),
    audience: 'nAG6Yz8t5KQu07YukjV83Wh94hOYiR4T'
});

app.use('/app', express.static(path.resolve(__dirname, '../app')));
app.use('/node_modules', express.static(path.resolve(__dirname, '../node_modules')));
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true }));

let renderIndex = (req, res) => {
    res.sendFile(path.resolve(__dirname, '../index.html'));
};

app.use('/api', jwtCheck);

app.get('/api/user/:email', (req, res) => {
    MongoClient.connect(dbConn, (err, db) => {
        if (err) {
            throw err;
        }
        db.collection('users').find({ email: req.params.email }).limit(1).toArray((err, result) => {
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
    MongoClient.connect(dbConn, function (err, db) {
        if (err) {
            throw err;
        }
        db.collection('users').findOneAndUpdate({ email: req.params.email }, { $set: { lastCompletedLessonId: req.body.lastCompletedLessonId } }, (result) => {
            res.status(200).send(result);
            db.close();
            
        });
    });
});

app.get('/*', renderIndex);

app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});