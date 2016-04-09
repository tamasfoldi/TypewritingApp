import { Component, OnInit, Injector } from "angular2/core";
import { RouteConfig, Router, ROUTER_DIRECTIVES, CanActivate, ComponentInstruction } from "angular2/router";
import { TypewriterComponent } from "../typewriter/typewriter.component";
import { MapComponent } from "../map/map.component";
import { appInjector } from "../app-injector"; 

@Component({
  selector: "tpw-ingame-router",
  templateUrl: "app/ingame-router/ingame-router.component.html",
  directives: [ROUTER_DIRECTIVES]
})
@RouteConfig([
  { path: "/map", as: "Map", component: MapComponent, useAsDefault: true },
  { path: "/lesson/:id", as: "Typewriter", component: TypewriterComponent }
])
@CanActivate((next: ComponentInstruction, prev: ComponentInstruction) => {
  let injector: Injector = appInjector();
  let _router: Router = injector.get(Router);

  return new Promise((resolve) => {
    let boolean = false;
    if (boolean) {
      resolve(true);
    } else {
      _router.navigate(["Auth"]);
      resolve(false);
    }
  });
})
export class IngameRouterComponent implements OnInit {
  constructor() { }

  ngOnInit() { }

}