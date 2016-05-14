import { Component, Input, Output, EventEmitter } from "@angular/core";
import { Router } from "@angular/router";
import { Waypoint } from "./waypoint.service";
import { UserService } from "../../user/user.service";
import { BaseException } from '@angular/core/src/facade/exceptions';

@Component({
  moduleId: module.id,
  selector: "tpw-waypoint",
  styles: [
    `.waypoint {
      width: 100px;
      height: 100px;
      background: red;
      margin: 1px;
    }`
  ],
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

  gameStart() {
    // if (this.waypoint.id <= this._userService.user.lastCompletedLessonId + 1) {
    //   this._router.navigate(["lesson", {id: this.waypoint.id}]);
    // } else {
    //   throw new BaseException("You dont have permission to open this!");
    // }
  }
  
  handleInvalidGameSelect() {
    
  }
}