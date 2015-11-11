/// <reference path="../../../references.ts" />
module Controllers {
  export class RegCtrl {
    username: string;
    mailAddr: string;
    password: string;
    errors: Array<string>;
    location: angular.ILocationService;
    authSrv: Services.AuthenticationService;
    constructor($location: angular.ILocationService, AuthenticationService: Services.AuthenticationService) {
      this.username = "";
      this.mailAddr = "";
      this.password = "";
      this.location = $location;
      this.errors = [];
      this.authSrv = AuthenticationService;
    }

    register(form: FormData) {
      var username = this.username;
      var email = this.mailAddr;
      var password = this.password;
      this.authSrv.createUser({username, email, password}).then((msg) => {
        this.location.path("/login");
      }, (msg) => {
        console.log(msg);
      });
    }
  }
}
