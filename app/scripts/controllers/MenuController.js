/// <reference path="../../../references.ts" />
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
//# sourceMappingURL=MenuController.js.map