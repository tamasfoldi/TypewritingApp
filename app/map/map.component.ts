import { Component, ContentChild, ViewChild, Input, Output, EventEmitter, ElementRef } from "angular2/core";
import { WaypointComponent } from "./waypoint/waypoint.component";
import { Waypoint, WaypointService } from "./waypoint/waypoint.service";
import { FigureComponent } from "./figure/figure.component";
import { UserService } from "../user/user.service";

@Component({
  selector: "tpw-map",
  templateUrl: "app/map/map.component.html",
  directives: [WaypointComponent, FigureComponent]
})
export class MapComponent {
  
  constructor(
    private _waypointService: WaypointService,
    private _userService: UserService
  ) { }
}