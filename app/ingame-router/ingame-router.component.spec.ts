import {beforeEachProviders, beforeEach, inject, TestComponentBuilder, ComponentFixture} from "angular2/testing";
import { UserService } from "../user/user.service";
import {provide} from "angular2/core"
import {Router, RouteRegistry, ROUTER_PRIMARY_COMPONENT} from "angular2/router";
import { RootRouter } from 'angular2/src/router/router';
import { SpyLocation } from 'angular2/src/mock/location_mock';
import { Location } from "angular2/platform/common";
import { IngameRouterComponent } from "../ingame-router/ingame-router.component";

describe('Router tests', () => {
  var location, router: Router;

  //setup
  beforeEachProviders(() => [
    RouteRegistry,
    provide(Location, { useClass: SpyLocation }),
    provide(Router, { useClass: RootRouter }),
    provide(ROUTER_PRIMARY_COMPONENT, { useValue: IngameRouterComponent })
  ]);

  beforeEach(inject([Router, Location], (r, l) => {
    router = r;
    location = l;
  }));

  //specs
  it('Should be able to navigate to Map', done => {
    router.navigate(['Map']).then(() => {
      expect(location.path()).toBe('/map');
      done();
    });
  });
});