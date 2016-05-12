import {beforeEachProviders, beforeEach, inject} from "@angular/core/testing";
import {MockBackend, MockConnection} from "@angular/http/testing";
import {BaseRequestOptions, Http, Response, ResponseOptions, RequestOptions} from "@angular/http";
import {provide} from "@angular/core"
import {AuthHttp, AuthConfig} from "angular2-jwt/angular2-jwt";
import {LessonService} from "./lesson.service";
import {BaseException} from '@angular/core/src/facade/exceptions';
import "rxjs/Rx";

describe('LessonService specs', () => {
  let mockbackend: MockBackend,
    lessonService: LessonService,
    authHttp: AuthHttp;

  beforeEachProviders(() => [
    BaseRequestOptions,
    MockBackend,
    LessonService,
    provide(RequestOptions, { useFactory: () => { } }),
    provide(AuthHttp, {
      useFactory: (backend, options) => new Http(backend, options),
      deps: [MockBackend, BaseRequestOptions]
    })
  ]);

  beforeEach(inject([MockBackend, LessonService, AuthHttp], (_mockbackend, _lessonService, _authHttp) => {
    mockbackend = _mockbackend;
    lessonService = _lessonService;
    authHttp = _authHttp;
    spyOn(authHttp, "get").and.callThrough();
  }))

  it('should return with lessons array', (done) => {
    mockbackend.connections.subscribe((connection: MockConnection) => {
      connection.mockRespond(new Response(new ResponseOptions({ status: 200, body: [{ "lesson": "one" }, { "lesson": "two" }] })));
    });
    lessonService.lessons.subscribe(lessons => {
      expect(lessons.length).toEqual(2);
      expect(authHttp.get).toHaveBeenCalled();
      expect(lessons).toEqual([{ lesson: "one" }, { lesson: "two" }]);
    })
    done();
  });

  it('should return with one lesson when there is only get(id)', (done) => {
    mockbackend.connections.subscribe((connection: MockConnection) => {
      connection.mockRespond(new Response(new ResponseOptions({ status: 200, body: { "lesson": "two" } })));
    });
    lessonService.get(0).subscribe(lesson => {
      expect(authHttp.get).toHaveBeenCalled();
      expect(lesson).toEqual({ lesson: "two" });
    })
    done();
  });

  it('should call cache the lessons', (done) => {
    mockbackend.connections.subscribe((connection: MockConnection) => {
      connection.mockRespond(new Response(new ResponseOptions({ status: 200, body: [{ "lesson": "one" }, { "lesson": "two" }] })));
    });
    lessonService.lessons.subscribe(lessons => {
      expect(lessons.length).toEqual(2);
      expect(lessons).toEqual([{ lesson: "one" }, { lesson: "two" }]);
    })
    lessonService.get(0).subscribe(lesson => {
      expect(lesson).toEqual({ lesson: "one" });
      expect(authHttp.get).toHaveBeenCalledTimes(1);
    })
    done();
  });

});
