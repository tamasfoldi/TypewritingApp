import { Component, Input, Output, EventEmitter } from "@angular/core";
import { Router } from "@angular/router";
import { Waypoint } from "./waypoint.service";
import { UserService } from "../../user/user.service";
import { BaseException } from '@angular/core/src/facade/exceptions';

@Component({
  moduleId: module.id,
  selector: "tpw-waypoint",
  styleUrls: ["waypoint.component.css"],
  templateUrl: "waypoint.component.html",
})
export class WaypointComponent {
  @Input()
  waypoint: Waypoint;

  @Input()
  star: number;

  constructor(
    private _router: Router,
    private _userService: UserService
  ) { }
}