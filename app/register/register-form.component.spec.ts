import { describe, it, expect, inject,
injectAsync, beforeEach, TestComponentBuilder } from "angular2/testing";
import {FormBuilder} from "angular2/common";

import {RegisterFormComponent} from "./register-form.component";

describe("Typewriting login form tests", () => {
  let tcb: TestComponentBuilder;

  beforeEach(inject([TestComponentBuilder, FormBuilder], (tcBuilder, FormBuilder) => {
    tcb = tcBuilder;
  }));

  it("should be invalid on init", injectAsync([], () => {
    return tcb.createAsync(RegisterFormComponent)
      .then(fixture => {
        let cmp = fixture.componentInstance;
        fixture.detectChanges();
        let element = fixture.nativeElement;

        expect(cmp.registerForm.valid).toBeFalsy();
        expect(element.querySelector("button").disabled).toBeTruthy();
      });
  }));

  it("should have valid username input if it has text", injectAsync([], () => {
    return tcb.createAsync(RegisterFormComponent)
      .then(fixture => {
        let cmp = fixture.componentInstance;
        let element = fixture.nativeElement;
        let usernameInput = cmp.username;

        usernameInput.updateValue("Test");
        fixture.detectChanges();

        expect(cmp.registerForm.valid).toBeFalsy();
        expect(usernameInput.valid).toBeTruthy();
        expect(cmp.password.valid).toBeFalsy();
        expect(element.querySelector("button").disabled).toBeTruthy();
      });
  }));

  it("should be valid if all the validators correct", injectAsync([], () => {
    return tcb.createAsync(RegisterFormComponent)
      .then(fixture => {
        let cmp = fixture.componentInstance;
        let element = fixture.nativeElement;
        let usernameInput = cmp.username;
        let passwordInput = cmp.password;
        let emailInput = cmp.email;

        usernameInput.updateValue("Test");
        passwordInput.updateValue("TestPassword");
        emailInput.updateValue("test@mail.com");
        fixture.detectChanges();

        expect(usernameInput.valid).toBeTruthy();
        expect(passwordInput.valid).toBeTruthy();
        expect(emailInput.valid).toBeTruthy();
        expect(cmp.registerForm.valid).toBeTruthy();
        expect(element.querySelector("button").disabled).toBeFalsy();
      });
  }));

  it("register should return with the inputs", injectAsync([], () => {
    return tcb.createAsync(RegisterFormComponent)
      .then(fixture => {
        let cmp = fixture.componentInstance;
        let element = fixture.nativeElement;
        let usernameInput = cmp.username;
        let passwordInput = cmp.password;
        let emailInput = cmp.email;
        spyOn(cmp, "register").and.callThrough();

        usernameInput.updateValue("Test");
        passwordInput.updateValue("TestPassword");
        emailInput.updateValue("test@mail.com");
        fixture.detectChanges();

        expect(cmp.register()).toEqual({ username: "Test", password: "TestPassword", email: "test@mail.com" });
      });
  }));

  it("should be invalid if the mail is invalid", injectAsync([], () => {
    return tcb.createAsync(RegisterFormComponent)
      .then(fixture => {
        let cmp = fixture.componentInstance;
        let emailInput = cmp.email;

        expect(cmp.isValidEmail(emailInput)).toEqual(null);

        emailInput.updateValue("invalidMail");

        expect(cmp.isValidEmail(emailInput)).toEqual({ invalidMail: true });

        emailInput.updateValue("valid@mail.com");
        expect(cmp.isValidEmail(emailInput)).toEqual(null);
      });
  }));
});
