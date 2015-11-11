/// <reference path="../../../references.ts" />
//# sourceMappingURL=ILesson.js.map;/// <reference path="../../../references.ts" />
//# sourceMappingURL=ISession.js.map;/// <reference path="../../../references.ts" />
//# sourceMappingURL=IUser.js.map;/// <reference path="../../../references.ts" />
var Model;
(function (Model) {
    var Statistic = (function () {
        function Statistic() {
            this.nofMistakes = 0;
            this.typingSpeed = 0;
            this.time = 0;
            this.nofCorrectKeyPresses = 0;
            return this;
        }
        Statistic.prototype.getNofMistakes = function () {
            return this.nofMistakes;
        };
        Statistic.prototype.getNofKeyPresses = function () {
            return this.nofMistakes + this.nofCorrectKeyPresses;
        };
        Statistic.prototype.getTypingSpeed = function () {
            return this.typingSpeed;
        };
        Statistic.prototype.calculateTypingSpeed = function (time) {
            this.typingSpeed = (this.getNofKeyPresses() / (time / 1000)) * (60000 / time);
        };
        Statistic.prototype.getNofCorrectKeyPresses = function () {
            return this.nofCorrectKeyPresses;
        };
        Statistic.prototype.increaseNofCorrectKeyPresses = function () {
            this.nofCorrectKeyPresses++;
        };
        Statistic.prototype.increasNofMistakes = function () {
            this.nofMistakes++;
        };
        Statistic.prototype.getTime = function () {
            return this.time;
        };
        Statistic.prototype.getTimeInSeconds = function () {
            return this.time / 1000;
        };
        Statistic.prototype.setTime = function (time) {
            this.time = time;
        };
        Statistic.prototype.getAccuracy = function () {
            return this.nofCorrectKeyPresses / this.getNofKeyPresses() * 100;
        };
        return Statistic;
    })();
    Model.Statistic = Statistic;
})(Model || (Model = {}));
//# sourceMappingURL=Statistic.js.map;/// <reference path="../../../references.ts" />
var Services;
(function (Services) {
    var AuthenticationService = (function () {
        function AuthenticationService($location, $rootScope, UserSrv, SessionSrv, $cookieStore) {
            this.cookieStore = $cookieStore;
            this.rootScope = $rootScope;
            this.location = $location;
            this.userSrv = UserSrv;
            this.sessionSrv = SessionSrv;
            this.rootScope.currentUser = this.cookieStore.get("user") || null;
            this.cookieStore.remove("user");
        }
        AuthenticationService.prototype.login = function (provider, user) {
            var _this = this;
            return this.sessionSrv.save({
                provider: provider,
                username: user.username,
                password: user.password,
                rememberMe: true
            }).$promise.then(function (userRes) {
                _this.rootScope.currentUser = userRes;
                return userRes;
            });
        };
        AuthenticationService.prototype.logout = function () {
            var _this = this;
            return this.sessionSrv.delete().$promise.then(function (res) {
                _this.rootScope.currentUser = null;
                return res;
            });
        };
        AuthenticationService.prototype.currentUser = function () {
            var _this = this;
            this.sessionSrv.get().$promise.then(function (user) {
                _this.rootScope.currentUser = user;
            }, function (msg) {
                console.log(msg);
            });
        };
        AuthenticationService.prototype.createUser = function (userinfo) {
            var _this = this;
            return this.userSrv.save({
                username: userinfo.username,
                email: userinfo.email,
                password: userinfo.password
            }).$promise.then(function (user) {
                _this.rootScope.currentUser = user;
                return user;
            });
        };
        return AuthenticationService;
    })();
    Services.AuthenticationService = AuthenticationService;
})(Services || (Services = {}));
//# sourceMappingURL=AuthenticationService.js.map;/// <reference path="../../../references.ts" />
//# sourceMappingURL=ILessonService.js.map;/// <reference path="../../../references.ts" />
//# sourceMappingURL=ISessionService.js.map;/// <reference path="../../../references.ts" />
//# sourceMappingURL=IUserService.js.map;// http://blog.aaronholmes.net/writing-angularjs-directives-as-typescript-classes/#backtothebasics read more here
/// <reference path="../../../references.ts" />
var App;
(function (App) {
    var Directives;
    (function (Directives) {
        var LessonResultDirective = (function () {
            function LessonResultDirective() {
                this.transclude = true;
                this.templateUrl = "/App/partials/lesson-result.html";
                this.scope = {};
                LessonResultDirective.prototype.link = function (scope, element, attrs) {
                };
            }
            LessonResultDirective.Factory = function () {
                var directive = function () {
                    return new LessonResultDirective();
                };
                directive.$inject = [];
                return directive;
            };
            return LessonResultDirective;
        })();
        Directives.LessonResultDirective = LessonResultDirective;
    })(Directives = App.Directives || (App.Directives = {}));
})(App || (App = {}));
//# sourceMappingURL=LessonResultDirective.js.map;/// <reference path="../../../references.ts" />
var Controllers;
(function (Controllers) {
    var Statistic = Model.Statistic;
    var LessonCtrl = (function () {
        function LessonCtrl($location, $scope, LessonService) {
            this.location = $location;
            this.lesson = LessonService.get({ id: this.location.search().id });
            this.typedText = "";
            this.scope = $scope;
            this.statistic = new Statistic();
            this.resultIsHidden = true;
            this.textareaIsDisabled = false;
            this.scope.$on("timer-stopped", function (event, data) {
                var scope = event.currentScope;
                scope.LessonCtrl.statistic.calculateTypingSpeed(data.millis);
                scope.LessonCtrl.statistic.setTime(data.millis);
            });
        }
        LessonCtrl.prototype.keyPressHandler = function ($event) {
            var char = String.fromCharCode($event.which);
            var tempTyped = this.typedText + char;
            if (tempTyped !== this.lesson.text.substr(0, tempTyped.length)) {
                $event.preventDefault();
                this.statistic.increasNofMistakes();
            }
            else {
                this.statistic.increaseNofCorrectKeyPresses();
                this.textToBeType = this.lesson.text.substr(this.typedText.length + 1, this.lesson.text.length);
                if (tempTyped === this.lesson.text[0]) {
                    this.scope.$broadcast("timer-start");
                }
                if (tempTyped === this.lesson.text) {
                    this.resultIsHidden = false;
                    this.textareaIsDisabled = true;
                    this.typedText = tempTyped;
                    this.scope.$broadcast("timer-stop");
                }
            }
        };
        return LessonCtrl;
    })();
    Controllers.LessonCtrl = LessonCtrl;
})(Controllers || (Controllers = {}));
//# sourceMappingURL=LessonController.js.map;/// <reference path="../../../references.ts" />
var Controllers;
(function (Controllers) {
    var LoginCtrl = (function () {
        function LoginCtrl($location, AuthenticationService) {
            this.username = "";
            this.password = "";
            this.location = $location;
            this.AuthSrvc = AuthenticationService;
        }
        LoginCtrl.prototype.login = function (LoginForm) {
            var _this = this;
            var username = this.username;
            var password = this.password;
            this.AuthSrvc.login("password", { username: username, password: password })
                .then(function (msg) {
                _this.AuthSrvc.currentUser();
                _this.location.path("/");
            }, function (msg) {
                console.log(msg);
            });
        };
        return LoginCtrl;
    })();
    Controllers.LoginCtrl = LoginCtrl;
})(Controllers || (Controllers = {}));
//# sourceMappingURL=LoginController.js.map;/// <reference path="../../../references.ts" />
var Controllers;
(function (Controllers) {
    var MenuCtrl = (function () {
        function MenuCtrl($location, LessonService, AuthenticationService, $rootScope) {
            this.lessons = new Array();
            this.location = $location;
            this.lessons = LessonService.query();
            this.authSrv = AuthenticationService;
            this.currentUser = $rootScope.currentUser;
        }
        MenuCtrl.prototype.loadLesson = function (id) {
            this.location.path("/lesson");
            this.location.search("id", id);
        };
        MenuCtrl.prototype.logout = function () {
            var _this = this;
            this.authSrv.logout().then(function () {
                _this.location.path("/login");
            }, function (error) {
                console.log(error);
            });
        };
        MenuCtrl.prototype.login = function () {
            this.location.path("/login");
        };
        MenuCtrl.prototype.register = function () {
            this.location.path("/register");
        };
        return MenuCtrl;
    })();
    Controllers.MenuCtrl = MenuCtrl;
})(Controllers || (Controllers = {}));
//# sourceMappingURL=MenuController.js.map;/// <reference path="../../../references.ts" />
var Controllers;
(function (Controllers) {
    var RegCtrl = (function () {
        function RegCtrl($location, AuthenticationService) {
            this.username = "";
            this.mailAddr = "";
            this.password = "";
            this.location = $location;
            this.errors = [];
            this.authSrv = AuthenticationService;
        }
        RegCtrl.prototype.register = function (form) {
            var _this = this;
            var username = this.username;
            var email = this.mailAddr;
            var password = this.password;
            this.authSrv.createUser({ username: username, email: email, password: password }).then(function (msg) {
                _this.location.path("/login");
            }, function (msg) {
                console.log(msg);
            });
        };
        return RegCtrl;
    })();
    Controllers.RegCtrl = RegCtrl;
})(Controllers || (Controllers = {}));
//# sourceMappingURL=RegisterController.js.map;/// <reference path="../../../references.ts" />
var Controllers;
(function (Controllers) {
    var TimerCtrl = (function () {
        function TimerCtrl($interval) {
            this.totalElapsedMs = 0;
            this.elapsedMs = 0;
            this.interval = $interval;
        }
        TimerCtrl.prototype.start = function () {
            if (!this.timerPromise) {
                this.startTime = new Date();
                var starTime = this.startTime;
                var elapsedMs = 0;
                this.timerPromise = this.interval(function () {
                    var now = new Date();
                    elapsedMs = now.getTime() - starTime.getTime();
                }, 31);
            }
        };
        TimerCtrl.prototype.stop = function () {
            if (this.timerPromise) {
                this.interval.cancel(this.timerPromise);
                this.timerPromise = undefined;
                this.totalElapsedMs += this.elapsedMs;
                this.elapsedMs = 0;
            }
        };
        TimerCtrl.prototype.reset = function () {
            this.startTime = new Date();
            this.totalElapsedMs = this.elapsedMs = 0;
        };
        TimerCtrl.prototype.getElapsedMs = function () {
            return this.totalElapsedMs + this.elapsedMs;
        };
        return TimerCtrl;
    })();
    Controllers.TimerCtrl = TimerCtrl;
})(Controllers || (Controllers = {}));
//# sourceMappingURL=TimerController.js.map;/// <reference path="../../references.ts" />
var App;
(function (App) {
    angular.module("typewritingApp", ["ngMessages", "ngRoute", "ngResource", "ngMaterial", "timer", "ngCookies"])
        .factory("LessonService", ["$resource", function ($resource) {
            return $resource("/api/lessons/:id", { id: "@id" });
        }])
        .factory("UserService", ["$resource", function ($resource) {
            return $resource("/api/users/:id", { id: "@id" });
        }])
        .factory("SessionService", ["$resource", function ($resource) {
            return $resource("/api/auth/sessions/", {});
        }])
        .service("AuthenticationService", ["$location", "$rootScope", "UserService", "SessionService", "$cookieStore", Services.AuthenticationService])
        .controller("MenuCtrl", ["$location", "LessonService", "$rootScope", Controllers.MenuCtrl])
        .controller("LessonCtrl", ["$location", "$scope", "LessonService", Controllers.LessonCtrl])
        .controller("TimerCtrl", ["$interval", Controllers.TimerCtrl])
        .controller("RegCtrl", ["$http", "$location", "UserService", Controllers.RegCtrl])
        .controller("LoginCtrl", ["$location", "AuthenticationService", Controllers.LoginCtrl])
        .directive("lessonResult", function () {
        return {
            restrict: "E",
            transclude: true,
            templateUrl: "/partials/lesson-result.ejs"
        };
    })
        .directive("autofocus", ["$timeout", function ($timeout) {
            return {
                restrict: "A",
                link: function ($scope, $element) {
                    $timeout(function () {
                        $element[0].focus();
                    });
                }
            };
        }])
        .directive("sideMenu", function () {
        return {
            restrict: "E",
            transclude: true,
            scope: {},
            controller: Controllers.MenuCtrl,
            controllerAs: "MenuCtrl",
            templateUrl: "/partials/side-menu.ejs"
        };
    })
        .config(function ($routeProvider, $locationProvider) {
        $routeProvider
            .when("/login", {
            templateUrl: "/partials/login.ejs",
            controller: Controllers.LoginCtrl,
            controllerAs: "LoginCtrl"
        })
            .when("/register", {
            templateUrl: "/partials/register.ejs",
            controller: Controllers.RegCtrl,
            controllerAs: "RegCtrl"
        })
            .when("/lesson", {
            templateUrl: "/partials/lesson.ejs",
            controller: Controllers.LessonCtrl,
            controllerAs: "LessonCtrl"
        })
            .otherwise({
            templateUrl: "/partials/register.ejs",
            controller: Controllers.RegCtrl,
            controllerAs: "RegCtrl"
        });
        $locationProvider.html5Mode(true);
    })
        .run(function ($rootScope, $location, AuthenticationService) {
        $rootScope.$watch("currentUser", function (currentUser) {
            console.log("$watch " + currentUser);
            if (!currentUser && (["/", "/login", "/logout", "/signup"].indexOf($location.path()) === -1)) {
                AuthenticationService.currentUser();
            }
        });
        $rootScope.$on("event:auth-loginRequired", function () {
            $location.path("/login");
            return false;
        });
    });
})(App || (App = {}));
//# sourceMappingURL=app.js.map