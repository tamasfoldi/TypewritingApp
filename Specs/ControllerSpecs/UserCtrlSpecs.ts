/// <reference path="../../references.ts" />

describe('User Controller Specs', () => {
  var userCtrl: Controllers.UserCtrl;
  var location: angular.ILocationService;
  var $httpBackend: angular.IHttpBackendService;
  var userService: Services.IUserService;
  var scope: angular.IScope;
  var rootScope;

  beforeEach(angular.mock.module('typewritingApp'));

  beforeEach(() => {
    jasmine.addCustomEqualityTester((first, second) => {
      return angular.equals(first, second);
    });


  });

  beforeEach(() => inject(($location: angular.ILocationService, $rootScope: angular.IRootScopeService, UserService: Services.IUserService) => {
    location = $location;
    userService = UserService;
    location.path('/user?username=test');
    scope = $rootScope.$new();
    rootScope = $rootScope;    
    userCtrl = new Controllers.UserCtrl(location, $rootScope, scope, UserService);
  }));

  beforeEach(inject(function(_$httpBackend_, $rootScope, $controller) {
    $httpBackend = _$httpBackend_;
    $httpBackend.expectGET('/api/users').respond(
      {
        username: "test",
        email: "test@gmail.com"
      }
    );
    $httpBackend.flush();
  }));

  it('should redirect to "/login" if the currentUser is null', () => {
    spyOn(userCtrl.location, "path").and.callThrough();

    expect(userCtrl.location.path()).toEqual('/login');
  });


  it('should redirect to "/" if the currentUser is not the requested one but not null', () => {
    rootScope.currentUser = { username: "test2", email: "test2@gmail.com" }
    userCtrl = new Controllers.UserCtrl(location, rootScope, scope, userService);
    spyOn(userCtrl.location, "path").and.callThrough();

    expect(userCtrl.location.path()).toEqual('/');
  });
}); 
