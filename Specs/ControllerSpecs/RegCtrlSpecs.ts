/// <reference path="../../references.ts" />

describe('Register Controller Specs', () => {
  var regCtrl: Controllers.RegCtrl;
  var location;
  var md5;
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
    resp = $httpBackend.expectPOST('/api/users');
  }));

  beforeEach(() => inject(($location, AuthenticationService) => {
    regCtrl = new Controllers.RegCtrl($location, AuthenticationService);
  }));

  it('should handle the error when the registration fails', () => {
    regCtrl.register();
    resp.respond(400, { errors: { username: { message: 'The username is already exists' }, email: { message: 'The email is already exists' } } });
    $httpBackend.flush();
    expect(regCtrl.errors).toEqual({ username: 'The username is already exists', email: 'The email is already exists' });
  });

  it('should redirect to "/login" on correct register', () => {
    regCtrl.register();
    resp.respond(200, { message: "Successfully logged in" });
    $httpBackend.flush();

    expect(location.path()).toEqual('/login');
  });
});