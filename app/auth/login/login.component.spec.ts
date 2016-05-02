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
import * as Rx from 'rxjs/Rx'
import { Observable } from "rxjs/Rx";

class ResponseError extends Error {
  _body;
}

describe('LoginComponent specs', () => {
  let tcb: TestComponentBuilder,
    authService: AuthService,
    mockBackend: MockBackend,
    loc: Location,
    router: Router;

  //setup
  beforeEachProviders(() => [
    TestComponentBuilder,
    LoginComponent,
    RouteRegistry,
    provide(Location, { useClass: SpyLocation }),
    provide(Router, { useClass: RootRouter }),
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

  beforeEach(inject([TestComponentBuilder, AuthService, MockBackend, Location, Router], (_tcb, _authService, _mockBackend, _location, _router) => {
    authService = _authService;
    tcb = _tcb;
    mockBackend = _mockBackend;
    loc = _location,
    router = _router;  
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

  it('should set the error message if there was a problem', done => {
    tcb.createAsync(LoginComponent).then(fixture => {
      let loginComponent: LoginComponent = fixture.componentInstance;
      spyOn(loginComponent, "login").and.callThrough();
      spyOn(authService, "login").and.callThrough();
      fixture.detectChanges(); //trigger change detection

      mockBackend.connections.subscribe((connection: MockConnection) => {
        let resErr = new ResponseError();
        resErr._body = JSON.stringify({
          error_description: "Fail"
        });
        connection.mockError(resErr);
      });
      loginComponent.login();
      expect(loginComponent.responseError).toBe("Fail");
      done();
    });
  });

  it('should navigate and handle success login on succ', done => {
    tcb.createAsync(LoginComponent).then(fixture => {
      let user = new User();
      user.email = "test@mail.com";
      user.password = "password";
      let loginComponent: LoginComponent = fixture.componentInstance;
      spyOn(loginComponent, "login").and.callThrough();
      spyOn(authService, "login").and.callFake((user) => {
         return Observable.of(new Response(new ResponseOptions({ status: 200, body: { "test": "test" } })));
      });
      spyOn(authService, "handleSuccessLogin");
      spyOn(router, "navigate");
      fixture.detectChanges(); //trigger change detection
      loginComponent.email.updateValue("test@mail.com");
      loginComponent.password.updateValue("password");
      fixture.detectChanges(); //trigger change detection
      
      loginComponent.login();
      expect(authService.handleSuccessLogin).toHaveBeenCalled();
      expect(authService.handleSuccessLogin).toHaveBeenCalledWith({test: "test"}, user);
      expect(router.navigate).toHaveBeenCalled();
      expect(router.navigate).toHaveBeenCalledWith(["Game"]);
      done();
    });
  });

}); 