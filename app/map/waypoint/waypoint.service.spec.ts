import {beforeEachProviders, beforeEach, inject} from "angular2/testing";
import {MockBackend, MockConnection} from "angular2/http/testing";
import {BaseRequestOptions, Http, Response, ResponseOptions, RequestOptions} from "angular2/http";
import {provide} from "angular2/core"
import {AuthHttp, AuthConfig} from "angular2-jwt/angular2-jwt";
import {LessonService} from "../../lesson/lesson.service";
import { WaypointService } from "./waypoint.service";
import {BaseException} from 'angular2/src/facade/exceptions';
import "rxjs/Rx";

describe('WaypointService', () => {
  let mockbackend: MockBackend,
    waypointService: WaypointService,
    lessonService: LessonService,
    authHttp: AuthHttp;

  beforeEachProviders(() => [
    BaseRequestOptions,
    MockBackend,
    LessonService,
    WaypointService,
    provide(RequestOptions, { useFactory: () => { } }),
    provide(AuthHttp, {
      useFactory: (backend, options) => new Http(backend, options),
      deps: [MockBackend, BaseRequestOptions]
    })
  ]);

  beforeEach(inject([MockBackend, LessonService, AuthHttp, WaypointService], (_mockbackend, _lessonService, _authHttp, _waypointService) => {
    mockbackend = _mockbackend;
    lessonService = _lessonService;
    authHttp = _authHttp;
    waypointService = _waypointService;

  }));

  it('should return with waypoints array', (done) => {
    spyOn(waypointService, "createWaypointFromLesson").and.callThrough();
    mockbackend.connections.subscribe((connection: MockConnection) => {
      connection.mockRespond(new Response(new ResponseOptions({ status: 200, body: [{ id: 0, name: "One", text: "One" }, { id: 1, name: "Two", text: "Two" }] })));
    });
    waypointService.waypoints.subscribe(waypoints => {
      expect(waypoints).toEqual([{ id: 0, posX: 0, posY: 0 }, { id: 1, posX: 10, posY: 10 }]);
      expect(waypoints.length).toEqual(2);
    });
    done();
  });

})