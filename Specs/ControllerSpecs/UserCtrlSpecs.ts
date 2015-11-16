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

  beforeEach(() => inject(($location: angular.ILocationService, $rootScope: angular.IRootScopeService, UserService: Services.IUserService, _$httpBackend_) => {
    location = $location;
    userService = UserService;
    location.path('/user?username=test');
    scope = $rootScope.$new();
    rootScope = $rootScope;
    $httpBackend = _$httpBackend_;
    userCtrl = new Controllers.UserCtrl(location, $rootScope, scope, UserService);
  }));

  describe('Valid user requests', () => {
    beforeEach(inject(function($rootScope, $controller) {
      $httpBackend.expectGET('/api/users').respond(
        {
          username: "test",
          email: "test@gmail.com"
        }
      );
      $httpBackend.expectGET('/api/auth/sessions').respond(200, "OK");
      $httpBackend.flush();
    }));

    it('should emit "event:auth-loginRequired" if there is no currect user', () => {
      userCtrl = new Controllers.UserCtrl(location, rootScope, scope, userService);
      spyOn(userCtrl.scope, "$emit");

      expect(userCtrl.scope.$emit).not.toHaveBeenCalledWith("event:auth-loginRequired");
    });


    it('should emit "event:auth-invalidAuthentication" if the requested user is not the current', () => {
      rootScope.currentUser = { username: "test2", email: "test@gmail.com" }
      userCtrl = new Controllers.UserCtrl(location, rootScope, scope, userService);
      spyOn(userCtrl.scope, "$emit");

      expect(userCtrl.scope.$emit).not.toHaveBeenCalledWith("event:auth-invalidAuthentication");
    });
    
    it('should update the users email', () => {
      rootScope.currentUser = { username: "test", email: "test@gmail.com" }
      userCtrl = new Controllers.UserCtrl(location, rootScope, scope, userService);
      spyOn(userCtrl, "updateUser").and.callThrough();   
      
      $httpBackend.expectGET('/api/users').respond(
        {
          username: "test",
          email: "test@gmail.com"
        }
      );      
      
      $httpBackend.flush();
      
      userCtrl.updateName = "test2";      
      userCtrl.updateUser();
      $httpBackend.expectPUT('/api/users/test').respond(200);
      
      expect(userCtrl.user.username).toEqual("test2");
    });
  });

  describe('Invalid user request', () => {

    it('should emit "event:auth-userNotExists" if the requested user does not exists', () => {
      $httpBackend.expectGET('/api/users').respond(404, 'User Not Found');
      rootScope.currentUser = { username: "test", email: "test@gmail.com" }
      userCtrl = new Controllers.UserCtrl(location, rootScope, scope, userService);
      spyOn(userCtrl.scope, "$emit");

      expect(userCtrl.scope.$emit).not.toHaveBeenCalledWith("event:auth-userNotExists");
    });
  });



}); 
