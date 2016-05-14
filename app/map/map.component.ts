import { Component, ContentChild, ViewChild, Input, Output, EventEmitter, ElementRef } from "@angular/core";
import { WaypointComponent } from "./waypoint/waypoint.component";
import { Waypoint, WaypointService } from "./waypoint/waypoint.service";
import { FigureComponent } from "./figure/figure.component";
import { UserService } from "../user/user.service";
import {Router, OnActivate, RouteTree} from "@angular/router";

@Component({
  moduleId: module.id,
  selector: "tpw-map",
  templateUrl: "map.component.html",
  directives: [WaypointComponent, FigureComponent]
})
export class MapComponent{  
  constructor(
    private _waypointService: WaypointService,
    private _userService: UserService,
    private _router: Router
  ) { }
  
  handleWaypointSelect(waypoint: Waypoint) {
          this._router.navigate([`lesson/${waypoint.id}`]);
  }
}