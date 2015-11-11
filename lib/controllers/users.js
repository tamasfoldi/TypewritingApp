/// <reference path="../../references.ts" />
var mongoose = require("mongoose");
var ObjectId = mongoose.Types.ObjectId;
var User = require("../models/userSchema.js");
exports.show = function (req, res, next) {
    var userId = req.params.userId;
    User.findById(ObjectId(userId), function (err, user) {
        if (err) {
            return next(new Error("Failed to load User"));
        }
        if (user) {
            res.send({ username: user.username, profile: user.profile });
        }
        else {
            res.status(404).send({ error: "User not found" });
        }
    });
};
exports.create = function (req, res, next) {
    var newUser = new User(req.body);
    newUser.provider = "local";
    newUser.save(function (err) {
        if (err) {
            return res.status(400).send({ error: err });
        }
        req.logIn(newUser, function (error) {
            if (error) {
                return next(error);
            }
            return res.status(200).send(newUser.user_info);
        });
    });
};
//# sourceMappingURL=users.js.map