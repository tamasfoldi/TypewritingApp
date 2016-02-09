import { describe, it, expect, inject,
injectAsync, beforeEach, TestComponentBuilder } from "angular2/testing";
import {FormBuilder} from "angular2/common";

import {LoginFormComponent} from "./login-form.component";

describe("Typewriting login form tests", () => {
  let tcb: TestComponentBuilder;

  beforeEach(inject([TestComponentBuilder, FormBuilder], (tcBuilder, FormBuilder) => {
    tcb = tcBuilder;
  }));

  it("should be invalid on init", injectAsync([], () => {
    return tcb.createAsync(LoginFormComponent)
      .then(fixture => {
        let cmp = fixture.componentInstance;
        fixture.detectChanges();
        let element = fixture.nativeElement;

        expect(cmp.loginForm.valid).toBeFalsy();
        expect(element.querySelector("button").disabled).toBeTruthy();
      });
  }));

  it("should have valid username input if it has text", injectAsync([], () => {
    return tcb.createAsync(LoginFormComponent)
      .then(fixture => {
        let cmp = fixture.componentInstance;
        let element = fixture.nativeElement;
        let usernameInput = cmp.username;

        usernameInput.updateValue("Test");
        fixture.detectChanges();

        expect(cmp.loginForm.valid).toBeFalsy();
        expect(usernameInput.valid).toBeTruthy();
        expect(cmp.password.valid).toBeFalsy();
        expect(element.querySelector("button").disabled).toBeTruthy();
      });
  }));

  it("should have valid username input exists and min 6 char long", injectAsync([], () => {
    return tcb.createAsync(LoginFormComponent)
      .then(fixture => {
        let cmp = fixture.componentInstance;
        let element = fixture.nativeElement;
        let passwordInput = cmp.password;

        passwordInput.updateValue("test");
        fixture.detectChanges();

        expect(passwordInput.valid).toBeFalsy();

        passwordInput.updateValue("testStrong");
        expect(passwordInput.valid).toBeTruthy();

      });
  }));


  it("should be valid if all the validators correct", injectAsync([], () => {
    return tcb.createAsync(LoginFormComponent)
      .then(fixture => {
        let cmp = fixture.componentInstance;
        let element = fixture.nativeElement;
        let usernameInput = cmp.username;
        let passwordInput = cmp.password;

        usernameInput.updateValue("Test");
        passwordInput.updateValue("TestPassword");
        fixture.detectChanges();

        expect(usernameInput.valid).toBeTruthy();
        expect(passwordInput.valid).toBeTruthy();
        expect(cmp.loginForm.valid).toBeTruthy();
        expect(element.querySelector("button").disabled).toBeFalsy();
      });
  }));

  it("login should return with the inputs", injectAsync([], () => {
    return tcb.createAsync(LoginFormComponent)
      .then(fixture => {
        let cmp = fixture.componentInstance;
        let element = fixture.nativeElement;
        let usernameInput = cmp.username;
        let passwordInput = cmp.password;
        spyOn(cmp, "login").and.callThrough();

        usernameInput.updateValue("Test");
        passwordInput.updateValue("TestPassword");
        fixture.detectChanges();

        expect(cmp.login()).toEqual({ username: "Test", password: "TestPassword", rememberMe: false });
      });
  }));
});
