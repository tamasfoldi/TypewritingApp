import {Component, OnInit, ViewChild, ViewChildren} from "angular2/core";
import {RouteConfig, ROUTER_DIRECTIVES} from "angular2/router";
import {MapComponent} from "./map/map.component";
import {TypewriterComponent} from "./typewriter/typewriter.component";

@Component({
  selector: "tpw-app",
  templateUrl: "app/app.component.html",
  directives: [MapComponent, TypewriterComponent, ROUTER_DIRECTIVES]
})
@RouteConfig([
  {path: "/", name: "Map", component: MapComponent, useAsDefault: true},
  {path: "/lesson/:id", name: "Typewriter", component: TypewriterComponent}
])
export class AppComponent implements OnInit {

  constructor() { }

  ngOnInit() { }
}