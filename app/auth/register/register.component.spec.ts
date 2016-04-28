import {RegisterComponent} from './register.component';
import {provide} from "angular2/core"
import {Router, RouteRegistry, ROUTER_PRIMARY_COMPONENT} from "angular2/router";
import { RootRouter } from 'angular2/src/router/router';
import { SpyLocation } from 'angular2/src/mock/location_mock'
import {beforeEach, beforeEachProviders, inject, TestComponentBuilder} from "angular2/testing";
import { AuthService } from "../auth.service";
import { AuthRouterComponent } from "../auth-router.component";
import { Location } from "angular2/platform/common";
import { User, UserService } from "../../user/user.service";
import { Response, BaseResponseOptions, BaseRequestOptions, ResponseOptions, Http } from "angular2/http";
import {MockBackend, MockConnection} from "angular2/http/testing";

import { Observable } from "rxjs/Rx";

class FakeUserService {
  setUser(email: string) {
    return;
  }
}

describe('RegisterComponent specs', () => {
  let tcb: TestComponentBuilder,
    authService: AuthService,
    mockBackend: MockBackend,
    loc: Location;

  //setup
  beforeEachProviders(() => [
    TestComponentBuilder,
    RegisterComponent,
    RouteRegistry,
    Location,
    provide(Router, { useClass: RootRouter }),
    provide(ROUTER_PRIMARY_COMPONENT, { useValue: AuthRouterComponent }),
    provide(UserService, { useClass: FakeUserService }),
    AuthService,
    BaseRequestOptions,
    MockBackend,
    provide(Http, {
      useFactory: (backend, options) => new Http(backend, options),
      deps: [MockBackend, BaseRequestOptions]
    })
  ]);

  beforeEach(inject([TestComponentBuilder, AuthService, MockBackend, Location], (_tcb, _authService, _mockBackend, _location) => {
    authService = _authService;
    tcb = _tcb;
    mockBackend = _mockBackend;
    loc = _location;
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

}); 