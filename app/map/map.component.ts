import { Component, ContentChild, ViewChild, Input, Output, EventEmitter, ElementRef } from "@angular/core";
import { WaypointComponent } from "./waypoint/waypoint.component";
import { Waypoint, WaypointService } from "./waypoint/waypoint.service";
import { FigureComponent } from "./figure/figure.component";
import { UserService } from "../user/user.service";

@Component({
  moduleId: module.id,
  selector: "tpw-map",
  templateUrl: "map.component.html",
  directives: [WaypointComponent, FigureComponent]
})
export class MapComponent {
  
  constructor(
    private _waypointService: WaypointService,
    private _userService: UserService
  ) { }
}