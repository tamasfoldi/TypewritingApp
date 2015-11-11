/// <reference path="../../references.ts" />
describe('Menu Controller Specs', function () {
    var menuCtrl;
    var location;
    var $httpBackend;
    beforeEach(angular.mock.module('typewritingApp'));
    beforeEach(function () {
        jasmine.addCustomEqualityTester(function (first, second) {
            return angular.equals(first, second);
        });
    });
    beforeEach(inject(function (_$httpBackend_, $rootScope, $controller) {
        $httpBackend = _$httpBackend_;
        $httpBackend.expectGET('/lessons').respond([
            {
                "id": 1,
                "name": "Lesson 1"
            },
            {
                "id": 1,
                "name": "Lesson 1"
            }
        ]);
    }));
    beforeEach(function () { return inject(function ($location, $routeParams, $rootScope, LessonService) {
        location = $location;
        menuCtrl = new Controllers.MenuCtrl(location, LessonService);
    }); });
    it('should have its location as ""', function () {
        $httpBackend.expectGET('App/menu.html').respond(200);
        expect(location.path()).toEqual('');
    });
    it('should fetch lessons details', function () {
        expect(menuCtrl.lessons).toEqual([]);
        $httpBackend.flush();
        expect(menuCtrl.lessons).toEqual([
            {
                "id": 1,
                "name": "Lesson 1"
            },
            {
                "id": 1,
                "name": "Lesson 1"
            }
        ]);
    });
    it('should change location when setting it via "loadLesson" function', inject(function () {
        spyOn(location, 'search');
        spyOn(location, 'path').and.returnValue("/lesson?id=1");
        menuCtrl.loadLesson(1);
        expect(location.path).toHaveBeenCalledWith('/lesson');
        expect(location.search).toHaveBeenCalledWith('id', 1);
        expect(menuCtrl.location.path()).toEqual("/lesson?id=1");
    }));
});
//# sourceMappingURL=MenuCtrlSpecs.js.map