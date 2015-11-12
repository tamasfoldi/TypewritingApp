/// <reference path="../../../references.ts" />

module Controllers {
  export class LoginCtrl {
    location: angular.ILocationService;
    AuthSrvc: Services.AuthenticationService;
    username: string = "";
    password: string = "";
    error: string = "";

    constructor($location: angular.ILocationService, AuthenticationService: Services.AuthenticationService) {
      this.location = $location;
      this.AuthSrvc = AuthenticationService;
    }

    login() {
      var username = this.username;
      var password = this.password;
      this.AuthSrvc.login("password", { username, password })
        .then(() => {
          this.AuthSrvc.currentUser();
          this.location.path("/");
        }, (msg: angular.IHttpPromiseCallbackArg<any>) => {
          this.error = msg.data.message;
        });
    }
  }
}
