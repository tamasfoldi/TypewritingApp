import {Component, OnInit, ViewChild, ViewChildren} from "angular2/core";
import {RouteConfig, ROUTER_DIRECTIVES} from "angular2/router";
import { AuthComponent } from "./auth/auth.component";
import { IngameRouterComponent } from "./ingame-router/ingame-router.component";

@Component({
  selector: "tpw-app",
  templateUrl: "app/app.component.html",
  directives: [ROUTER_DIRECTIVES]
})
@RouteConfig([
  { path: "/auth/...", as: "Auth", component: AuthComponent, useAsDefault: true },
  { path: "/game/...", as: "Game", component: IngameRouterComponent }
])
export class AppComponent implements OnInit {

  constructor() { }

  ngOnInit() { }
}