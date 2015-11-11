///...
// modules =================================================
var express = require('express');
var mongoose = require('mongoose');
var path = require('path');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var passport = require('passport');
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);
var methodOverride = require('method-override');
var fs = require('fs');
// configuration ===========================================

// config files
var db = require('./lib/config/database');
var app = express();


mongoose.connect(db.url, function (err) {
  if (err) {
    console.log('MongoDB connection error', err);
  } else {
    console.log('MongoDB connection successful');
  }
});

// // Bootstrap models
// var modelsPath = path.join(__dirname, 'lib/models');
// fs.readdirSync(modelsPath).forEach(function (file) {
//   require(modelsPath + '/' + file);
// });

var pass = require('./lib/config/passport');

// App Configuration
// app.configure('development', function () {
//   app.use(express.static(path.join(__dirname, '.tmp')));
//   app.use(express.static(path.join(__dirname, 'app')));
//   app.set('views', __dirname + '/app/views');
// });

app.use('/', express.static(path.join(__dirname, '/app/scripts')));
app.use('/scripts', express.static(__dirname + '/node_modules/'));
app.set('views', __dirname + '/app/views');


app.set('view engine', 'ejs');

// cookieParser should be above session
app.use(cookieParser());

// bodyParser should be above methodOverride
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(methodOverride());

// express/mongo session storage
app.use(session({
  name: 'typewriting.login',
  secret: 'typewritingapp',
  resave: true,
  store: new MongoStore({
    url: db.url,
    collection: 'sessions'
  }),
  saveUninitialized: false
}));



app.use(passport.initialize());
app.use(passport.session());

//routes should be at the last

// var users = require("./lib/controllers/users");
// app.post("/api/users", users.create);
// app.get("/api/users/:userId", users.show);
// // lesson Routes
// var lessons = require("./lib/controllers/lessons");
// app.get("/api/lessons", lessons.query);
// app.get("/api/lessons/:lessonId", lessons.show);
// 
// // session Routes
// var auth = require("./lib/config/auth");
// var sessionRoute = require("./lib/controllers/sessions");
// app.get("/api/auth/sessions", auth.ensureAuthenticated, sessionRoute.session);
// app.post("/api/auth/sessions", sessionRoute.login);
// app.delete("/api/auth/sessions", sessionRoute.logout);
// 
// // angular Routes
// app.get("/partials/*", function (req, res) {
//   var requestedView = path.join("./", req.url);
//   res.render(requestedView);
// });
// 
// app.get("/*", function (req, res) {
//   if (req.user) {
//     res.cookie("user", JSON.stringify(req.user.user_info));
//   }
//   res.render("index.ejs");
// });

//Bootstrap routes
require('./lib/config/routes')(app);

// start app ===============================================
// startup our app at http://localhost:1337
var port = process.env.port || 1337

app.listen(port);

console.log("App listening on port " + port);