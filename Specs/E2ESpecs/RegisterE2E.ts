/// <reference path="../../references.ts" />

describe('Register End-To-End Specs', () => {
    var routeParams, location, scope, menuCtrl;

    beforeEach(() => {
        browser.get('http://localhost:5004/#/')
    });

    it('should have the title as "Register"', () => {
        expect(element(by.css('.md-display-3')).getText()).toBe('Register');
    });

    it('should require userName and not enable non-alphabet or numerical caracters in it and must be at least 4 char long and less then 15', () => {
        expect(element(by.css('[ng-messages="RegForm.userName.$error"] [ng-message="required"')).getText()).toBe('This field is required.');
        element(by.model('RegCtrl.userName')).sendKeys('J');
        browser.sleep(100);
        expect(element(by.css('[ng-messages="RegForm.userName.$error"] [ng-message="minlength"')).getText()).toBe('The name has to be at least 4 characters long.');
        element(by.model('RegCtrl.userName')).sendKeys('$');
        browser.sleep(100);
        expect(element(by.css('[ng-messages="RegForm.userName.$error"] [ng-message="pattern"')).getText()).toBe('The name can contain only letters from the english alphabet and numbers.');
        element(by.model('RegCtrl.userName')).sendKeys(protractor.Key.BACK_SPACE);
        element(by.model('RegCtrl.userName')).sendKeys('AAAAAAAAAAAAAAA');
        browser.sleep(100);
        expect(element(by.css('[ng-messages="RegForm.userName.$error"] [ng-message="maxlength"')).getText()).toBe('The name has to be less then 15 characters long.');
    });

    it('should require mail and shoud have an e-mail address in it', () => {
        expect(element(by.css('[ng-messages="RegForm.mailAddr.$error"] [ng-message-exp')).getText()).toBe('Your email must be between 10 and 100 characters long and look like an e-mail address.');      
    });

    it('should require password and not enable non-alphabet or numerical caracters in it and must be at least 8 char long and less then 16', () => {
        expect(element(by.css('[ng-messages="RegForm.password.$error"] [ng-message="required"')).getText()).toBe('This field is required.');
        element(by.model('RegCtrl.password')).sendKeys('Q');
        browser.sleep(100);
        expect(element(by.css('[ng-messages="RegForm.password.$error"] [ng-message="minlength"')).getText()).toBe('The password has to be at least 8 characters long.');
        element(by.model('RegCtrl.password')).sendKeys('$');
        browser.sleep(100);
        expect(element(by.css('[ng-messages="RegForm.password.$error"] [ng-message="pattern"')).getText()).toBe('The password can contain only letters from the english alphabet and numbers.');
        element(by.model('RegCtrl.password')).sendKeys(protractor.Key.BACK_SPACE);
        element(by.model('RegCtrl.password')).sendKeys('QWert123123123123');
        browser.sleep(100);
        expect(element(by.css('[ng-messages="RegForm.password.$error"] [ng-message="maxlength"')).getText()).toBe('The password has to be less then 16 characters long.');
    });

    it('shouldnt show any error message after a correct fill', () => {
        expect(element.all(by.css('[ng-message]')).count()).not.toBe(0);
        element(by.model('RegCtrl.userName')).sendKeys('John');
        element(by.model('RegCtrl.mailAddr')).sendKeys('john@gmail.com');
        element(by.model('RegCtrl.password')).sendKeys('QWert123');
        expect(element.all(by.css('[ng-message]')).count()).toBe(0);

    });
}); 