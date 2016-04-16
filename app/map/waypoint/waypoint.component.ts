import { Component, Input, Output, EventEmitter } from "angular2/core";
import { Router } from "angular2/router";
import { Waypoint } from "./waypoint.service";
import { UserService } from "../../user/user.service";

@Component({
  selector: "tpw-waypoint",
  templateUrl: "app/map/waypoint/waypoint.component.html",
})
export class WaypointComponent {
  @Input()
  waypoint: Waypoint;

  constructor(
    private _router: Router,
    private _userService: UserService
  ) { }

  gameStart() {
    if (this.waypoint.id <= this._userService.user.lastCompletedLessonId + 1) {
      this._router.navigate(["Typewriter", {id: this.waypoint.id}]);
    }
  }
}