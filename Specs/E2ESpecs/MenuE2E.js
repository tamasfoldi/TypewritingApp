/// <reference path="../../references.ts" />
describe('Menu End-To-End Specs', function () {
    var routeParams, location, scope, menuCtrl;
    beforeEach(function () {
        browser.get('http://localhost:5004/#/');
    });
    it('should have the title as Lesson 1 after clicking on the first lesson button', function () {
        var button = element.all(by.repeater("lesson in MenuCtrl.lessons | orderBy: 'id'").row(0).column('lesson.name'));
        button.click();
        expect(element(by.id('LessonTitle')).getText()).toBe('Lesson 1');
    });
});
//# sourceMappingURL=MenuE2E.js.map