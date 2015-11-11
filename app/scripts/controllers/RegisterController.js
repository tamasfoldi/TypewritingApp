/// <reference path="../../../references.ts" />
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
//# sourceMappingURL=RegisterController.js.map