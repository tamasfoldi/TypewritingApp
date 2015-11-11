/// <reference path="../../references.ts" />

var Lesson = require("../models/lessonSchema.js");

/* GET /api/lessons listig. */
exports.query = function (req, res, next) {
    Lesson.find(function (err, lessons) {
        if (err) {
            return next(err);
        }
        res.json(lessons);
    });
};

/* GET /api/lessons/:id */
exports.show = function(req, res, next) {
    Lesson.findOne({"id" : req.params.lessonId}, function (err, post) {
        if (err) {
            return next(err);
        }
        res.json(post);
    });
};
