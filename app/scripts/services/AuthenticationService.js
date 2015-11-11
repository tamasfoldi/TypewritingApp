/// <reference path="../../../references.ts" />
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
//# sourceMappingURL=AuthenticationService.js.map