import {beforeEachProviders, beforeEach, inject} from "angular2/testing";
import {MockBackend, MockConnection} from "angular2/http/testing";
import {BaseRequestOptions, Http, Response, ResponseOptions, RequestOptions} from "angular2/http";
import {provide} from "angular2/core"
import {AuthHttp, AuthConfig} from "angular2-jwt/angular2-jwt";
import {StatisticsService, Correctness} from "./statistics.service";
import {BaseException} from 'angular2/src/facade/exceptions';
import "rxjs/Rx";

describe('StatisticsService ', () => {
  let mockbackend: MockBackend,
    statisticsService: StatisticsService;

  beforeEachProviders(() => [
    BaseRequestOptions,
    MockBackend,
    StatisticsService,
    provide(RequestOptions, { useFactory: () => { } }),
    provide(AuthHttp, {
      useFactory: (backend, options) => new Http(backend, options),
      deps: [MockBackend, BaseRequestOptions]
    })
  ]);

  beforeEach(inject([MockBackend, StatisticsService, AuthHttp], (_mockbackend, _lessonService, _authHttp) => {
    mockbackend = _mockbackend;
    statisticsService = _lessonService;
  }))

  it('should return with the correctness', (done) => {
    mockbackend.connections.subscribe((connection: MockConnection) => {
      connection.mockRespond(new Response(new ResponseOptions({ status: 200, body: {id: "0", numberOfCorrectKeypresses: 2, numberOfIncorrectKeypresses: 3} })));
    });
    statisticsService.getCorrectness("0").subscribe((correctness: Correctness)  => {
      expect(correctness).toEqual({id: "0", numberOfCorrectKeypresses: 2, numberOfIncorrectKeypresses: 3});
    })
    done();
  });

});
