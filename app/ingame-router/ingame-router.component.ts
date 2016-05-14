import { Component } from "@angular/core";
import { Routes, Router, ROUTER_DIRECTIVES } from "@angular/router";
import { TypewriterComponent } from "../typewriter/typewriter.component";
import { MapComponent } from "../map/map.component";

@Component({
  moduleId: module.id,
  selector: "tpw-ingame-router",
  templateUrl: "ingame-router.component.html",
  directives: [ROUTER_DIRECTIVES]
})
@Routes([
  { path: "map", component: MapComponent },
  { path: "lesson/:id", component: TypewriterComponent }
])
export class IngameRouterComponent { }