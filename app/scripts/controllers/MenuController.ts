/// <reference path="../../../references.ts" />
module Controllers {
  import ILesson = Model.ILesson;

  export class MenuCtrl {
    location: angular.ILocationService;
    lessons: ILesson[] = new Array<ILesson>();
    currentUser;
    authSrv: Services.AuthenticationService;
    constructor($location: angular.ILocationService, LessonService: angular.resource.IResourceClass<ILesson>, AuthenticationService: Services.AuthenticationService, $rootScope) {
      this.location = $location;
      this.lessons = LessonService.query();
      this.authSrv = AuthenticationService;
      this.currentUser = $rootScope.currentUser;
    }

    loadLesson(id: number) {
      this.location.path("/lesson");
      this.location.search("id", id);
    }

    logout() {
      this.authSrv.logout().then(() => {
        this.location.path("/login");
      });
    }

    login() {
      this.location.path("/login");
    }

    register() {
      this.location.path("/register");
    }
  }
}
