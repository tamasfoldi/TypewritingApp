import {Component, Input, OnInit, Output, EventEmitter} from "angular2/core";
import {Waypoint} from "./waypoint.service";

@Component({
  selector: "tpw-waypoint",
  templateUrl: "app/map/waypoint/waypoint.component.html",
})
export class WaypointComponent implements OnInit {
  @Input()
  waypoint: Waypoint;

  @Output()
  gameFinished = new EventEmitter<number>();

  constructor() { }

  gameStart() {
    if (this.waypoint.hasFigure) {
      this.waypoint.hasFigure = false;
      this.gameFinished.emit(this.waypoint.id);
    }
  }

  ngOnInit() { }
}