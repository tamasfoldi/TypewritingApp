import {Component, Input, OnInit, Output, EventEmitter} from "angular2/core";
import { Router } from "angular2/router";
import {Waypoint} from "./waypoint.service";

@Component({
  selector: "tpw-waypoint",
  templateUrl: "app/map/waypoint/waypoint.component.html",
})
export class WaypointComponent implements OnInit {
  @Input()
  waypoint: Waypoint;

  constructor(private _router: Router) { }

  gameStart() {
    if (this.waypoint.hasFigure) {
      this._router.navigate(["Typewriter", {id: this.waypoint.id}]);
    }
  }

  ngOnInit() { }
}