import {beforeEachProviders, beforeEach, inject} from "@angular/core/testing";
import {MockBackend, MockConnection} from "@angular/http/testing";
import {BaseRequestOptions, Http, Response, ResponseOptions, RequestOptions} from "@angular/http";
import {provide} from "@angular/core"
import {AuthHttp, AuthConfig} from "angular2-jwt/angular2-jwt";
import {AuthService} from "./auth.service";
import {UserService, User} from "../user/user.service";
import {BaseException} from '@angular/core/src/facade/exceptions';

class FakeUserService {
  setUser(email: string) {
    return;
  }
}

describe('AuthService', () => {
  let mockbackend: MockBackend,
    service: AuthService,
    fakeUser: User,
    fakeUserService: FakeUserService,
    invalidFakeUser: User,
    fakeData;

  beforeEachProviders(() => [
    provide(UserService, { useClass: FakeUserService }),
    AuthService,
    BaseRequestOptions,
    MockBackend,
    provide(Http, {
      useFactory: (backend, options) => new Http(backend, options),
      deps: [MockBackend, BaseRequestOptions]
    })
  ]);

  beforeEach(inject([MockBackend, AuthService, UserService], (_mockbackend, _service, _userService) => {
    mockbackend = _mockbackend;
    service = _service;
    fakeUser = new User(<any>{
      email: "fake@mail.com",
      username: "fake",
      password: "fake",
      lastCompletedLessonId: 1,
      lessonStatistics: null,
      id: "fakeId"
    });
    fakeData = {
      id_token: "fakeToken"
    };
    fakeUserService = _userService;

    invalidFakeUser = <any>{
      username: "fake",
      password: "fake",
      lastCompletedLessonId: 1,
      lessonStatistics: null,
      id: "fakeId"
    };
  }))

  describe('Login specs', () => {

    it('should throw if not user or null', (done) => {
      expect(() => service.login(invalidFakeUser)).toThrow();
      expect(() => service.login(invalidFakeUser)).toThrowError('user is not assignable to type User');
      expect(() => service.login(invalidFakeUser)).toThrowError(TypeError);
      expect(() => service.login(<User>null)).toThrow();
      expect(() => service.login(<User>null)).toThrowError('user is required');;
      expect(() => service.login(<User>null)).toThrowError(BaseException);
      done();
    });

    it('should set the request body when logs in based on user datas', (done) => {
      mockbackend.connections.subscribe((connection: MockConnection) => {
        expect(connection.request.text()).toEqual(JSON.stringify({
          "client_id": service.clientId,
          "username": fakeUser.email,
          "password": fakeUser.password,
          "connection": service.connection,
          "grant_type": "password",
          "scope": "openid"
        }));
        connection.mockRespond(new Response(new ResponseOptions({ status: 200 })));
      });
      service.login(fakeUser).subscribe(response => {
        done();
      });
    });

  });

  describe('Register specs', () => {

    it('should throw if not user or null', (done) => {
      expect(() => service.register(invalidFakeUser)).toThrow();
      expect(() => service.register(invalidFakeUser)).toThrowError('user is not assignable to type User');
      expect(() => service.register(invalidFakeUser)).toThrowError(TypeError);
      expect(() => service.register(<User>null)).toThrow();
      expect(() => service.register(<User>null)).toThrowError('user is required');;
      expect(() => service.register(<User>null)).toThrowError(BaseException);
      done();
    });

    it('should set the request body when registers based on user datas', (done) => {
      mockbackend.connections.subscribe((connection: MockConnection) => {
        expect(connection.request.text()).toEqual(JSON.stringify({
          "client_id": service.clientId,
          "username": fakeUser.username,
          "email": fakeUser.email,
          "password": fakeUser.password,
          "connection": service.connection
        }));
        connection.mockRespond(new Response(new ResponseOptions({ status: 200 })));
      });
      service.register(fakeUser).subscribe(response => {
        done();
      });
    });

  });


  describe('HandleSuccessLogin specs', () => {
    it('should set the localstorage', () => {
      service.handleSuccessLogin(fakeData, fakeUser);
      expect(localStorage.getItem("id_token")).toBe("fakeToken");
    });

    it('should call the setUser function', () => {
      spyOn(fakeUserService, "setUser").and.callThrough();
      service.handleSuccessLogin(fakeData, fakeUser);
      expect(fakeUserService.setUser).toHaveBeenCalled();
    });
  });

})