import {Component, Input, OnInit, ContentChild, Output, EventEmitter} from "angular2/core";
import {FigureComponent} from "../figure/figure.component";
import {Waypoint} from "./waypoint.service";

@Component({
  selector: "tpw-waypoint",
  templateUrl: "app/waypoint/waypoint.component.html",
  directives: [FigureComponent]
})
export class WaypointComponent implements OnInit {
  @ContentChild(FigureComponent)
  figureComponent: FigureComponent;

  @Input()
  waypoint: Waypoint;

  @Output()
  gameFinished = new EventEmitter<number>();

  constructor() { }

  gameStart() {
    if(this.waypoint.hasFigure) {
      this.waypoint.hasFigure = false;
      this.gameFinished.emit(this.waypoint.id);
    }
  }

  ngOnInit() { }
}