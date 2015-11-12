/// <reference path="../../../references.ts" />
module Controllers {
  export class RegCtrl {
    username: string;
    email: string;
    password: string;
    errors;
    location: angular.ILocationService;
    authSrv: Services.AuthenticationService;
    constructor($location: angular.ILocationService, AuthenticationService: Services.AuthenticationService) {
      this.username = "";
      this.email = "";
      this.password = "";
      this.errors = {};
      this.location = $location;
      this.authSrv = AuthenticationService;
    }

    register() {
      var username = this.username;
      var email = this.email;
      var password = this.password;
      this.errors = {};
      this.authSrv.createUser({ username, email, password }).then(() => {
        this.location.path("/login");
      }, (msg: angular.IHttpPromiseCallbackArg<any>) => {
        for (var field in msg.data.errors) {
          this.errors[field] = msg.data.errors[field].message;
        }
      });
    }
  }
}
