import {beforeEachProviders, beforeEach, inject, TestComponentBuilder, ComponentFixture} from "angular2/testing";
import { WaypointService } from "./waypoint/waypoint.service";
import { MapComponent } from "./map.component";
import { UserService } from "../user/user.service";
import {provide} from "angular2/core"
import {Router, RouteRegistry, ROUTER_PRIMARY_COMPONENT} from "angular2/router";
import { RootRouter } from 'angular2/src/router/router';
import { SpyLocation } from 'angular2/src/mock/location_mock';
import { Location } from "angular2/platform/common";
import { IngameRouterComponent } from "../ingame-router/ingame-router.component";

import * as Rx from "rxjs/Rx";

class FakeUserService {
  public user;

  constructor() {
    this.user = {
      lastCompletedLessonId: 0
    };
  }
}

class FakeWaypointService {
  public waypoints;

  constructor() {
    this.waypoints = Rx.Observable.of([{ id: 0, posX: 0, posY: 0 }, { id: 1, posX: 10, posY: 10 }]);
  }
}

describe('MapComponent', () => {
  let waypointService: WaypointService,
    userService: UserService,
    tcb: TestComponentBuilder;

  beforeEachProviders(() => [
    TestComponentBuilder,
    MapComponent,
    RouteRegistry,
    provide(Location, { useClass: SpyLocation }),
    provide(Router, { useClass: RootRouter }),
    provide(ROUTER_PRIMARY_COMPONENT, { useValue: IngameRouterComponent }),
    provide(UserService, { useClass: FakeUserService }),
    provide(WaypointService, { useClass: FakeWaypointService })
  ]);

  beforeEach(inject([UserService, WaypointService, TestComponentBuilder], (_userService, _waypointService, _tcb) => {
    userService = _userService;
    waypointService = _waypointService;
    tcb = _tcb;
  }));

  it('should have two waypoint and one figure', done => {
    tcb.createAsync(MapComponent).then(fixture => {
      let mapComponent: MapComponent = fixture.componentInstance;
      let element = fixture.nativeElement;
      fixture.detectChanges(); //trigger change detection
      
      expect(element.querySelectorAll('tpw-waypoint').length).toBe(2);
      expect(element.querySelectorAll('tpw-figure').length).toBe(1);
      done();
    });
  });

  it('should have the figure in the first waypoint', done => {
    tcb.createAsync(MapComponent).then((fixture: ComponentFixture) => {
      let mapComponent: MapComponent = fixture.componentInstance;
      let element = fixture.nativeElement;
      fixture.detectChanges(); //trigger change detection
      
      expect(element.querySelectorAll('.waypoint')[0].children[0].tagName).toBe('TPW-FIGURE');
      done();
    });
  });
 
})