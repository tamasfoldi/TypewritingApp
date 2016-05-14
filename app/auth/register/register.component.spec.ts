import {RegisterComponent} from './register.component';
import {provide} from "@angular/core"
import {Router, RouteRegistry, ROUTER_PRIMARY_COMPONENT} from "@angular/router-deprecated";
import { SpyLocation } from '@angular/common/testing';
import {beforeEach, beforeEachProviders, inject} from "@angular/core/testing";
import { TestComponentBuilder } from '@angular/compiler/testing';
import { AuthService } from "../auth.service";
import { AuthRouterComponent } from "../auth-router.component";
import { Location } from "@angular/common";
import { User, UserService } from "../../user/user.service";
import { Response, ResponseOptions, BaseRequestOptions, Http } from "@angular/http";
import {MockBackend, MockConnection} from "@angular/http/testing";

import { Observable } from "rxjs/Rx";

class ResponseError extends Error {
  _body;
}

describe('RegisterComponent specs', () => {
  let tcb: TestComponentBuilder,
    authService: AuthService,
    mockBackend: MockBackend,
    router: Router;

  //setup
  beforeEachProviders(() => [
    TestComponentBuilder,
    RegisterComponent,
    RouteRegistry,
    provide(Location, { useClass: SpyLocation }),
    provide(Router, { useFactory: () => {} }),
    provide(ROUTER_PRIMARY_COMPONENT, { useValue: AuthRouterComponent }),
    provide(UserService, { useFactory: () => { } }),
    AuthService,
    BaseRequestOptions,
    MockBackend,
    provide(Http, {
      useFactory: (backend, options) => new Http(backend, options),
      deps: [MockBackend, BaseRequestOptions]
    })
  ]);

  beforeEach(inject([TestComponentBuilder, AuthService, MockBackend, Router], (_tcb, _authService, _mockBackend, _router) => {
    authService = _authService;
    tcb = _tcb;
    mockBackend = _mockBackend;
    router = _router;
  }));

  // specs
  it('should set the default values and to be invalid', done => {
    tcb.createAsync(RegisterComponent).then(fixture => {
      let registerComponent: RegisterComponent = fixture.componentInstance;
      let element = fixture.nativeElement;
      fixture.detectChanges(); //trigger change detection

      expect(registerComponent.username.value).toBe("");
      expect(registerComponent.email.value).toBe("");
      expect(registerComponent.password.value).toBe("");
      expect(registerComponent.registerForm.value).toEqual({
        username: "",
        email: "",
        password: ""
      });
      expect(registerComponent.registerForm.valid).toBeFalsy();
      expect(registerComponent.registerForm.errors).toBe(null);
      done();
    });
  });

  it('should require all the inputs', done => {
    tcb.createAsync(RegisterComponent).then(fixture => {
      let registerComponent: RegisterComponent = fixture.componentInstance;
      let element = fixture.nativeElement;
      fixture.detectChanges(); //trigger change detection

      expect(registerComponent.username.valid).toBeFalsy();
      expect(registerComponent.username.hasError('required')).toBeTruthy();

      expect(registerComponent.email.valid).toBeFalsy();
      expect(registerComponent.email.hasError('required')).toBeTruthy();

      expect(registerComponent.password.valid).toBeFalsy();
      expect(registerComponent.password.hasError('required')).toBeTruthy();

      done();
    });
  });

  it('should validate the email format', done => {
    tcb.createAsync(RegisterComponent).then(fixture => {
      let registerComponent: RegisterComponent = fixture.componentInstance;
      spyOn(registerComponent, "isValidEmail").and.callThrough();
      fixture.detectChanges(); //trigger change detection 

      expect(registerComponent.isValidEmail(registerComponent.email)).toEqual({ invalidEmail: true });
      expect(registerComponent.email.hasError('invalidEmail')).toBeTruthy();

      registerComponent.email.updateValue("test");
      fixture.detectChanges(); //trigger change detection 
      expect(registerComponent.isValidEmail(registerComponent.email)).toEqual({ invalidEmail: true });
      expect(registerComponent.email.hasError('invalidEmail')).toBeTruthy();

      registerComponent.email.updateValue("test@mail.com");
      fixture.detectChanges(); //trigger change detection 
      expect(registerComponent.isValidEmail(registerComponent.email)).toBeNull();
      expect(registerComponent.email.hasError('invalidEmail')).toBeFalsy();

      done();
    });
  });

  it('should reset all the values in the components', done => {
    tcb.createAsync(RegisterComponent).then(fixture => {
      let registerComponent: RegisterComponent = fixture.componentInstance;
      spyOn(registerComponent, "reset").and.callThrough();
      fixture.detectChanges(); //trigger change detection 

      registerComponent.email.updateValue("email");
      registerComponent.username.updateValue("username");
      registerComponent.password.updateValue("password");
      fixture.detectChanges(); //trigger change detection 

      expect(registerComponent.email.value).toBe("email");
      expect(registerComponent.username.value).toBe("username");
      expect(registerComponent.password.value).toBe("password");

      registerComponent.reset();
      fixture.detectChanges(); //trigger change detection 

      expect(registerComponent.reset).toHaveBeenCalled();
      expect(registerComponent.email.value).not.toBe("email");
      expect(registerComponent.username.value).not.toBe("username");
      expect(registerComponent.password.value).not.toBe("password");
      expect(registerComponent.email.value).toBe("");
      expect(registerComponent.username.value).toBe("");
      expect(registerComponent.password.value).toBe("");

      done();
    });
  });

  it('should set the error message if there was a problem', done => {
    tcb.createAsync(RegisterComponent).then(fixture => {
      let registerComponent: RegisterComponent = fixture.componentInstance;
      spyOn(registerComponent, "register").and.callThrough();
      spyOn(authService, "register").and.callThrough();
      fixture.detectChanges(); //trigger change detection

      mockBackend.connections.subscribe((connection: MockConnection) => {
        let resErr = new ResponseError();
        resErr._body = JSON.stringify({
          message: "Fail"
        });
        connection.mockError(resErr);
      });
      registerComponent.register();
      expect(registerComponent.responseError).toBe("Fail");
      done();
    });
  });

  it('should handle the success register with login', done => {
    tcb.createAsync(RegisterComponent).then(fixture => {
      let user = new User();
      user.email = "email";
      user.password = "password";
      user.username = "username";
      let registerComponent: RegisterComponent = fixture.componentInstance;
      spyOn(registerComponent, "register").and.callThrough();
      spyOn(router, "navigate");
      spyOn(authService, "handleSuccessLogin").and.callFake((user, data) => {
        return true
      })
      spyOn(authService, "register").and.callFake((user) => {
        return Observable.of(new Response(new ResponseOptions({ status: 200, body: { "test": "test" } })));
      });
      spyOn(authService, "login").and.callFake((user) => {
        return Observable.of(new Response(new ResponseOptions({ status: 200, body: { "test": "test" } })));
      });
      fixture.detectChanges(); //trigger change detection
      registerComponent.email.updateValue("email");
      registerComponent.username.updateValue("username");
      registerComponent.password.updateValue("password");
      fixture.detectChanges(); //trigger change detection      
      registerComponent.register();

      expect(router.navigate).toHaveBeenCalled();
      expect(router.navigate).toHaveBeenCalledWith(["Login"]);
      expect(authService.handleSuccessLogin).toHaveBeenCalled();
      expect(authService.handleSuccessLogin).toHaveBeenCalledWith({test: "test"}, user);
      expect(router.navigate).toHaveBeenCalledWith(["Game"]);      
      done();
    });
  });

}); 