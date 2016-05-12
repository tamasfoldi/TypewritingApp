import {beforeEachProviders, beforeEach, inject} from "@angular/core/testing";
import { TestComponentBuilder, ComponentFixture } from '@angular/compiler/testing';
import { UserService } from "../user/user.service";
import {provide} from "@angular/core"
import {Router, RouteRegistry, ROUTER_PRIMARY_COMPONENT} from "@angular/router-deprecated";
import { SpyLocation } from '@angular/common/testing';
import { Location } from "@angular/common";
import { IngameRouterComponent } from "../ingame-router/ingame-router.component";

describe('Router tests', () => {
  var location, router: Router;

  //setup
  beforeEachProviders(() => [
    RouteRegistry,
    provide(Location, { useClass: SpyLocation }),
    provide(Router, { useFactory: () => {} }),
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