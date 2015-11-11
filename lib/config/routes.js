var path = require("path"), auth = require("../config/auth");
module.exports = function (app) {
    var users = require("../controllers/users");
    app.post("/api/users", users.create);
    app.get("/api/users/:userId", users.show);
    var lessons = require("../controllers/lessons");
    app.get("/api/lessons", lessons.query);
    app.get("/api/lessons/:lessonId", lessons.show);
    var session = require("../controllers/sessions");
    app.get("/api/auth/sessions", auth.ensureAuthenticated, session.session);
    app.post("/api/auth/sessions", session.login);
    app.delete("/api/auth/sessions", session.logout);
    app.get("/partials/*", function (req, res) {
        var requestedView = path.join("./", req.url);
        res.render(requestedView);
    });
    app.get("/*", function (req, res) {
        if (req.user) {
            res.cookie("user", JSON.stringify(req.user.user_info));
        }
        res.render("index.ejs");
    });
};
//# sourceMappingURL=routes.js.map