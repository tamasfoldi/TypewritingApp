/// <reference path="../../references.ts" />

var passport = require("passport");

/* GET /api/auth/session */
exports.session = function(req, res){
  res.send(req.user.user_info);
};

/* POST /api/auth/session */
exports.login = function(req, res, next) {
  passport.authenticate("local", function(err, user, info) {
    if (err) {
      console.log("err " + err);
      res.status(401).send({error: info.message});
      return next(err);
    }
    if (!user) {
      res.status(401).send({error: info.message});
      return next(err);
    }
    req.logIn(user, function(error) {
      if (error) {
        console.log(user, error);
        res.status(401).send({error: info.message});
        return next(error);
      }
      res.status(200).send(req.user.user_info);
    });
  })(req, res, next);
};

/* DELETE /api/auth/session */
exports.logout = function(req, res){
  if (req.user) {
    req.logout();
    res.sendStatus(200);
  } else {
    res.status(400).send({ error: "Not logged in" });
  }
};
