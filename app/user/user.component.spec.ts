import {UserComponent} from './user.component';
import { StatisticsService } from "../typewriter/statistics/statistics.service";
import { UserService } from "../user/user.service";
import { Location } from "@angular/common";
import { SpyLocation } from '@angular/common/testing'
import { RouteRegistry, Router, ROUTER_PRIMARY_COMPONENT, RouteParams } from "@angular/router-deprecated";
import {provide} from "@angular/core"
import {beforeEach, beforeEachProviders, inject} from "@angular/core/testing";
import { TestComponentBuilder } from '@angular/compiler/testing';
import * as Rx from 'rxjs/Rx'
import { Observable } from "rxjs/Rx";

class FakeStatisticsService {
  getCorrectness(id: number) {
    return Observable.of({id: "0", numberOfCorrectKeypresses: 3, numberOfIncorrectKeypresses: 2});
  }
}

class FakeUserService {
  user = {
    id: 0,
    username: "Test"
  };
}



describe('UserComponent ', () => {
  let tcb: TestComponentBuilder,
    statisticsService: StatisticsService,
    userService: UserService,
    Chart;

  //setup
  beforeEachProviders(() => [
    provide(StatisticsService, { useClass: FakeStatisticsService }),
    provide(UserService, { useClass: FakeUserService }),
    RouteRegistry,
    provide(Location, { useClass: SpyLocation }),
    provide(Router, { useFactory: () => {} }),
    provide(ROUTER_PRIMARY_COMPONENT, { useValue: UserComponent })
  ]);

  beforeEach(inject([TestComponentBuilder, StatisticsService, UserService], (_tcb, _routeParams, _statisticsService, _userService) => {
    tcb = _tcb;
    statisticsService = _statisticsService,
    userService = _userService;
    //spyOn(statisticsService, "getCorrectness").and.callThrough();
  }));

  // specs
  it('should set the lesson to init stats', done => {
    tcb.createAsync(UserComponent).then(fixture => {
      let userComponent: UserComponent = fixture.componentInstance;
      let element = fixture.nativeElement;
      fixture.detectChanges(); //trigger change detection

      expect(element.querySelector("h1").innerText).toEqual("Test");
      expect(element.querySelector("p-pieChart")).not.toBeNull();
      done();
    });
  });

}); 