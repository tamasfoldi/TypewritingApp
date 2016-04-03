import {Component, Input, OnInit, Output, EventEmitter} from "angular2/core";
import {Waypoint, WaypointService} from "./waypoint.service";

@Component({
  selector: "tpw-waypoint",
  templateUrl: "app/map/waypoint/waypoint.component.html",
})
export class WaypointComponent implements OnInit {
  @Input()
  waypoint: Waypoint;

  @Output()
  gameFinished = new EventEmitter<number>();

  constructor(private waypointService: WaypointService) { }

  gameStart() {
    if (this.waypoint.hasFigure) {
      this.gameFinished.emit(this.waypoint.id);
    }
  }

  ngOnInit() { }
}