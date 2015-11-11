/// <reference path="../../../references.ts" />

module Controllers {
  export class LoginCtrl {
    location: angular.ILocationService;
    AuthSrvc: Services.AuthenticationService;
    username: string = "";
    password: string = "";

    constructor($location: angular.ILocationService, AuthenticationService: Services.AuthenticationService) {
      this.location = $location;
      this.AuthSrvc = AuthenticationService;
    }

    login(LoginForm: FormData) {
      var username = this.username;
      var password = this.password;
      this.AuthSrvc.login("password", { username, password })
        .then((msg) => {
          this.AuthSrvc.currentUser();
          this.location.path("/");
        }, (msg) => {
          console.log(msg);
        });
    }
  }
}
