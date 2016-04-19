import { Component } from "angular2/core";
import { RouteConfig, Router, ROUTER_DIRECTIVES, CanActivate } from "angular2/router";
import { TypewriterComponent } from "../typewriter/typewriter.component";
import { MapComponent } from "../map/map.component";
import { hasLoggedInUser } from "../util/can-activate";

@Component({
  selector: "tpw-ingame-router",
  templateUrl: "app/ingame-router/ingame-router.component.html",
  directives: [ROUTER_DIRECTIVES]
})
@RouteConfig([
  { path: "/map", as: "Map", component: MapComponent, useAsDefault: true },
  { path: "/lesson/:id", as: "Typewriter", component: TypewriterComponent }
])
@CanActivate((next, prev) => {
  return hasLoggedInUser(next, prev);
})
export class IngameRouterComponent { }