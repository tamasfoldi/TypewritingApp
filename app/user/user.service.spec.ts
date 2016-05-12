import {beforeEachProviders, beforeEach, inject} from "@angular/core/testing";
import {MockBackend, MockConnection} from "@angular/http/testing";
import {BaseRequestOptions, Http, Response, ResponseOptions, RequestOptions} from "@angular/http";
import {provide} from "@angular/core"
import {AuthHttp, AuthConfig} from "angular2-jwt/angular2-jwt";
import {UserService, User} from "./user.service";
import {BaseException} from '@angular/core/src/facade/exceptions';
import { Statistics } from "../typewriter/statistics/statistics.service";
import "rxjs/Rx";

describe('UserService ', () => {
  let mockbackend: MockBackend,
    userService: UserService,
    authHttp: AuthHttp;
  let fakeUser = {
    username: "Fake User",
    email: "test@test.com",
    password: "password",
    lastCompletedLessonId: 1,
    _id: "0",
    lessonStatistics: null
  };

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
    expect(userService.user.email).toEqual(fakeUser.email);
    expect(userService.user.username).toEqual(fakeUser.username);
    expect(userService.user.password).toEqual(fakeUser.password);
    expect(userService.user.lessonStatistics).toEqual(new Map<any, any>());    
    expect(userService.user.id).toEqual(fakeUser._id);
    expect(userService.user.lessonStatistics.size).toBe(0); 

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
    expect(userService.user.lessonStatistics.set).toHaveBeenCalledWith(0, Object({ username: 'Fake User', email: 'test@test.com', password: 'password', lastCompletedLessonId: 1, _id: '0', lessonStatistics: null }));
    done();
  });

  it('should set a user with lesson statistics', (done) => {
    let stats = new Array<Statistics>();
    stats.push(new Statistics());
    fakeUser.lessonStatistics = stats;
    mockbackend.connections.subscribe((connection: MockConnection) => {
      connection.mockRespond(new Response(new ResponseOptions({ status: 200, body: JSON.stringify(fakeUser) })));
    });

    expect(userService.user).toBeUndefined();
    userService.setUser("test@test.com");


    expect(userService.user).not.toBeUndefined();
    expect(userService.user).not.toBeNull();
    expect(userService.user.email).toEqual(fakeUser.email);
    expect(userService.user.username).toEqual(fakeUser.username);
    expect(userService.user.password).toEqual(fakeUser.password);
    expect(userService.user.id).toEqual(fakeUser._id);
    expect(userService.user.lessonStatistics.size).not.toBe(0);
    done();
  });
});

