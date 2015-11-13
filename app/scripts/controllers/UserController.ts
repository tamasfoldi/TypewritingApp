/// <reference path="../../../references.ts" />

module Controllers {

  export class UserCtrl {
    location: angular.ILocationService;
    user: Model.IUser;

    constructor($location: angular.ILocationService, $rootScope, $scope: angular.IScope, UserService: Services.IUserService) {
      this.user = UserService.get({ username: $location.search().username});
      this.location = $location;
      if($rootScope.currentUser === null){
        $scope.$emit("event:auth-loginRequired");
      }      
      else if(this.user.username !== $rootScope.currentUser.username){
        $scope.$emit("event:auth-invalidAuthentication");
      }
    }
  }
}
