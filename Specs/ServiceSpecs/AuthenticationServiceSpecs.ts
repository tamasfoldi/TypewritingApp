describe('Authentication Service Specs', () => {

  // load the service's module
  beforeEach(angular.mock.module('typewritingApp'));

  // instantiate service
  var authSrv: Services.AuthenticationService;
  var user;
  var rootScope;
  var httpBackend: angular.IHttpBackendService;

  var sessionURL = '/api/auth/sessions'
  var userURL = '/api/users';

  beforeEach(inject( (AuthenticationService: Services.AuthenticationService, $rootScope, $httpBackend: angular.IHttpBackendService) => {
    authSrv = AuthenticationService;
    rootScope = $rootScope;
    httpBackend = $httpBackend;

    // mock user
    user = { 'email': 'test', 'password': 'pass', username: 'testuser' }
  }));

  it('should login and set global user', () => {
    httpBackend.expectPOST(sessionURL).respond(user);
    expect(rootScope.currentUser).toBe(null);
    authSrv.login('password', user);
    httpBackend.flush();
    expect(rootScope.currentUser.username).toEqual(user.username);
  });

  it('should logout and remove global user', () => {
    httpBackend.expectDELETE(sessionURL).respond({});
    rootScope.currentUser = user;
    expect(rootScope.currentUser.username).toEqual(user.username);
    authSrv.logout();
    httpBackend.flush();
    expect(rootScope.currentUser).toBe(null);
  });

  it('should create a new user and set global user', () => {
    httpBackend.expectPOST(userURL).respond(user);
    expect(rootScope.currentUser).toBe(null);
    authSrv.createUser(user);
    httpBackend.flush();
    expect(rootScope.currentUser.username).toBe(user.username);
  });
});