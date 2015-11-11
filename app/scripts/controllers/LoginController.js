/// <reference path="../../../references.ts" />
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
//# sourceMappingURL=LoginController.js.map