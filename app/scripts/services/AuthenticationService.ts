/// <reference path="../../../references.ts" />

module Services {
  export class AuthenticationService {
    cookieStore: angular.cookies.ICookiesService;
    rootScope;
    location: angular.ILocationService;
    userSrv: Services.IUserService;
    sessionSrv: Services.ISessionService;
    constructor($location: angular.ILocationService, $rootScope, UserSrv: Services.IUserService,
      SessionSrv: Services.ISessionService, $cookieStore: angular.cookies.ICookiesService) {
      this.cookieStore = $cookieStore;
      this.rootScope = $rootScope;
      this.location = $location;
      this.userSrv = UserSrv;
      this.sessionSrv = SessionSrv;
      this.rootScope.currentUser = this.cookieStore.get("user") || null;
      this.cookieStore.remove("user");
    }

    login(provider, user): angular.IPromise<Model.ISession> {
      return this.sessionSrv.save({
        provider: provider,
        username: user.username,
        password: user.password,
        rememberMe: true
      }).$promise.then((userRes) => {
        this.rootScope.currentUser = userRes;
        return userRes;
      });
    }

    logout(): angular.IPromise<Model.ISession> {
      return this.sessionSrv.delete().$promise.then((res) => {
        this.rootScope.currentUser = null;
        return res;
      });
    }

    currentUser(): void {
      this.sessionSrv.get().$promise.then((user) => {
        this.rootScope.currentUser = user;
      }); // todo on error 404 redirect
    }

    createUser(userinfo): angular.IPromise<Model.IUser> {
      return this.userSrv.save({
        username: userinfo.username,
        email: userinfo.email,
        password: userinfo.password
      }).$promise.then((user) => {
        this.rootScope.currentUser = user;
        return user;
      });
    }
  }
}
