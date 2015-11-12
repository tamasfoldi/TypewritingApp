/// <reference path="../../references.ts" />

describe('Login Controller Specs', () => {
  var loginCtrl: Controllers.LoginCtrl;
  var location;
  var md5;
  var rootScope;
  var $httpBackend: angular.IHttpBackendService;
  var resp: angular.mock.IRequestHandler;

  beforeEach(angular.mock.module('typewritingApp'));

  beforeEach(() => {
    jasmine.addCustomEqualityTester((first, second) => {
      return angular.equals(first, second);
    });
  });

  beforeEach(inject(function($location, _$httpBackend_, $rootScope) {
    location = $location;
    $httpBackend = _$httpBackend_;
    rootScope = $rootScope;
    resp = $httpBackend.expectPOST('/api/auth/sessions');
  }));

  beforeEach(() => inject(($location, AuthenticationService) => {
    loginCtrl = new Controllers.LoginCtrl( $location, AuthenticationService);
  }));

  it('should handle the error when the login fails', () => {
    loginCtrl.login();
    resp.respond(401, {message: "Invalid username"});
    $httpBackend.flush();
    expect(loginCtrl.error).toEqual('Invalid username');
  });
});