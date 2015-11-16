/// <reference path="../../../references.ts" />

module Controllers {
  export class UserCtrl {
    location: angular.ILocationService;
    user: Model.IUser;
    scope: angular.IScope;
    userSrv: Services.IUserService;

    constructor($location: angular.ILocationService, $rootScope, $scope: angular.IScope, UserService: Services.IUserService) {
      this.location = $location;
      this.scope= $scope;
      this.userSrv = UserService;
      this.userSrv.get({ id: $location.search().id }).$promise.then((user) => {
        if ($rootScope.currentUser === null) {
          $scope.$emit("event:auth-loginRequired");
        } else if (user.username !== $rootScope.currentUser.username) {
          $scope.$emit("event:auth-invalidAuthentication");
        } else {
          this.user = user;
        }
      }, () => {
        $scope.$emit("event:auth-userNotExists");
      });
    }
  }
}
