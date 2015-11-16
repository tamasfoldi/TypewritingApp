/// <reference path="../../references.ts" />
module App {
  angular.module("typewritingApp", ["ngMessages", "ngRoute", "ngResource", "ngMaterial", "timer", "ngCookies", "angular-storage", "LocalStorageModule", "ui.router"])
    .factory("LessonService", ["$resource", ($resource: angular.resource.IResourceService): Services.ILessonService => {
      return <Services.ILessonService>$resource("/api/lessons/:id", { id: "@id" });
    }])
    .factory("UserService", ["$resource", ($resource: angular.resource.IResourceService): Services.IUserService => {
      var update: angular.resource.IActionDescriptor = {
        method: "PUT",
        isArray: false
      };
      return <Services.IUserService>$resource("/api/users/:id", { id: "@id" }, { update: update });
    }])
    .factory("SessionService", ["$resource", ($resource: angular.resource.IResourceService): Services.ISessionService => {
      return <Services.ISessionService>$resource("/api/auth/sessions/", {});
    }])
    .service("AuthenticationService", ["$location", "$rootScope", "UserService", "SessionService", "$cookieStore", Services.AuthenticationService])
    .controller("MenuCtrl", ["$location", "LessonService", "$rootScope", Controllers.MenuCtrl])
    .controller("LessonCtrl", ["$location", "$scope", "LessonService", Controllers.LessonCtrl])
    .controller("RegCtrl", ["$http", "$location", "UserService", Controllers.RegCtrl])
    .controller("LoginCtrl", ["$location", "AuthenticationService", Controllers.LoginCtrl])
    .controller("UserCtrl", ["$location", "$rootScope", "$scope", "UserService", Controllers.UserCtrl])
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
    .config(($stateProvider: angular.ui.IStateProvider, $locationProvider: angular.ILocationProvider, jwtInterceptorProvider: angular.jwt.IJwtInterceptor,
      store: angular.a0.storage.IStoreService, $httpProvider: angular.IHttpProvider, $urlRouterProvider: angular.ui.IUrlRouterProvider) => {
      $stateProvider
        .state("/login", {
          templateUrl: "/partials/login.ejs",
          controller: Controllers.LoginCtrl,
          controllerAs: "LoginCtrl",
        })
        .state("/register", {
          templateUrl: "/partials/register.ejs",
          controller: Controllers.RegCtrl,
          controllerAs: "RegCtrl"
        })
        .state("/lesson", {
          templateUrl: "/partials/lesson.ejs",
          controller: Controllers.LessonCtrl,
          controllerAs: "LessonCtrl"
        })
        .state("/user", {
          templateUrl: "/partials/user.ejs",
          controller: Controllers.UserCtrl,
          controllerAs: "UserCtrl"
        })
        .state("/", {
          templateUrl: "/",
          controller: Controllers.RegCtrl,
          controllerAs: "RegCtrl"
        })
      $urlRouterProvider.otherwise("/");
      $locationProvider.html5Mode(true);

      jwtInterceptorProvider.tokenGetter = function() {
        return store.get("jwt");
      }

      $httpProvider.interceptors.push("jwtInterceptor");


    })
    .run(($rootScope: angular.IRootScopeService, $location: angular.ILocationService, AuthenticationService: Services.AuthenticationService, store: angular.a0.storage.IStoreService,
    jwtHelper: angular.jwt.IJwtHelper, $state: angular.ui.IStateService) => {
      $rootScope.$watch("currentUser", (currentUser) => {
        if (!currentUser && (["/", "/login", "/logout", "/register"].indexOf($location.path()) === -1)) {
          AuthenticationService.currentUser();
        }
      });

      $rootScope.$on("event:auth-loginRequired", () => {
        $location.path("/login");
        $location.search("");
        return false;
      });

      $rootScope.$on("event:auth-invalidAuthentication", () => {
        $location.path("/"); // todo new page smthg
        $location.search("");
        return false;
      });

      $rootScope.$on("event:auth-userNotExists", () => {
        $location.path("/"); // todo new page smthg
        $location.search("");
        return false;
      });

      $rootScope.$on('$stateChangeStart', (e: angular.IAngularEvent, to: angular.ui.IState) => {
        if (to.data && to.data.requiresLogin) {
          if (!store.get("jwt") || jwtHelper.isTokenExpired(store.get("jwt"))) {
            e.preventDefault();
            $state.go("login");
          }
        }
      });
    });
}
