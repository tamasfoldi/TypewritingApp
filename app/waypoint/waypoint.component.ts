import {Component, Input, OnInit, ContentChild, Output, EventEmitter} from "angular2/core";
import {FigureComponent} from "../figure/figure.component";

@Component({
  selector: "tpw-waypoint",
  templateUrl: "app/waypoint/waypoint.component.html",
  directives: [FigureComponent]
})
export class WaypointComponent implements OnInit {
  @ContentChild(FigureComponent)
  figureComponent: FigureComponent;

  @Input()
  id: number;
  @Input()
  posX: number;
  @Input()
  posY: number;
  @Input()
  hasFigure: boolean;

  @Output()
  gameFinished = new EventEmitter();

  constructor() { }

  gameStart() {
    if(this.hasFigure) {
      this.hasFigure = false;
      this.gameFinished.emit(this.id);
    }
  }

  ngOnInit() { }
}