import {Component, OnInit, ViewChild, ViewChildren} from "angular2/core";
import {RouteConfig, ROUTER_DIRECTIVES} from "angular2/router";
import {MapComponent} from "./map/map.component";
import { AuthComponent } from "./auth/auth.component";
import { TypewriterComponent } from "./typewriter/typewriter.component";

@Component({
  selector: "tpw-app",
  templateUrl: "app/app.component.html",
  directives: [MapComponent, TypewriterComponent, ROUTER_DIRECTIVES, AuthComponent]
})
@RouteConfig([
  { path: "/auth/...", name: "Auth", component: AuthComponent, useAsDefault: true },
  { path: "/map", name: "Map", component: MapComponent },
  { path: "/lesson/:id", as: "Typewriter", component: TypewriterComponent }
])
export class AppComponent implements OnInit {

  constructor() { }

  ngOnInit() { }
}