import { Component, Input, Output, EventEmitter } from "angular2/core";
import { Router } from "angular2/router";
import { Waypoint } from "./waypoint.service";
import { UserService } from "../../user/user.service";
import {BaseException} from 'angular2/src/facade/exceptions';

@Component({
  selector: "tpw-waypoint",
  styles: [
    `.waypoint {
      width: 100px;
      height: 100px;
      background: red;
      margin: 1px;
    }`
  ],
  templateUrl: "app/map/waypoint/waypoint.component.html",
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
    if (this.waypoint.id <= this._userService.user.lastCompletedLessonId + 1) {
      this._router.navigate(["Typewriter", { id: this.waypoint.id }]);
    } else {
      this.handleInvalidGameSelect()
    }
  }
  
  handleInvalidGameSelect() {
    
  }
}