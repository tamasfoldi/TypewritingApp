import {LoginComponent} from './login.component';
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
    LoginComponent,
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
    tcb.createAsync(LoginComponent).then(fixture => {
      let loginComponent: LoginComponent = fixture.componentInstance;
      let element = fixture.nativeElement;
      fixture.detectChanges(); //trigger change detection

      expect(loginComponent.email.value).toBe("");
      expect(loginComponent.password.value).toBe("");
      expect(loginComponent.loginForm.value).toEqual({
        email: "",
        password: ""
      });
      expect(loginComponent.loginForm.valid).toBeFalsy();
      expect(loginComponent.loginForm.errors).toBe(null);
      done();
    });
  });

  it('should require all the inputs', done => {
    tcb.createAsync(LoginComponent).then(fixture => {
      let loginComponent: LoginComponent = fixture.componentInstance;
      let element = fixture.nativeElement;
      fixture.detectChanges(); //trigger change detection

      expect(loginComponent.email.valid).toBeFalsy();
      expect(loginComponent.email.hasError('required')).toBeTruthy();

      expect(loginComponent.password.valid).toBeFalsy();
      expect(loginComponent.password.hasError('required')).toBeTruthy();

      done();
    });
  });

  it('should reset all the values in the components', done => {
    tcb.createAsync(LoginComponent).then(fixture => {
      let loginComponent: LoginComponent = fixture.componentInstance;
      spyOn(loginComponent, "reset").and.callThrough();
      fixture.detectChanges(); //trigger change detection 

      loginComponent.email.updateValue("email");
      loginComponent.password.updateValue("password");
      fixture.detectChanges(); //trigger change detection 

      expect(loginComponent.email.value).toBe("email");
      expect(loginComponent.password.value).toBe("password");

      loginComponent.reset();
      fixture.detectChanges(); //trigger change detection 

      expect(loginComponent.reset).toHaveBeenCalled();
      expect(loginComponent.email.value).not.toBe("email");
      expect(loginComponent.password.value).not.toBe("password");
      expect(loginComponent.email.value).toBe("");
      expect(loginComponent.password.value).toBe("");

      done();
    });
  });

}); 