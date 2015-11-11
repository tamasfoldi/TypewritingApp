/// <reference path="../../references.ts" />
describe('Register Controller Specs', function () {
    var regCtrl;
    var location;
    var md5;
    var $httpBackend;
    var resp;
    beforeEach(angular.mock.module('typewritingApp'));
    beforeEach(function () {
        jasmine.addCustomEqualityTester(function (first, second) {
            return angular.equals(first, second);
        });
    });
    beforeEach(inject(function ($location, _$httpBackend_, $rootScope) {
        location = $location;
        $httpBackend = _$httpBackend_;
        resp = $httpBackend.expectPOST('/users');
    }));
    beforeEach(function () { return inject(function ($http, $location, UserService) {
        regCtrl = new Controllers.RegCtrl($http, $location, UserService);
    }); });
    it('should handle the error when the registration fails', function () {
        regCtrl.register();
        resp.respond(400, { error: { username: { message: 'The username is already exists' } } });
        $httpBackend.flush();
        expect(regCtrl.respMsg).toBe('The username is already exists');
    });
    it('should register the new users and redirect to /login', function () {
        spyOn(location, 'path').and.returnValue("/login");
        regCtrl.register();
        resp.respond(200, { success: "Registration was successful" });
        $httpBackend.flush();
        expect(regCtrl.respMsg).toBe("Registration was successful");
        expect(location.path).toHaveBeenCalledWith('/login');
        expect(regCtrl.location.path()).toEqual("/login");
    });
});
//# sourceMappingURL=RegCtrlSpecs.js.map