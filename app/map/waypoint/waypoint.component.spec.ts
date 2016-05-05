import {beforeEachProviders, beforeEach, inject, TestComponentBuilder, ComponentFixture} from "angular2/testing";
import { WaypointComponent } from "./waypoint.component";
import { UserService } from "../../user/user.service";
import {provide} from "angular2/core"
import {Router, RouteRegistry, ROUTER_PRIMARY_COMPONENT} from "angular2/router";
import { RootRouter } from 'angular2/src/router/router';
import { SpyLocation } from 'angular2/src/mock/location_mock';
import { Location } from "angular2/platform/common";
import { IngameRouterComponent } from "../../ingame-router/ingame-router.component";
import {BaseException} from 'angular2/src/facade/exceptions';

import * as Rx from "rxjs/Rx";

class FakeUserService {
  public user;

  constructor() {
    this.user = {
      lastCompletedLessonId: 0
    };
  }
}

describe('WaypointComponent', () => {
  let waypointComponent: WaypointComponent,
    userService: UserService,
    tcb: TestComponentBuilder,
    router: Router;

  beforeEachProviders(() => [
    TestComponentBuilder,
    RouteRegistry,
    provide(Location, { useClass: SpyLocation }),
    provide(Router, { useClass: RootRouter }),
    provide(ROUTER_PRIMARY_COMPONENT, { useValue: IngameRouterComponent }),
    provide(UserService, { useClass: FakeUserService })
  ]);

  beforeEach(inject([UserService, TestComponentBuilder, Router], (_userService, _tcb, _router) => {
    userService = _userService;
    tcb = _tcb;
    router = _router;
  }));

  it('should throw an error if the lesson is not unlocked', done => {
    tcb.createAsync(WaypointComponent).then(fixture => {
      let waypointComponent: WaypointComponent = fixture.componentInstance;
      waypointComponent.waypoint = { id: 10, posX: 0, posY: 10 };
      spyOn(waypointComponent, "gameStart").and.callThrough();
      let element = fixture.nativeElement;
      fixture.detectChanges(); //trigger change detection
      expect(() => waypointComponent.gameStart()).toThrow();
      expect(() => waypointComponent.gameStart()).toThrowError('You dont have permission to open this!');
      expect(() => waypointComponent.gameStart()).toThrowError(BaseException);
      expect(() => waypointComponent.gameStart()).toThrowError(BaseException, 'You dont have permission to open this!');
      done();
    });
  });

  it('should navigate to the lesson if it is unlocked', done => {
    tcb.createAsync(WaypointComponent).then(fixture => {
      let waypointComponent: WaypointComponent = fixture.componentInstance;
      waypointComponent.waypoint = { id: 0, posX: 0, posY: 10 };
      spyOn(waypointComponent, "gameStart").and.callThrough();
      spyOn(router, "navigate").and.callThrough()      
      let element = fixture.nativeElement;
      fixture.detectChanges(); //trigger change detection
      waypointComponent.gameStart();
      expect(router.navigate).toHaveBeenCalled();
      expect(router.navigate).toHaveBeenCalledWith(["Typewriter", {id: 0}]);
      done();
    });
  });

})