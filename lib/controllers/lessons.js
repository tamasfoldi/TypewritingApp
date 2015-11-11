/// <reference path="../../references.ts" />
var Lesson = require("../models/lessonSchema.js");
exports.query = function (req, res, next) {
    Lesson.find(function (err, lessons) {
        if (err) {
            return next(err);
        }
        res.json(lessons);
    });
};
exports.show = function (req, res, next) {
    Lesson.findOne({ "id": req.params.lessonId }, function (err, post) {
        if (err) {
            return next(err);
        }
        res.json(post);
    });
};
//# sourceMappingURL=lessons.js.map