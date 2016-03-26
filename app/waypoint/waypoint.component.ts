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
  posX: number;
  @Input()
  posY: number;

  @Output()
  gameFinished = new EventEmitter();

  constructor() { }

  gameStart() {
    console.log(this.figureComponent);
  }

  ngOnInit() { }
}