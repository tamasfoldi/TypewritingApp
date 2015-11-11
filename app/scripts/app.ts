/// <reference path="../../references.ts" />
module App {
  angular.module("typewritingApp", ["ngMessages", "ngRoute", "ngResource", "ngMaterial", "timer", "ngCookies"])
    .factory("LessonService", ["$resource", ($resource: angular.resource.IResourceService): Services.ILessonService => {
      return <Services.ILessonService>$resource("/api/lessons/:id", { id: "@id" });
    }])
    .factory("UserService", ["$resource", ($resource: angular.resource.IResourceService): Services.IUserService => {
      return <Services.IUserService>$resource("/api/users/:id", { id: "@id" });
    }])
    .factory("SessionService", ["$resource", ($resource: angular.resource.IResourceService): Services.ISessionService => {
      return <Services.ISessionService>$resource("/api/auth/sessions/", {});
    }])
    .service("AuthenticationService", ["$location", "$rootScope", "UserService", "SessionService", "$cookieStore", Services.AuthenticationService])
    .controller("MenuCtrl", ["$location", "LessonService", "$rootScope", Controllers.MenuCtrl])
    .controller("LessonCtrl", ["$location", "$scope", "LessonService", Controllers.LessonCtrl])
    .controller("TimerCtrl", ["$interval", Controllers.TimerCtrl])
    .controller("RegCtrl", ["$http", "$location", "UserService", Controllers.RegCtrl])
    .controller("LoginCtrl", ["$location", "AuthenticationService", Controllers.LoginCtrl])
    .directive("lessonResult", () => {
      return {
        restrict: "E",
        transclude: true,
        templateUrl: "/partials/lesson-result.ejs"
      };
    })
    .directive("autofocus", ["$timeout", function($timeout) {
      return {
        restrict: "A",
        link: function($scope, $element) {
          $timeout(function() {
            $element[0].focus();
          });
        }
      };
    }])
    .directive("sideMenu", () => {
      return {
        restrict: "E",
        transclude: true,
        scope: {},
        controller: Controllers.MenuCtrl,
        controllerAs: "MenuCtrl",
        templateUrl: "/partials/side-menu.ejs"
      };
    })
    .config(($routeProvider: angular.route.IRouteProvider, $locationProvider: angular.ILocationProvider) => {
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
    .run(($rootScope: angular.IRootScopeService, $location, AuthenticationService: Services.AuthenticationService) => {
      $rootScope.$watch("currentUser", (currentUser) => {
        if (!currentUser && (["/", "/login", "/logout", "/signup"].indexOf($location.path()) === -1)) {
          AuthenticationService.currentUser();
        }
      });

      $rootScope.$on("event:auth-loginRequired", function() {
        $location.path("/login");
        return false;
      });
    });
}
