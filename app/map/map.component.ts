import { Component, ContentChild, ViewChild, Input, Output, EventEmitter, ElementRef } from "@angular/core";
import { WaypointComponent } from "./waypoint/waypoint.component";
import { Waypoint, WaypointService } from "./waypoint/waypoint.service";
import { FigureComponent } from "./figure/figure.component";
import { UserService } from "../user/user.service";
import {Router, OnActivate, RouteTree, RouteSegment} from "@angular/router";

@Component({
  moduleId: module.id,
  selector: "tpw-map",
  templateUrl: "map.component.html",
  directives: [WaypointComponent, FigureComponent]
})
export class MapComponent {
  currSegment: RouteSegment;

  constructor(
    private _waypointService: WaypointService,
    private _userService: UserService,
    private _router: Router
  ) { }

  routerOnActivate(curr: RouteSegment, prev: RouteSegment, currTree: RouteTree) {
    this.currSegment = curr;
  }

  handleWaypointSelect(waypoint: Waypoint) {
    this._router.navigate([`./${waypoint.id}`], this.currSegment);
  }
}