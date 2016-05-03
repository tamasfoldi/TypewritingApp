import {beforeEachProviders, beforeEach, inject} from "angular2/testing";
import {MockBackend, MockConnection} from "angular2/http/testing";
import {BaseRequestOptions, Http, Response, ResponseOptions, RequestOptions} from "angular2/http";
import {provide} from "angular2/core"
import {AuthHttp, AuthConfig} from "angular2-jwt/angular2-jwt";
import {UserService, User} from "./user.service";
import {BaseException} from 'angular2/src/facade/exceptions';
import { Statistics } from "../typewriter/statistics/statistics.service";
import "rxjs/Rx";

describe('UserService ', () => {
  let mockbackend: MockBackend,
    userService: UserService,
    authHttp: AuthHttp;
  let fakeUser: User = new User(<any>{
    _username: "Fake User",
    _email: "test@test.com",
    _password: "password",
    _lastCompletedLessonId: 1,
    _id: "0",
    _lessonStatistics: null
  });

  beforeEachProviders(() => [
    BaseRequestOptions,
    MockBackend,
    UserService,
    provide(RequestOptions, { useFactory: () => { } }),
    provide(AuthHttp, {
      useFactory: (backend, options) => new Http(backend, options),
      deps: [MockBackend, BaseRequestOptions]
    })
  ]);

  beforeEach(inject([MockBackend, UserService, AuthHttp], (_mockbackend, _userService, _authHttp) => {
    mockbackend = _mockbackend;
    userService = _userService;
    authHttp = _authHttp;
  }))

  it('should set a user', (done) => {
    mockbackend.connections.subscribe((connection: MockConnection) => {
      connection.mockRespond(new Response(new ResponseOptions({ status: 200, body: JSON.stringify(fakeUser) })));
    });

    expect(userService.user).toBeUndefined();
    userService.setUser("test@test.com");


    expect(userService.user).not.toBeUndefined();
    expect(userService.user).not.toBeNull();
    expect(userService.user).toEqual(fakeUser);
    expect(userService.user.id).toEqual(fakeUser.id);

    done();
  });

  it('should update the last completed lesson id', (done) => {
    mockbackend.connections.subscribe((connection: MockConnection) => {
      connection.mockRespond(new Response(new ResponseOptions({ status: 200, body: JSON.stringify(fakeUser) })));
    });
    userService.setUser("test@test.com");
    userService.updateLastCompletedLesson(3);
    expect(userService.user.lastCompletedLessonId).toBe(3);
    userService.updateLastCompletedLesson(2);
    expect(userService.user.lastCompletedLessonId).toBe(3);
    userService.updateLastCompletedLesson(4);
    expect(userService.user.lastCompletedLessonId).toBe(4);

    done();
  });

  it('should save the lesson statistics', (done) => {
    mockbackend.connections.subscribe((connection: MockConnection) => {
      connection.mockRespond(new Response(new ResponseOptions({ status: 200, body: JSON.stringify(fakeUser) })));
    });
    userService.setUser("test@test.com");
    spyOn(userService.user.lessonStatistics, "set");
    userService.saveLessonStatistic(0, <any>{ _numberOfCorrectKeypresses: 1, _numberOfIncorrectKeypresses: 2, _star: 3 });
    expect(userService.user.lessonStatistics.set).toHaveBeenCalled();
    expect(userService.user.lessonStatistics.set).toHaveBeenCalledWith(0, Object({ _lessonStatistics: Object({}) }));
    done();
  });
});

